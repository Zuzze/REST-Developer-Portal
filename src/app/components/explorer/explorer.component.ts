import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

interface UserResponse {
  email: string;
  name: string;
  phone: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})

export class ExplorerComponent implements OnInit {
  //DOM references
  @ViewChild('responses') //refers to #responses
  private responsesHTML: ElementRef;

  //parent input, comes from app.component.html
  @Input()  title: string;
  @Input()  url: string;
  @Input()  method: string;
  @Input()  headers: object;
  @Input()  contentType: string;
  @Input()  body?: object[];

  //user input
  name: string = "";
  email: string = "";
  phone: string = "";
  JSONRequest: string;
  responses: string = "";
  headerKeyArr: string[];
  headerValueArr;
  headerArr;
  requestSent: boolean;

  //Validators
  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  constructor(private http: HttpClient) { 
    //used only for dependency injections in Angular 2+ (e.g services)
    //HTML attributes initialized in the beginning of the class
  }

  ngOnInit() {
    this.updateJSONRequest();
    this.headerArr = Object.entries(this.headers);
    this.headerKeyArr = Object.keys(this.headers);
    this.headerValueArr = Object.values(this.headers);
    this.requestSent = false;
  }

  ngOnChange() {
    this.updateJSONRequest();
    this.headerArr = Object.entries(this.headers);
    this.headerKeyArr = Object.keys(this.headers);
    this.headerValueArr = Object.values(this.headers);
  }
  
  //POST new user data
  postUserAPI(){
  const req = this.http.post(
    'https://jsonplaceholder.typicode.com/users/', 
    JSON.parse(this.JSONRequest))
    .subscribe(
      res => {
        console.log(res);
        this.responsesHTML.nativeElement.innerHTML =  this.beautifyJSON(res);
      },
      err => {
        console.log("Error occured");
      });
  }

  //GET users data
  getUsersAPI(){
    this.http.get<UserResponse>('https://jsonplaceholder.typicode.com/users').subscribe(
      data => {
      //print single parameter:
      //console.log(data[1].email); 
      //console.log(data[1].name);

      //print all objects
      console.log(data);
      this.responsesHTML.nativeElement.innerHTML = this.beautifyJSON(data);
    }, 
    (err : HttpErrorResponse) => {
    if(err.error instanceof Error){
      console.log("Client-side error occured");
    }
    console.log("server-side error occured");
    });
    
  }
  
  callREST(){
    console.log("API call sent");
    if(this.method === "POST"){
      this.postUserAPI();
    } else {
      this.getUsersAPI();
    }
    this.requestSent = true;
    //this.sendJSON.emit('complete');
  }

  updateEmail(value){
    this.email = value;
    this.updateJSONRequest();
  }

  updateName(value){
    this.name = value;
    this.updateJSONRequest();
  }

  updatePhone(value){
    this.phone = value;
    this.updateJSONRequest();
  }

  updateJSONRequest(){
    let JSONObj = {"email": this.email, "full-name": this.name, "phone": this.phone};
    this.JSONRequest  = this.beautifyJSON(JSONObj);
  }

  beautifyJSON(JSONString): string {
    // stringify with tabs inserted at each level
    return JSON.stringify(JSONString, null, "\t")
  }
}
