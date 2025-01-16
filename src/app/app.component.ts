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

// import { Component, OnInit } from '@angular/core';
// import { MessageService } from 'primeng/api';
// import { CartService } from './Service/carrito/CartService';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements OnInit {
//   title = 'Tamscrapt';
//   isDarkMode = true;

//   constructor(
//     public messageService: MessageService,
//     private cartService: CartService
//   ) {}

//   ngOnInit() {
//     // Detectar la preferencia del usuario
//     this.isDarkMode =
//       window.matchMedia &&
//       window.matchMedia('(prefers-color-scheme: dark)').matches;
//     this.applyDarkMode(this.isDarkMode);
//   }

//   toggleDarkMode() {
//     this.isDarkMode = !this.isDarkMode;
//     this.applyDarkMode(this.isDarkMode);
//   }

//   private applyDarkMode(isDark: boolean) {
//     if (isDark) {
//       document.body.classList.add('dark-mode');
//     } else {
//       document.body.classList.remove('dark-mode');
//       console.log('toggleDarkMode');
//     }
//   }
// }
