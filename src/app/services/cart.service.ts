import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  // Use BehaviorSubject to emit cart count changes

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    // Load cart data from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCartCount();  // Update the cart count based on localStorage
    }
  }

  // Get the items in the cart
  getCartItems() {
    return this.cartItems;
  }

  // Add item to the cart
  addItemToCart(item: any) {
    this.cartItems.push(item);
    this.saveCartToLocalStorage();
    this.updateCartCount();
  }

  // Remove item from the cart
  removeItemFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartToLocalStorage();
    this.updateCartCount();
  }

  // Update quantity of an item
  updateItemQuantity(index: number, quantity: number) {
    this.cartItems[index].quantity = quantity;
    this.saveCartToLocalStorage();
    this.updateCartCount();
  }

  // Clear the cart from both memory and localStorage
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.updateCartCount();
  }

  // Save cart data to localStorage
  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Update the cart count and emit the value
  private updateCartCount() {
    const count = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartCountSubject.next(count);  // Emit the new cart count
  }

  // Get the total count of items in the cart as an observable
  getCartCount() {
    return this.cartCountSubject.asObservable();  // Return as Observable<number>
  }
}
