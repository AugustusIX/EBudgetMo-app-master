import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-share-tips',
  templateUrl: './share-tips.page.html',
  styleUrls: ['./share-tips.page.scss'],
})
export class ShareTipsPage implements OnInit {

  constructor(private alertController: AlertController,
    private dataService: DataService,
    private storage: Storage,
    private modalController: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    console.log("Share a tip modal loaded");
  }

  submit(tip) {

    if (tip != "") {
      this.storage.get("user_data").then((user_data) => {
        let data = JSON.parse(user_data);
        let submit_tip = {
          tip: tip,
        }

        this.dataService.submitTip(submit_tip).subscribe((successData) => {
          console.log("tip submitted")
          this.presentToast();
          this.modalController.dismiss();

        }, (err => console.error(err)));
      });
    } else {
      this.presentAlert("Please write a tip");
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `Your tip is submitted. Thanks for sharing a tip!`,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  cancel() {
    this.modalController.dismiss();
  }

}
