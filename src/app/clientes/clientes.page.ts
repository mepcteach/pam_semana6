import { Component, OnInit } from '@angular/core';
import { MiapiService } from '../services/miapi.service'
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  users: any[] = [];
  nuevoUsuario = { name: '', email: '' }; // Datos del nuevo usuario

  constructor(private miapiService: MiapiService, private menu: MenuController, private alertController: AlertController) { }

  ngOnInit() {
    this.menu.close("mainMenu");
     // Llama al método GET y suscríbete a los datos
     this.miapiService.getUsers().subscribe(
      (data) => {
        this.users = data; // Almacena los datos en una variable
      },
      (error) => {
        this.mostrarAlerta(error);
        //console.error('Error al obtener los usuarios:', error);
      }
    );
  }
   // Función para agregar un nuevo usuario
   agregarUsuario() {
    this.miapiService.addUser(this.nuevoUsuario).subscribe(
      (response) => {
        this.mostrarAlerta('Usuario agregado:'+ response); 
        this.users.push(response); // Agregar el nuevo usuario a la lista
        this.nuevoUsuario = { name: '', email: '' }; // Limpiar el formulario
      },
      (error) => {
        this.mostrarAlerta(error);
        //console.error('Error al agregar el usuario:', error);
      }
    );
  }

  
  // Método para mostrar alerta sobre el stock del producto
  async mostrarAlerta(mensaje:any) {
    const alert = await this.alertController.create({
      header: 'Mi app',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
