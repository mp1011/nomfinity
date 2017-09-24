import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>Hello {{title}}</div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit():void
  {
    this.title= "hey";
  }
}
