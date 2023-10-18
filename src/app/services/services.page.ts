import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})

@Injectable({
  providedIn: 'root'
})


export class ServicesPage implements OnInit {

  moments:number = 0;
  private contextAdd:string = "";
  private apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    
  constructor() { }

  sendMessage(message: string): Promise<any> {
    
    const prompt = `Context: El usuario dice - ${message}\nChatGPT: `;
    return axios.post(this.apiUrl, {
      prompt: prompt,
      max_tokens: 300
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
      }
    })
    .then(response => {
      return response.data.choices[0].text.trim();
    })
    .catch(error => {
      console.error('Error sending message to ChatGPT:', error);
      throw error;
    });
  }

  ngOnInit() {
    
  }

}
