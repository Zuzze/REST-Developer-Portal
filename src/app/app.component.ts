import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface UserResponse {
  login: string,
  bio: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.http.get<UserResponse>('https://api.github.com/users/zuzze').subscribe(
      data => {
      console.log("User Login: " + data.login);
    }, 
  (err : HttpErrorResponse) => {
    if(err.error instanceof Error){
      console.log("Client-side error occured");
    }
    console.log("server-side error occured");
  });
  }

}
