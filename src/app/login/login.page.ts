import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin = true;
  constructor(private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage) { }

  ngOnInit() {
  }



  register(email, password, name, gender, confirmpassword, userType) {
    if (email != "" && password != "" && name != "") {
      if(confirmpassword == password){
      this.authService.register(email, password, name, gender, userType).subscribe((successData) => {
        if(confirmpassword != password){
          let alert = this.alertController.create({
            header:"ATTENTION",
            message:"Password Do Not Match",
            buttons: ['OK']
          }).then(alert => {
            alert.present();
          });
        }  
        else {
          let alert = this.alertController.create({
            header:"Registration",
            message:"Thank you for using Ebudgetmo, please wait for your account approval.",
            buttons: ['OK']
          }).then(alert => {
            alert.present();
          });
          // this.presentAlert(successData.message);
        }

      }, (error) => console.log(error))
    }else{
      let alert = this.alertController.create({
        header:"ATTENTION",
        message:"Password Do Not Match",
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
      // this.presentAlert("Passwords do not match")
    }
  }
    else {
      let alert = this.alertController.create({
        header:"ATTENTION",
        message:"Please fill all fields",
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
      // this.presentAlert("Please fill all fields")
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  segmentChanged(ev) {
    if (ev.detail.value == "register") {
      this.isLogin = false;
    } else {
      this.isLogin = true;

    }
  }

  login(email, password) {
    if (email != "" && password != "") {
      this.authService.login(email, password).subscribe((successData) => {
        console.log(successData);
        let user_data = {
          id: successData.id,
          email: successData.email,
          full_name: successData.full_name,
          avatar_src: successData.avatar_src
        }
        console.log(successData)
        this.storage.set('user_data', JSON.stringify(user_data));
        this.storage.set('isNotified', false);

        this.router.navigate(["tab"]);

      }, (error) => {
        console.log(error)
        this.presentAlert(error.error.message);
      });
    } else {
      let alert = this.alertController.create({
        header:"ATTENTION",
        message:"Please fill all fields",
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
      // this.presentAlert("Please fill all fields")
    }
  }



}
