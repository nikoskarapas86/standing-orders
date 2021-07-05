import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineOfBusiness } from '../models/line-of-business';
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
    {
      title: 'ΕΝΤΟΛΕΣ ΕΙΣΠΡΑΞΗΣ',
      imgSrc: './assets/images/receipts.svg',
      onClick: () => this.router.navigate(['/receipt']),
    },
  ];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    if (!this.dataService.lineOfbusinessesSubject.value) {
      this.dataService.searchLinesOfBusiness().subscribe((res: LineOfBusiness[]) => {
        this.dataService.setLineOfbusinessesSubject(res);
      });
    }
  }
}
