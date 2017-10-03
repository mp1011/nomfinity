import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>HEADER</div>

  <router-outlet></router-outlet>
  <div>FOOTER</div>
  `
})
export class AppComponent {
  title = 'app';

  ngOnInit():void
  {
    this.title= "hey";
  }
}
