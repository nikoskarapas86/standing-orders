import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PolicyDetailService } from './policy-details.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private policyDetailService:PolicyDetailService) {

   }



  ngOnInit(): void {
   this.policyDetailService.getPolicyByEmail(this.route.snapshot.params.searchId).subscribe(
     res => 
     this.policyDetailService.setPolicySubject(res)
     ,error => console.log(error)
     )
  }

}
