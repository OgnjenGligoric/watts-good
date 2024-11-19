import {ChangeDetectorRef, Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./layout/navbar/navbar.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import "leaflet/dist/images/marker-shadow.png"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CommonModule,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WattsGood';
  show: boolean = true;
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.checkNavbarVisibility();
    this.router.events.subscribe(() => {
      this.checkNavbarVisibility();
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }
  checkNavbarVisibility(){
    this.show = !(['/sign-in', '/activate-super-admin', '/register'].includes(this.router.url) || this.router.url.includes('/activate/'));
  }
}
