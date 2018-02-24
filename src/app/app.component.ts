import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GET_USERS } from '../data/getUsers'
import { CREATE_NEW_USER } from '../data/createNewUser'

interface UserResponse {
  login: string,
  bio: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// in this container raw data is fetched (GET_USERS and CREATE_USERS) and used to greate explorer components
// same explorer component template is used for all
export class AppComponent implements OnInit {
  title = 'app';
  getUsers = GET_USERS;
  createUser = CREATE_NEW_USER;

  constructor(private http: HttpClient){ }

  ngOnInit(): void {

    console.log(this.getUsers);
    //GET data
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

  //POST data
  const req = this.http.post('https://jsonplaceholder.typicode.com/posts/', {
    title: 'foo',
    body: 'bar',
    userId: 1
  })
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      });
  }

  postData(){

  }

  getData(){
    
  }

  // change image on hover (hover images end with word "Hover")
  hoverImg(img) {
    let format = img.src.substring(img.src.indexOf('.'));
    let name = img.src.substring(0, img.src.indexOf('.'));
    img.setAttribute('src', name + "Hover" + format);
  }

  unhoverImg(img) {
    let format = img.src.substring(img.src.indexOf('.'));
    let name = img.src.substring(0, img.src.indexOf('Hover'));
    img.setAttribute('src', name + format);
}

}
