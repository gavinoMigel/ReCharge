import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Import CartService
import { CartModalComponent } from '../cart-modal/cart-modal.component'; 
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {
  flippedCards: boolean[] = [false, false, false];
  cartCount: number = 0;
  cartCountSubscription: Subscription | null = null;

  cards = [
    {
      frontImage: 'assets/image/energy.jpg',
      backImage: 'assets/image/energy.jpg',
      route: '/product-list-one', 
    },
    {
      frontImage: 'assets/image/PureJCBanner.jpg',
      backImage: 'assets/image/PureJCBanner.jpg',
      route: '/product-list-two',
    },
  ];

  constructor(
    private menu: MenuController,
    private navController: NavController,
    private cartService: CartService, // Inject CartService
    private modalController: ModalController,
    private router: Router // Inject ModalController
  ) {}

  ngOnInit() {
    // Subscribe to cart count updates from CartService
    this.cartCountSubscription = this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.menu.toggle();
  }

  // Method to flip card on click
  flipCard(index: number) {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  // Navigate to the specific product page
  goToProductPage(event: Event, route: string) {
    event.stopPropagation();
    console.log(`Redirecting to product details page: ${route}`);
    this.navController.navigateForward(route); 
  }

  // Open the cart modal
  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: { cartItems: this.cartService.getCartItems() }, // Get cart items from the service
    });
    return await modal.present();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
