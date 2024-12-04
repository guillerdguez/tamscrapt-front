import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
 

@Component({
  selector: 'app-switch',
  templateUrl: `./input-switch.component.html`,
  styleUrl: './input-switch.component.css',
})
export class InputSwitchComponent {
  #document = inject(DOCUMENT);
  isDarkMode = true;

  toggleLightDark() {
    const linkElement = this.#document.getElementById('app-theme') as HTMLLinkElement;
    if (linkElement.href.includes('light')) {
      linkElement.href = 'theme-dark.css';
      this.isDarkMode = true;
    } else {
      linkElement.href = 'theme-light.css';
      this.isDarkMode = false;
    }
  }

  constructor() {
    if (this.isSystemDark()) {
      this.toggleLightDark();
    }
  }
  
  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }
}
