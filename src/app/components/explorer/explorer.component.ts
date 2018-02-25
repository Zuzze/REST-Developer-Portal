import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


interface UserResponse {
  email: string;
  name: string;
  phone: string;
}

/* Validators for custom email validation
//in modern browsers HTML5 input type 'email' does the validation and shows error on hover
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control.invalid && (control.dirty || control.touched));
  }
}*/

@Component({
  selector: 'explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
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
  localDb: string = "";

  //Validators for custom email validation but
  /*emailFormControl = new FormControl('', [
    Validators.email,
  ]);*/
  //matcher = new MyErrorStateMatcher();


  constructor(private http: HttpClient) { 
    //used only for dependency injections in Angular 2+ (e.g services)
    //HTML attributes initialized in the beginning of the class and OnInit()    
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

  //===== GET DATA ======

  //OPTION 1: use local JSON file from public assets folder
  getLocalJSON() {
    return this.http.get<UserResponse>('/assets/users.json').subscribe(
      data => { 
        this.localDb = this.beautifyJSON(data);
        this.responsesHTML.nativeElement.innerHTML = this.beautifyJSON(data);
        console.log("Local database initialized: \n " + this.localDb);
      }, 
      (err : HttpErrorResponse) => {
        if(err.error instanceof Error){
          console.log("Client-side error occured");
        }
        console.log("server-side error occured");
      });
  }

  //OPTION 2: get sample users data using typicode 
  //working but user properties not same as in the assignment
  getUsersAPI(){
    this.http.get<UserResponse>('https://jsonplaceholder.typicode.com/users').subscribe(
      data => {
      //print single parameter: console.log(data[1].email); 
      //print all objects:
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
  
  //===== POST DATA ======

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
    
  //==== EVENT HANDLING ====

  callREST(){
    console.log("API call sent");
    if(this.method === "POST"){
      this.postUserAPI();
    } else {
      //GET all users
      //alternative methods: use either local json or typicode sample users
      this.getLocalJSON();
      //this.getUsersAPI(); 
    }
    this.requestSent = true;
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
