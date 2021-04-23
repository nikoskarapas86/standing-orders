import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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
      onClick: () => this.router.navigate(['/create/search-policy']),
    },
    {
      title: 'ΑΝΑΖΗΤΗΣΗ ΠΑΓΙΑΣ',
      imgSrc: './assets/images/search.svg',
      onClick: () => this.router.navigate(['/search']),
    },
  ];

  constructor(private router: Router, private dataService: DataService) {
 
  }

  ngOnInit(): void {}
}
