import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: "root"})
export class CartService {
  cart = signal<{ id: number, free: boolean }[]>([])

  add(id: number) {
    this.cart.update(prev => [
      // les éléments de mon ancien panier
      ...prev,
      { id, free: false}])
  }

  remove(index: number) {
    this.cart.update(prev => prev.filter((_, i) => i !== index))
  }
}
