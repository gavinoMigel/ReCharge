import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'; 
import { CartService } from './cart.service';  // Import CartService

@Injectable({
  providedIn: 'root'  // This makes sure the service is available globally
})
export class PaymentService {

  constructor(private cartService: CartService) { }

  // Simulate payment process
  makePayment(paymentDetails: any): Observable<any> {
    const success = Math.random() > 0.5; // Simulate a random payment success or failure
    if (success) {
      this.clearCart(); // Clear the cart if payment is successful
      return of({
        success: true,
        message: `Payment successful with ${paymentDetails.paymentMethod}!`,
        transactionId: 'TX123456789',
      });
    } else {
      return of({
        success: false,
        message: `Payment failed for ${paymentDetails.paymentMethod}. Please try again later.`,
        transactionId: null, 
      });
    }
  }

  // Function to clear the cart
  private clearCart() {
    this.cartService.clearCart(); // Call the CartService to clear the cart
  }
}
