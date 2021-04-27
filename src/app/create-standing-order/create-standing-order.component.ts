import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-standing-order',
  templateUrl: './create-standing-order.component.html',
  styleUrls: ['./create-standing-order.component.scss'],
})
export class CreateStandingOrderComponent implements OnInit {
 

  constructor(private router: Router) {}

  ngOnInit(): void {
  

  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }

}
