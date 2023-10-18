import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { TelegramService } from '/Pipe/EnglishFriend/EnglishFriend/src/app/telegram.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private navCtrl: NavController, private router: Router/*, private telegramService: TelegramService*/) {}

  ngOnInit() {

    setTimeout(() => {
      this.router.navigate(['chat']); 
    }, 7000); // 7000 milisegundos
  }

  /*async enviarMensaje() {
    const chatId = '1487522678'; // Reemplaza con el ID del chat de destino
    const mensaje = 'Hola desde mi aplicación Ionic!';
    await this.telegramService.sendMessage(chatId, mensaje);
  }*/

}
