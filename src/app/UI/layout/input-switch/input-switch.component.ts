// input-switch.component.ts
import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './input-switch.component.html',
  styleUrl: './input-switch.component.css',
})
export class InputSwitchComponent implements OnInit {
  @Input() isDarkMode: boolean = false;
  @Output() darkModeToggle = new EventEmitter<boolean>();

  private documentRef = inject(DOCUMENT);

  ngOnInit() {
    this.applyTheme(this.isDarkMode);
  }

  alternarLightDark() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);
    this.darkModeToggle.emit(this.isDarkMode);
  }

  private applyTheme(isDark: boolean): void {
    const linkElement = this.documentRef.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (linkElement) {
      linkElement.href = isDark ? 'theme-dark.css' : 'theme-light.css';
    }
    this.documentRef.body.classList.toggle('dark-mode', isDark);
  }
}
