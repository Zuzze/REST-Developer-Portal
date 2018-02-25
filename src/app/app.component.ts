import { Component, OnInit } from '@angular/core';
import { GET_USERS } from '../data/getUsers'
import { CREATE_NEW_USER } from '../data/createNewUser'

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

  constructor(){ }

  ngOnInit(): void { }


  // change image on hover (hover images end with word "Hover")
  // img would be own component in real app
  hoverImg(img) {
    img.setAttribute('src', 'https://3.bp.blogspot.com/-Z0RUKcgYkuI/WpNHybn5vbI/AAAAAAAAZkY/93Vc7F5jBncN7ke4SBcub35_KN8JNzuJwCLcBGAs/s1600/userHover.png');
  }

  unhoverImg(img) {
    img.setAttribute('src', 'https://3.bp.blogspot.com/-BYBpg2fiJ6c/WpNHx5O2WCI/AAAAAAAAZkQ/1x2xF7nfG8k-FScVm3qWQ8pgMU4SXoMKQCLcBGAs/s1600/user.png');
  }
}