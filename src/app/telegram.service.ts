import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private readonly telegramApiBaseUrl = 'https://api.telegram.org/bot6476982711:AAF_PGSL7KAzldVL3RRCc0TVSOBIXdDdKvM/';
  constructor() { }

  async sendMessage(chatId: string, message: string): Promise<void> {
    const url = `${this.telegramApiBaseUrl}sendMessage`;
    const params = {
      chat_id: chatId,
      text: message
    };

    try {
      await axios.post(url, params);
    } catch (error) {
      console.error('Error sending Telegram message:', error);
    }
  } 
}
