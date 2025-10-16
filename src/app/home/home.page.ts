import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Import CartService
import { CartModalComponent } from '../cart-modal/cart-modal.component';  // Import your Cart Modal
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  cartItems: Array<{ name: string; price: number; quantity: number; image: string }> = [];
  cartCount: number = 0;
  cartCountSubscription: Subscription | null = null;

  categories: Array<{ name: string; image: string }> = [
    { name: 'Sorbet', image: 'assets/image/sorbet.png' },
    { name: 'Sundae', image: 'assets/image/sundae.png' },
    { name: 'Popsicles', image: 'assets/image/popsicles.png' }
  ];

  // Updated example reviews with names and images
  reviews = [
    {
      name: 'Jamela Villanueva',
      rating: 5,
      comment: 'ReCharge is my go-to energy drink! Refreshing flavor. Highly recommend.',
      avatar: 'assets/image/jamela.webp', 
    },
    {
      name: 'Maris Racal',
      rating: 4,
      comment: 'Great taste, but a bit too sweet for me. Good energy boost overall!',
      avatar: 'assets/image/maris.jpg',
    },
    {
      name: 'Rico Blanco',
      rating: 4,
      comment: 'Didnt feel much energy from ReCharge, and the aftertaste wasnt great..',
      avatar: 'assets/image/rico.jpg',
    },
    {
      name: 'Anthony Jennings',
      rating: 5,
      comment: 'Love ReCharge! Its perfect for long days, and the flavors are awesome!',
      avatar: 'assets/image/anthony.jpeg',
    }
  ];

  showMore: boolean = false;
  lastScrollPosition: number = 0;

  constructor(
    private menu: MenuController,
    private navController: NavController,
    private router: Router,
    private modalController: ModalController, // Inject ModalController
    private cartService: CartService // Inject CartService
  ) {}

  toggleSeeMore() {
    this.showMore = !this.showMore;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPosition = window.pageYOffset;

    // Show the content when the user scrolls up
    if (currentScrollPosition < this.lastScrollPosition) {
      this.showMore = true;
    } else {
      this.showMore = false;
    }

    // Update the last scroll position
    this.lastScrollPosition = currentScrollPosition;
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

  // Get the stars based on rating
  getStars(rating: number) {
    return new Array(5).fill(0).map((_, index) => index < rating);
  }

  // Method to navigate to the category page
  navigateToCategory(category: { name: string; image: string }) {
    switch (category.name) {
      case 'Sorbet':
        this.navController.navigateForward('/product-list-one');
        break;
      case 'Sundae':
        this.navController.navigateForward('/product-list-two');
        break;
      case 'Popsicles':
        this.navController.navigateForward('/product-list-three');
        break;
      default:
        console.log('Category not found');
    }
  }

  // Open the cart modal and pass cart items to it
  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: { cartItems: this.cartItems }, // Pass cart items to modal
    });
    return await modal.present();
  }

  // Method to toggle the side menu
  toggleMenu() {
    this.menu.toggle();
  }

  // Method to handle the like button toggle effect (heart icon)
  toggleHeart(event: any) {
    event.stopPropagation();
    const icon = event.target;
    if (icon.name === 'heart-outline') {
      icon.name = 'heart';
      icon.classList.add('liked');
    } else {
      icon.name = 'heart-outline';
      icon.classList.remove('liked');
    }
  }

  // Navigate to specific category pages
  goToSorbetPage() {
    this.router.navigate(['/product-list-one']);
  }

  goToSundaePage() {
    this.router.navigate(['/product-list-two']);
  }

  goToPopsiclesPage() {
    this.router.navigate(['/product-list-three']);
  }

  goToProductsPage() {
    this.router.navigate(['/product']);
  }
  
  goHome() {
    this.router.navigate(['/home']);
  }

}
