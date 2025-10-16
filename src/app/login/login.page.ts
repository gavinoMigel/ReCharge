import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private navCtrl: NavController) {}

  onLogin() {
    const validEmail = 'Homer@gmail.com';
    const validPassword = 'sumagpao12';

    if (!this.email || !this.password) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in both email and password fields.',
        icon: 'warning',
        confirmButtonText: 'OK',
        backdrop: false,
      });
      return;
    }

    // Show the loading alert
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait...',
      allowOutsideClick: false,
      backdrop: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate a delay to mimic server-side authentication
    setTimeout(() => {
      if (this.email.toLowerCase() === validEmail.toLowerCase() && this.password === validPassword) {
        Swal.close(); // Close the loading alert
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome to ReCharge!',
          icon: 'success',
          confirmButtonText: 'OK',
          backdrop: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.navCtrl.navigateRoot('/home');
          }
        });
      } else {
        Swal.close(); // Close the loading alert
        this.loginError = 'Invalid email or password';
        Swal.fire({
          title: 'Login Failed',
          text: 'Please check your credentials and try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          backdrop: false,
        });
      }
    }, 1500); 
  }
}
