from telebot import *
from dotenv import load_dotenv
from timeloop import Timeloop
import datetime
import psycopg2
import os 
import threading
import requests
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


bot = TeleBot(bot_api)

tl = Timeloop()


@bot.message_handler(commands=['start'])
def start(message):
    if len(message.text.split()) > 1:
        token = int(message.text.split()[1])
        telegram_id = message.from_user.id
        conn.autocommit = True
        with conn.cursor() as cursor:
            cursor.execute("UPDATE \"Users\" SET telegramid = %s WHERE id = %s;", (telegram_id, token))
    else: 
        pass
    
def send_reminder(user_id: int, sku):
    with conn.cursor() as cursor:
        cursor.execute("SELECT telegramid FROM \"Users\" WHERE id = %s;", (user_id,))
        tg_user_id = cursor.fetchone()[0]
        print(tg_user_id)
    bot.send_message(chat_id = tg_user_id, text = f'Hello! {sku}')
    
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
                    print(user[0])
                    send_reminder(user, game[0])
            

@tl.job(interval=datetime.timedelta(seconds=10)) # Поменять время!!!!!!!!!!!!!!!!!!!!!!!!!!!!
def check_time():
    check_sale()
    force_reminder()

def check_sale():
    conn.autocommit = True
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
                print(game["sku"])
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