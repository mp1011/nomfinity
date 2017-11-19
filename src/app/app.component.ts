import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <Header></Header>
  <router-outlet></router-outlet>
  <Footer></Footer>
  <left_border></left_border>
  <right_border></right_border>
  `
})
export class AppComponent {
  title = 'app';

  ngOnInit():void
  {
    this.title= "hey";
  }
}
