import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories = [
    {
      title: 'Lettering',
      description: 'Todo lo que necesitas para lettering creativo.',
      link: '/lettering',
      image: 'https://m.media-amazon.com/images/I/61Wv7ihKCuL._AC_SL1001_.jpg'
    },
    {
      title: 'Scrapbooking',
      description: 'Materiales y kits para scrapbooking.',
      link: '/scrapbooking',
      image: 'https://m.media-amazon.com/images/I/81oFkzA9pCL._AC_SL1500_.jpg'
    },
    {
      title: 'Papelería',
      description: 'Los mejores artículos de papelería.',
      link: '/productos',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkEjuMveu-4ukf1LWxnDhtihgqwDJk3Acj2w&s'
    }
  ];

  testimonials = [
    { quote: '¡Los mejores productos para lettering! Altamente recomendados.', author: 'Ana Pérez' },
    { quote: 'Gran calidad y servicio. Mis pedidos llegaron rápido.', author: 'Carlos García' },
    { quote: 'Materiales perfectos para mi proyecto de scrapbooking.', author: 'Laura Fernández' }
  ];
}
