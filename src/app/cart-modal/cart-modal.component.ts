import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Import the CartService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent {
  @Input() cartItems: any[] = [];
  @Output() updateCartCount = new EventEmitter<number>();

  constructor(
    private modalController: ModalController, 
    private router: Router, 
    private cartService: CartService // Inject the CartService
  ) {}

  closeModal() {
    const totalItemsInCart = this.cartService.getCartItems().reduce((acc, item) => acc + item.quantity, 0);
    this.modalController.dismiss({ updateCartCount: totalItemsInCart });
  }

  deleteItem(index: number): void {
    this.cartService.removeItemFromCart(index); // Use CartService to remove item
    this.updateCartCount.emit(this.cartService.getCartItems().length); // Emit the new cart count
    this.cartItems = this.cartService.getCartItems(); // Update the cartItems from the service
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.cartService.updateItemQuantity(index, this.cartItems[index].quantity); // Update quantity in service
      this.updateCartCount.emit(this.cartService.getCartItems().length); // Emit new cart count
    } else {
      this.deleteItem(index); // Remove item if quantity is 1
    }
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.cartService.updateItemQuantity(index, this.cartItems[index].quantity); // Update quantity in service
    this.updateCartCount.emit(this.cartService.getCartItems().length); // Emit new cart count
  }

  getSubtotal(): number {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return parseFloat(subtotal.toFixed(2)); // Round to two decimal places
  }
  
  getTotal(): number {
    const total = this.getSubtotal();
    return parseFloat(total.toFixed(2)); // Round to two decimal places
  }
  

  checkout() {
    if (this.cartItems.length === 0) {
      Swal.fire({
        title: 'Cart is Empty',
        text: 'Please add items to your cart before proceeding to checkout.',
        icon: 'warning',
        confirmButtonText: 'OK',
        backdrop: false, // Disable the background overlay
      });
      return;
    }
  
    // Show loading alert
    Swal.fire({
      title: 'Processing Checkout',
      text: 'Please wait while we process your checkout.',
      allowOutsideClick: false,
      backdrop: false,
      didOpen: () => {
        Swal.showLoading(); // Show loading spinner
      },
    });
  
    // Simulate a delay for processing
    setTimeout(() => {
      // Simulate success or failure of the checkout process
      const paymentSuccessful = true; // Replace with actual payment logic
      const alertMessage = paymentSuccessful
        ? 'Your checkout was successful! Thank you for your purchase.'
        : 'There was an issue with your payment. Please try again.';
  
      Swal.fire({
        title: paymentSuccessful ? 'Checkout Successful!' : 'Checkout Failed',
        text: alertMessage,
        icon: paymentSuccessful ? 'success' : 'error',
        confirmButtonText: 'OK',
        backdrop: false, // Disable the background overlay
      }).then(() => {
        if (paymentSuccessful) {
          this.cartItems = []; 
          this.updateCartCount.emit(0); 
          this.modalController.dismiss(); 
          this.router.navigate(['/payment']); 
        }
      });
    }, 2000); // Simulate a 2-second delay
  }
}  
