import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
  ) { }

  getChartData() {
    return this.http.get(`${environment.jsonUrl}`);
  }

  checkGithubIssues(data) {
    return this.http.get(`${environment.githubUrl}/repos/${data.owner}/${data.repo}/issues?state=all`);
  }

  ownerDetails(owner){
    return this.http.get(`${environment.githubUrl}/users/${owner}`);
  }

}
