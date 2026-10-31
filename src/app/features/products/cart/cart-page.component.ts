import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  readonly cart = inject(CartService);

  updateQuantity(productId: number, event: Event): void {
    const quantity = Number((event.target as HTMLInputElement).value);
    this.cart.setQuantity(productId, quantity).subscribe();
  }

  removeProduct(productId: number): void {
    this.cart.removeProduct(productId).subscribe();
  }

  clearCart(): void {
    this.cart.clear().subscribe();
  }
}
