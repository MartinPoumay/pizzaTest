import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from './sercices/cart-service';
import { OverlayBadge } from 'primeng/overlaybadge';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterModule, OverlayBadge, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  cartService = inject(CartService);
  cartCount = computed(() => this.cartService.cart().length);
  cartCount2 = this.cartService.cart().length;
}
