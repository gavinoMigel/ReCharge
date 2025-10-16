import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Import CartService
import { CartModalComponent } from '../cart-modal/cart-modal.component';  // Import your Cart Modal
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit, OnDestroy {
  cartItems: Array<{ name: string; price: number; quantity: number; image: string }> = [];
  cartCount: number = 0;
  cartCountSubscription: Subscription | null = null;

  categories: Array<{ name: string; image: string }> = [
    { name: 'Sorbet', image: 'assets/image/sorbet.png' },
    { name: 'Sundae', image: 'assets/image/sundae.png' },
    { name: 'Popsicles', image: 'assets/image/popsicles.png' }
  ];

  constructor(
    private menu: MenuController,
    private navController: NavController,
    private router: Router,
    private modalController: ModalController, // Inject ModalController
    private cartService: CartService // Inject CartService
  ) {}
  
  toggleMenu() {
    this.menu.toggle(); 
  }

  ngOnInit() {
    // Subscribe to cart count updates from CartService
    this.cartCountSubscription = this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });

    // Retrieve cart items (if any) when the component is initialized
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }
  }

  // Method to add item to the cart using CartService
  addToCart(item: { name: string; price: number; }) {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Provide default values for image and quantity
      const fullItem = { 
        ...item, 
        image: 'assets/image/default.png',  // Set an appropriate default image or provide logic for each item
        quantity: 1 
      };
      this.cartItems.push(fullItem);
    }

    // Use CartService to update the cart and persist data
    this.cartService.addItemToCart({ 
      name: item.name, 
      price: item.price, 
      image: 'assets/image/default.png',  // Use the same default image here
      quantity: 1 
    });
  }

  // Open the cart modal and pass cart items to it
  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: { cartItems: this.cartItems }, // Pass cart items to modal
    });
    return await modal.present();
  }
}
