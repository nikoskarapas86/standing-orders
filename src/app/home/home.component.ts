import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  features: { title: string; imgSrc: string; onClick: () => void }[] = [
    {
      title: 'ΔΗΜΙΟΥΡΓΙΑ ΠΑΓΙΑΣ',
      imgSrc: './assets/images/create.svg',
      onClick: () => this.router.navigate(['/*']),
    },
    {
      title: 'ΑΝΑΖΗΤΗΣΗ ΠΑΓΙΑΣ',
      imgSrc: './assets/images/search.svg',
      onClick: () => this.router.navigate(['/search']),
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
