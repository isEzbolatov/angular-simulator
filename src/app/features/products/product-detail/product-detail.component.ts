import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { IProduct } from '../product.interface';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CardModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly cart = inject(CartService);

  readonly product = this.route.snapshot.data['product'] as IProduct;

  readonly addedToCart = signal(false);

  addToCart(): void {
    this.cart.addProduct(this.product).subscribe((response) => {
      if (response) {
        this.addedToCart.set(true);
      }
    });
  }
}
