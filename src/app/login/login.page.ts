import { Component, OnInit } from '@angular/core';
import { BigQuery } from '@google-cloud/bigquery';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string | undefined;
  password: string | undefined;
  //bigquery: BigQuery;

  constructor() {
    /*this.bigquery = new BigQuery({
      keyFilename: './src/security/ef-test-397602-49949f93d460.json',
    });*/
   }
   async login() {
    // Realiza la autenticación y consulta en BigQuery
    //const query = `SELECT * FROM ef-test-397602.EnglishFriend.Users WHERE mail = '${this.email}' AND password = '${this.password}'`;
    //const options = { query };
    
   /* try {
      const [rows] = await this.bigquery.query(options);
      if (rows.length > 0) {
        // Usuario autenticado
      } else {
        // Usuario no válido
      }
    } catch (error) {
      // Manejo de errores
    }*/
   }
  ngOnInit() {
  }

}
