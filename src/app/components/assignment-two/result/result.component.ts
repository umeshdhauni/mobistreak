import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  githubData: any;
  closedUsers=[];

  @Input() set _gitData(value: any) {
    if(value){
      this.githubData = value; 
      this.getUsers();  
    }
  }

  get _gitData(): any {
    return this.githubData;
  }

  constructor(
    private common:CommonService
  ) { }

  ngOnInit() {
    
  }

  getUsers(){
    this.githubData.issues.forEach(element => {
        if(element.state == 'closed'){
          this.common.ownerDetails(element.user.login).subscribe(res =>{
            this.closedUsers.push(res);
          })
        }
    });
  }

}
