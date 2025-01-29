from telebot import *
from dotenv import load_dotenv
import psycopg2
import os 

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

@bot.message_handler(commands=['start'])
def start(message):
    if len(message.text.split()) > 1:
        token = int(message.text.split()[1])
        telegram_id = message.from_user.id
        with conn.cursor() as cursor:
            conn.autocommit = True
            cursor.execute("UPDATE \"Users\" SET telegramid = %s WHERE id = %s;", (telegram_id, token))
    else: 
        pass
bot.infinity_polling(skip_pending = True)