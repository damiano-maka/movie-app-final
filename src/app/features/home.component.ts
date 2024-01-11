import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p>
      home works!
    </p>
  `,
  styles: ``
})
export default class HomeComponent implements OnInit {
  http = inject(HttpClient)

  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe(res => console.log(res))
  }
}
