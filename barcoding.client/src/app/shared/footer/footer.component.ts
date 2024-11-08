import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  getYear() {
    return new Date().getUTCFullYear();
  }
}

@NgModule({
  exports: [FooterComponent],
  declarations: [FooterComponent],
})
export class FooterModule { }
