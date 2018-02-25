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