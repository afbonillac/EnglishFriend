import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ServicesPage } from '../services/services.page';
import { promises, resolve } from 'dns';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { toLower } from 'ionicons/dist/types/components/icon/utils';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  userMessage: string = '';
  chatMessages: string[] = [];
  inicial: string = 'welcome';
  userLevel: string = '';
  i: number = 0;
  configInit: boolean = false;
  buttonClicked: boolean = false;
  userWelcomeMessage:string = 'yes';
  respuestaPregunta1: boolean = false;
  respuestaPregunta2: boolean = false;
  respuestaPregunta3: boolean = false;
  showQuestion1: boolean = true;
  showQuestion2: boolean = false;
  showQuestion3: boolean = false;
  friendName: string = 'EnglishFriend';
  currentMessage: string = "";
  messageIndex: number = 0;
  wordIndex: number = 0;
  typingSpeed: number = 200; // Velocidad de escritura en milisegundos
 

  constructor(private openaiService: ServicesPage, private storage: Storage) { 
    this.storage.create(); // Inicializa Ionic Storage
  }

  ngOnInit() {
    console.log(this.storage.get('datosUsuario'))
      this.initialForm();
    
  }


  async initialForm() {
    this.chatMessages.push(`¡Bienvenido! EnglishFriend es la mejor APP para practicar inglés. \n Habla con confianza y nuestro sistema de inteligencia artificial te ayudará a mejorar tu nivel de ingles de forma amigable.\n \nRecurda que siempre puedes usar la palabra clave TIPS, para conocer que nuevos secretos te traemos. \n \n¿Deseas seguir viendo este mensaje? (Si/No)`);
    await this.pedirRespuesta('ask1');
  }


  async pedirRespuesta(ask: string): Promise<string> {
    return new Promise(resolve => {

      if (this.userMessage === '') return;
      if (ask === 'ask1'){
        if (this.userMessage.toLowerCase() !== 'si' && this.userMessage.toLowerCase() !== 'no') {
          this.chatMessages.push(`Tú: ${this.userMessage}`);
          this.chatMessages.push(`Por favor, responde con "Si" o "No".`);
          this.userMessage = '';
          return;
        }
      
        else if (this.userMessage.toLowerCase() == 'si' || this.userMessage.toLowerCase() == 'no'){
          this.respuestaPregunta1 = true;
          this.chatMessages.push(`Tú: ${this.userMessage}`); 
          this.userWelcomeMessage = this.userMessage.toLowerCase();
          this.userMessage = '';
        }
      }
      if (ask === 'ask1' && this.respuestaPregunta1) {
        console.log('if2',this.i++);
        this.showQuestion1 = false;
        this.showQuestion2 = true;
        this.respuestaPregunta1 = false;
        this.chatMessages.push(`Ahora selecciona el nivel con el que deseas iniciar (Basico/Intermedio/Avanzado). \n Recuerda que en cualquier momentos puedes escribir (cambia de nivel) y nuestro amigo te permitirá escoger nuevamente`);
        return;
      }
      else if (ask === 'ask2'){
        if (this.userMessage.toLowerCase() !== 'basico' && this.userMessage.toLowerCase() !== 'intermedio' && this.userMessage.toLowerCase() !== 'avanzado') {
          this.chatMessages.push(`Tú: ${this.userMessage}`);
          this.chatMessages.push(`Por favor, responde con "Basico" o "Intermedio" o "Avanzado".`);
          this.userMessage = '';
          return;
        }
      
        else if (this.userMessage.toLowerCase() == 'basico' || this.userMessage.toLowerCase() == 'intermedio' || this.userMessage.toLowerCase() == 'avanzado'){
          this.respuestaPregunta2 = true;
          this.chatMessages.push(`Tú: ${this.userMessage}`); 
          this.userLevel = this.userMessage.toLowerCase();
          this.userMessage = '';
        }
      } 
      if (ask === 'ask2' && this.respuestaPregunta2) {
        this.showQuestion2 = false;
        this.respuestaPregunta2 = false;
        this.showQuestion2 = false;
        this.configInit = true;
        this.chatMessages.push(`¡Excelente! vamos fortalecer nuestra amistad con el inglés.\n \n Hola mi nombre es ${this.friendName} y sere tu mejor amigo, intentemos hablar en inglés apartir de este punto. \n Hi, my name is ${this.friendName} and I will be your best friend, let's try to speak in English from this point on.`);
        
      } 
    });
  }

  sendMessage() {
    const userMessage = this.userMessage.trim();
      if (userMessage === '') return;
      this.chatMessages.push(`Tú: ${userMessage}`);
      if (this.userMessage.toLowerCase().includes('tips')){
        this.chatMessages.push(`Estos son algunos tips para interactuar mejor con EnglishFriend \n 1. Bye Bye: Cierras la conversación por el dí de hoy \n 2. Cambia de nivel: Permitirá ajustar las conversaciones a tus necesidades. \n 3. Intereses: Ayuda a que las conversaciones tengan un enfoque según tus necesidades. \n 4. Cambiar nombre: Permite renombrar a tu amigo.`);
        this.userMessage = '';
      }
      else if (this.userMessage.toLowerCase().includes('bye bye')){
        this.chatMessages.push(`${this.friendName}: Good day, see you tomorrow`);
        this.userMessage = '';
        
      }
      else if (this.userMessage.toLowerCase().includes('cambiar nombre')){
        this.chatMessages.push(`Escribe el nombre de tu nuevo amigo:`);
        this.userMessage = '';
      }
      else if(this.userLevel === 'basico'){
        this.userMessage = 'Actua como un amigo de habla inglesa que me quiere ayudar a aprender el idioma inglés. Revisa la siguientefrase y si esta bien escrita en inlgles continua la conversación. Por el contrario si la frase esta mal escrita o tiene palabras en español explicame como se deberia escribir correctamente en ingles y traduce la explicación a español tambien para comprender mejor, ten en cuenta que estoy en un nivel basico de inglés' , this.userMessage;
      }
      else if(this.userLevel === 'intermedio'){
        this.userMessage = 'Act like a English teacher and analyze the following sentence, if the sentence is well written, continue the conversation. If, on the other hand, it is written incorrectly, correct me, always in English unless otherwise stated in the sentence. If the phrase has words or is written in Spanish, explain how it should be written in English.' , this.userMessage;
      }
      else if(this.userLevel === 'avanzado'){
        this.userMessage = 'Act like a strict English teacher and analyze the following sentence, if the sentence is well written, continue the conversation. If, on the other hand, it is written incorrectly, correct me, always in English unless otherwise stated in the sentence. If the phrase has words or is written in Spanish, explain how it should be written in English. - ' , this.userMessage;
      }
      this.openaiService.sendMessage(this.userMessage).then(response => {
      this.chatMessages.push(`${this.friendName}: ${response}`);
      this.userMessage = '';
      }).catch(error => {
        console.error('Error sending message:', error);
      });
  }  

  
}
