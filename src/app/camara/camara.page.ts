import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  capturedImage: string | undefined;

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.close("mainMenu");
  }


  async captureImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,                          // Calidad de la imagen
        resultType: CameraResultType.DataUrl, // Formato como Data URL para mostrar en HTML
        source: CameraSource.Camera           // Fuente: Cámara
      });

      this.capturedImage = image.dataUrl; // Guarda la imagen capturada para mostrarla
    } catch (error) {
      alert('Error al capturar la imagen:'+' - '+ error);
    }
  }


}
