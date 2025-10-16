import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Import the CartService
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface Product { 
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-product-list-two',
  templateUrl: './product-list-two.page.html',
  styleUrls: ['./product-list-two.page.scss'],
})
export class ProductListTwoPage implements OnInit, OnDestroy {

  cartCount: number = 0;
  cartCountSubscription: Subscription | null = null; // Initialize with null
  quantities = [1, 1, 1, 1];

  constructor(
    private menu: MenuController, 
    private navController: NavController, 
    private modalController: ModalController,
    private cartService: CartService, // Inject the CartService
    private router: Router
  ) {}

  goHome() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {
    // Subscribe to cart count updates
    this.cartCountSubscription = this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.menu.toggle(); 
  }

  decreaseQuantity(index: number) {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }

  increaseQuantity(index: number) {
    this.quantities[index]++;
  }

  addToCart(index: number) {
    const product = this.getProductDetails(index);
    const quantity = this.quantities[index];
    const cartItem: Product = { ...product, quantity };

    // Use the CartService to add the item to the cart
    this.cartService.addItemToCart(cartItem);

    // Show SweetAlert notification
    Swal.fire({
      title: 'Successfully Added!',
      text: `${product.name} has been added to your cart!`,
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 5000,
      timerProgressBar: true,
      backdrop: false,
    });
  }

  getProductDetails(index: number): Product {
    const products: Product[] = [
      { name: 'Chocolate Truffles', price: 299.99, image: 'assets/image/truffles.jpg', quantity: 0 },
      { name: 'Dark Chocolate Bar', price: 149.99, image: 'assets/image/chocobar.jpg', quantity: 0 },
      { name: 'Milk Chocolate Box', price: 249.99, image: 'assets/image/milkchocolate.jpg', quantity: 0 },
      { name: 'Chocolate Fudge', price: 129.99, image: 'assets/image/fudge.jpg', quantity: 0 }
    ];
    return products[index];
  }

  // Get the current cart items from the CartService
  getCartItems() {
    return this.cartService.getCartItems();
  }

  // Update the cart count from the service
  updateCartCount() {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: { cartItems: this.cartService.getCartItems() }, // Pass cart items to modal
    });

    modal.onDidDismiss().then(() => {
      this.updateCartCount(); // Update cart count after modal is closed
    });

    return await modal.present();
  }
}
