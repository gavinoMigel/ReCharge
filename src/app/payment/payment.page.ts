import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { PaymentService } from '../services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paymentMethod: string = 'Paymaya';
  phoneNumber: string = '';
  address: string = '';

  constructor(private menu: MenuController, private paymentService: PaymentService, private router: Router) {}

  ngOnInit() {}

  toggleMenu() {
    this.menu.toggle();
  }

  async processPayment() {
    const paymentDetails = {
      paymentMethod: this.paymentMethod,
      phoneNumber: this.phoneNumber,
      address: this.address,
    };
  
    try {
      const response = await this.paymentService.makePayment(paymentDetails).toPromise();
  
      // Debugging log
      console.log('Payment Response:', response);
  
      // Show SweetAlert based on actual response
      this.showSweetAlert(response.success, response.message, response.transactionId);
    } catch (error) {
      console.error('Payment Error:', error);
  
      // Fallback error alert
      this.showSweetAlert(false, 'Something went wrong. Please try again.', null);
    }
  }
  

  async showSweetAlert(success: boolean, message: string, transactionId: string | null) {
    const alertMessage = success
      ? `${message} Transaction ID: ${transactionId}`
      : message;
  
    Swal.fire({
      title: success ? 'Payment Successful!' : 'Payment Failed',
      text: alertMessage,
      icon: success ? 'success' : 'error',
      confirmButtonText: 'OK',
      backdrop: false, // Disable the background overlay
    }).then(() => {
      if (success) {
        // Navigate to the home page when payment is successful
        this.router.navigate(['/home']);
      } else {
        // Navigate back to the payment page when payment fails
        this.router.navigate(['/payment']);
      }
    });
  }
}