import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-assignment-two',
  templateUrl: './assignment-two.component.html',
  styleUrls: ['./assignment-two.component.scss']
})
export class AssignmentTwoComponent implements OnInit {
  showForm:boolean = true;
  githubData:any={
    issues:[],
    owner:'',
    repo:''
  }
  err;
  constructor(
    private commonService:CommonService
  ) { }

  ngOnInit() {
  }

  checkGithub(data){
    this.commonService.checkGithubIssues(data).subscribe(res =>{
      this.githubData.issues = res;
      this.githubData.repo = data.repo;
      this.getUserData(data.owner);
    },(err) =>{
      this.err = err;
      setTimeout(() =>{
        this.err =null;
      },3000)
    })
  }

  getUserData(data){
    this.commonService.ownerDetails(data).subscribe(res =>{
      this.githubData.owner = res;
      this.showForm = false;
    },(err) =>{
      
    })
  }

  formAgain(){
    this.showForm = true;
  }

  close(){
    this.err = null;
  }
}
