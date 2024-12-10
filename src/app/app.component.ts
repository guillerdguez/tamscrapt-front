import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { CartService } from './Service/carrito/CartService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tamscrapt';
  isDarkMode = true;
  constructor(
    public messageService: MessageService,
    private cartService: CartService
  ) {}
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
