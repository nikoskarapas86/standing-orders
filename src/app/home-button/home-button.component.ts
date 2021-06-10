import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss'],
})
export class HomeButtonComponent implements OnInit {
  constructor(private router: Router) {}
 @Input() atSearchScreen:boolean = false;
  ngOnInit(): void {
 
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
