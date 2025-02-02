import telebot
from dotenv import load_dotenv
from timeloop import Timeloop
from datetime import datetime, timedelta
import psycopg2
import os 
import threading
import requests
import io
import math
import json

load_dotenv()

bot_api = os.getenv('BOT_TOKEN')

conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),         
    port=os.getenv('DB_PORT'),              
    database=os.getenv('DB_NAME'),    
    user=os.getenv('DB_USER'),            
    password=os.getenv('DB_PASSWORD')    
)


bot = telebot.TeleBot(bot_api)

tl = Timeloop()

def user_id_from_tg_user_id(tg_user_id):
    with conn.cursor() as cursor:
            cursor.execute("SELECT id FROM \"Users\" WHERE telegramid = %s;", (tg_user_id,))
            return cursor.fetchone()[0]

def start_markup():
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton("📊 Favourite games", callback_data="favourite_games"))
    markup.add(telebot.types.InlineKeyboardButton("🔍 Info", callback_data="info"), telebot.types.InlineKeyboardButton("❌ Close", callback_data="close"))
    return markup

def favourite_games_arg_markup():
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton("≪ Back", callback_data="back_to_favourite_games"))
    return markup

@bot.callback_query_handler(func=lambda call: call.data == "back_to_favourite_games")
def back_to_favourite_games_button(call: telebot.types.CallbackQuery):
    favourite_games_button(call)
    bot.delete_message(call.message.chat.id, call.message.message_id)

@bot.callback_query_handler(func=lambda call: call.data == "close")
def close_button(call: telebot.types.CallbackQuery):
    bot.delete_message(call.message.chat.id, call.message.message_id)

@bot.callback_query_handler(func=lambda call: call.data == "info")
def info_button(call: telebot.types.CallbackQuery):
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton("≪ Back", callback_data="back_to_start"))
    bot.send_message(chat_id=call.message.chat.id, text="""
Whisper64 bot for receiving notifications about sales on Nintendo Switch games.
    """, reply_markup=markup)
    bot.delete_message(call.message.chat.id, call.message.message_id)

@bot.callback_query_handler(func=lambda call: call.data == "back_to_start")
def start_button(call: telebot.types.CallbackQuery):
    start(call.message)
    bot.delete_message(call.message.chat.id, call.message.message_id)


@bot.callback_query_handler(func=lambda call: call.data == "favourite_games")
def favourite_games_button(call: telebot.types.CallbackQuery):
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton("Games on sale", callback_data="favourite_games_on_sale"))
    markup.add(telebot.types.InlineKeyboardButton("Games not on sale", callback_data="favourite_games_not_on_sale"))
    markup.add(telebot.types.InlineKeyboardButton("All games", callback_data="favourite_games_all"))
    markup.add(telebot.types.InlineKeyboardButton("≪ Back", callback_data="back_to_start"))
    bot.send_message(chat_id=call.message.chat.id, text="""
    Select option.    
    """,
    reply_markup=markup
    )

@bot.callback_query_handler(func=lambda call: call.data == "favourite_games_on_sale")
def favourite_games_on_sale_button(call: telebot.types.CallbackQuery):
    with conn.cursor() as cursor:
        cursor.execute("SELECT gameid FROM \"Favourites\" WHERE userid = %s AND onsale = true", (user_id_from_tg_user_id(call.message.chat.id),))
        games = cursor.fetchall()
    if len(games) > 0:
        text = '\n'.join([str(game[0]) for game in games])
    else:
        text = "None of your favourite games are on sale"
    bot.send_message(chat_id=call.message.chat.id, text=text, reply_markup=favourite_games_arg_markup())
    bot.delete_message(call.message.chat.id, call.message.message_id)

@bot.callback_query_handler(func=lambda call: call.data == "favourite_games_not_on_sale")
def favourite_games_not_on_sale_button(call: telebot.types.CallbackQuery):
    with conn.cursor() as cursor:
        cursor.execute("SELECT gameid FROM \"Favourites\" WHERE userid = %s AND onsale = false", (user_id_from_tg_user_id(call.message.chat.id),))
        games = cursor.fetchall()
    if len(games) > 0:
        text = '\n'.join([str(game[0]) for game in games])
    else:
        text = "Everyone of your favourite games are on sale"
    bot.send_message(chat_id=call.message.chat.id, text=text, reply_markup=favourite_games_arg_markup())
    bot.delete_message(call.message.chat.id, call.message.message_id)

@bot.callback_query_handler(func=lambda call: call.data == "favourite_games_all")
def favourite_games_all_button(call: telebot.types.CallbackQuery):
    # выбираем все игры, которые пользователь добавил в избранное
    with conn.cursor() as cursor:
        cursor.execute("SELECT gameid FROM \"Favourites\" WHERE userid = %s", (user_id_from_tg_user_id(call.message.chat.id),))
        games = cursor.fetchall()
    if len(games) > 0:
        text = '\n'.join([str(game[0]) for game in games])
    else:
        text = "You do not have favourite games"
    bot.send_message(chat_id=call.message.chat.id, text=text, reply_markup=favourite_games_arg_markup())
    bot.delete_message(call.message.chat.id, call.message.message_id)


@bot.message_handler(commands=['start'])
def start(message):
    if len(message.text.split()) > 1 and message.text.split()[0] == '/start':
        token = int(message.text.split()[1])
        telegram_id = message.from_user.id
        conn.autocommit = True
        with conn.cursor() as cursor:
            cursor.execute("UPDATE \"Users\" SET telegramid = %s WHERE id = %s;", (telegram_id, token))
    else: 
        pass
    bot.send_message(chat_id=message.chat.id, text='Hello! I\'m a bot that can let you know when your favourite games are on discount. Just add the game to your favourites game on the site to get me going.',
                     reply_markup=start_markup())
    
def send_reminder(user_id: int, sku):
    
    filters = sku
    url = os.getenv('API_GAMES_INFO_URL')
    headers = { 
        "Content-Type": "application/json",
        "X-Algolia-API-Key": os.getenv('API_GAMES_INFO_KEY'),
        "X-Algolia-Application-Id": os.getenv('API_GAMES_INFO_APPLICATION_ID'),
    }
    data = {"params": f"filters=sku:{filters}"}
    response = requests.post(url, headers=headers, json=data)
    game_info = response.json()['hits'][0]
    
    product_image = game_info.get('productImage', '')
    game_img_url = f'https://assets.nintendo.com/image/upload/{product_image}'
    response_img = requests.get(game_img_url)
    image = io.BytesIO(response_img.content)
    
    sale_end = datetime.strptime(game_info['eshopDetails']['discountPriceEnd'], "%Y-%m-%dT%H:%M:%SZ")
    formatted_date = sale_end.strftime("%d.%m.%Y")  
    
    if response.status_code == 200:
        with conn.cursor() as cursor:
            cursor.execute("SELECT telegramid FROM \"Users\" WHERE id = %s;", (user_id,))
            tg_user_id = cursor.fetchone()[0]
            message_text = (
                f"🔥 <b>{game_info['title']}</b> on sale!\n"
                f"💰 Price: <s>{game_info['price']['regPrice']}$</s> → "
                f"<b>{game_info['price']['salePrice']}$</b> (− {math.floor(game_info['price']['percentOff'])}%)\n"
                f"⌛ Sale ends: {formatted_date}"
            )        
            bot.send_photo(chat_id = tg_user_id, photo = image, caption=message_text, parse_mode="HTML")
    
def force_reminder():
    conn.autocommit = True
    with conn.cursor() as cursor:
        cursor.execute("SELECT gameid FROM \"Favourites\" WHERE onsale = true AND gotreminder = false GROUP BY gameid;")
        games = cursor.fetchall()
    for game in games:
        with conn.cursor() as cursor:
            cursor.execute("SELECT userid FROM \"Favourites\" WHERE gameid = %s", (game[0],))
            users = cursor.fetchall()
        for user in users:
            with conn.cursor() as cursor:
                cursor.execute("SELECT gotreminder FROM \"Favourites\" WHERE userid = %s AND gameid = %s", (user[0], game[0]))
                gotreminder = cursor.fetchone()[0]
                if not gotreminder:
                    cursor.execute("UPDATE \"Favourites\" SET gotreminder = true WHERE userid = %s AND gameid = %s", (user[0], game[0]))
                    send_reminder(user, game[0])
            

@tl.job(interval=timedelta(seconds=10)) # Поменять время!!!!!!!!!!!!!!!!!!!!!!!!!!!!
def check_time():
    check_sale()
    #force_reminder()

def chill():
    with conn.cursor() as cursor:
        cursor.execute("SELECT EXISTS(SELECT 1 FROM \"Favourites\" LIMIT 1)")
        exists = cursor.fetchone()[0]
        
    if not exists:
        return False
    return True

def check_sale():
    conn.autocommit = True

    if not chill():
        return
    
    
    with conn.cursor() as cursor:
        cursor.execute("SELECT gameid FROM \"Favourites\" GROUP BY gameid;")
        games = cursor.fetchall()
        
    filters = ' OR '.join([f'sku:"{game[0]}"' for game in games])
    
    url = os.getenv('API_GAMES_INFO_URL')
    headers = {
        "Content-Type": "application/json",
        "X-Algolia-API-Key": os.getenv('API_GAMES_INFO_KEY'),
        "X-Algolia-Application-Id": os.getenv('API_GAMES_INFO_APPLICATION_ID'),
    }
    data = {
        "params":  f"filters={filters}"
    }
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        games_info = response.json()['hits']
        for game in games_info:
            
            if (game['price']['salePrice'] is None):
                with conn.cursor() as cursor:
                    cursor.execute("UPDATE \"Favourites\" SET onsale = false, gotreminder = false WHERE gameid = %s", (game['sku'],))
            else:
                with conn.cursor() as cursor:
                    cursor.execute("UPDATE \"Favourites\" SET onsale = true WHERE gameid = %s", (game['sku'],))

    else:
        print('Error')
        
    

def start_timeloop():
    tl.start(block=False)  

def start_bot():
    bot.infinity_polling(skip_pending=True)


if __name__ == '__main__':
    threading.Thread(target=start_timeloop).start()
    threading.Thread(target=start_bot).start()