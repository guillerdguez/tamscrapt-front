// app.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from './Service/carrito/CartService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corregido
})
export class AppComponent implements OnInit {
  title = 'Tamscrapt';
  isDarkMode: boolean = false; // Inicializar a false por defecto

  constructor(
    public messageService: MessageService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.isDarkMode = this.isSystemDark(); // Establecer según preferencia del sistema
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  isSystemDark(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
}
