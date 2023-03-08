import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Yo !!';
  constructor() {
    setTimeout(() => {
      this.title = "Welcome Cody"
    }, 3000)
  }
}
