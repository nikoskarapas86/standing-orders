import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PolicyDetailService } from './policy-details.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss'],
})
export class PolicyDetailsComponent implements OnInit {
  isPolicyLoading = true;

  constructor(private route: ActivatedRoute, private policyDetailService: PolicyDetailService) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params.searchId);
    this.policyDetailService.getPolicyByEmail(this.route.snapshot.params.searchId).subscribe(
      res => {
        this.policyDetailService.isFailedSubject.next(false);
        this.isPolicyLoading = false;
      },
      error => {
        this.policyDetailService.isFailedSubject.next(true);
      }
    );
  }
}
