import { Component, inject, input } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Pizza } from '../../models/pizza';
import { CartService } from '../../sercices/cart-service';

@Component({
  selector: 'app-pizza-card',
  imports: [Button, Card],
  templateUrl: './pizza-card.html',
  styleUrl: './pizza-card.css'
})
export class PizzaCard {
  pizza = input.required<Pizza>()

  private _cartService = inject(CartService);

  addToCart() {
    this._cartService.add(this.pizza().id); 
  }
}
