import { Component, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, reduce } from 'rxjs';
import { Pizza } from '../../models/pizza';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CartService } from '../../sercices/cart-service';

@Component({
  selector: 'app-cart',
  imports: [Button, TableModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
 
  private _cart = inject(CartService);
  private _http = inject(HttpClient);
  private _msg = inject(MessageService)
 
  cart = signal<Pizza[]>([]);
  total = computed(() => this.cart().reduce((prev, current) =>current.prix + prev, 0))
  cartCount = computed(() => this.cart().length);
 
 
  constructor() {
    effect(() => {
      if(this._cart.cart().length===0){
        this.cart.set([]);
        return;
      }
      forkJoin(this._cart.cart().map(item =>
        this._http.get<Pizza>('http://localhost:3000/pizza/'+item.id)
      )).subscribe(data => this.cart.set(data));  
    })
  }
 
  removeFromCart(i:number){
    this._cart.remove(i);
  }
 
  order(){
    this._http.post<void>('http://localhost:3000/commandes', this._cart.cart()).subscribe(()=>{
      this._msg.add({severity:'success', detail:'Votre commande a été envoyée...'})
      this._cart.cart.set([]);
    })
  }
}