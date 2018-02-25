import { Component, OnInit, Input, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


interface UserResponse {
  email: string;
  name: string;
  phone: string;
}

//in modern browsers HTML5 input type 'email' does the validation and shows error on hover
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})

export class ExplorerComponent implements OnInit {
  //DOM references
  @ViewChild('responses') //refers to #responses
  private responsesHTML: ElementRef;
  @ViewChildren('parameterInput') inputs;

  //parent input, comes from app.component.html
  @Input()  title: string;
  @Input()  url: string;
  @Input()  method: string;
  @Input()  headers: object;
  //@Input()  contentType?: string = "application/json";
  @Input()  body?: object[];


  //response codes with messages
  OK = "200 OK - Successful operation";
  CLIENT_ERROR = "400 Bad Request - Client side error occured, see details by hovering invalid inputs";
  SERVER_ERROR = "500 Internal server error - server side error occured"

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
  responseCode: string = this.OK;
  panelOpenState: boolean;


  //Validators for custom email validation but
  emailFormControl = new FormControl('', [
    Validators.email, Validators.minLength(3), Validators.maxLength(24)
  ]);
  //matcher = new MyErrorStateMatcher();


  constructor(private http: HttpClient) { 
    //used only for dependency injections in Angular 2+ (e.g services)
    //HTML attributes initialized in the beginning of the class and OnInit()    
  }

  ngOnInit() {
    this.updateJSONRequest();
    //this.headerArr = Object.entries(this.headers);
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
          console.log(this.CLIENT_ERROR);
        }
        console.log(this.SERVER_ERROR);
      });
  }

  //OPTION 2: get sample users data using typicode 
  //working but user properties not same as in the assignment
  getUsersAPI(){
    this.responseCode = this.OK;
    this.http.get<UserResponse>('https://jsonplaceholder.typicode.com/users').subscribe(
      data => {
      //print single parameter: console.log(data[1].email); 
      //print all objects:
      console.log(data);
      this.responseCode = this.OK;
      this.responsesHTML.nativeElement.innerHTML = this.beautifyJSON(data);
    }, 
    (err : HttpErrorResponse) => {
      if(err.error instanceof Error){
        console.log(this.CLIENT_ERROR)
        this.responseCode = this.CLIENT_ERROR
      }
        this.responseCode = this.SERVER_ERROR
        console.log(this.SERVER_ERROR);
    });
    
  }
  
  //===== POST DATA ======

  postUserAPI(){
  this.checkInputValidity();//generates response code for fake API
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
      //this.getLocalJSON();
      this.getUsersAPI();
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

  checkInputValidity(){
    //each parameter input is marked with '#parameterinput' in HTML
    this.responseCode = this.OK; 
    //console.log(this.inputs._results);
    for(let input of this.inputs._results){
      if(input.nativeElement.classList.contains('ng-invalid')){
          console.log(input.nativeElement.name + " is invalid");
          this.responseCode = this.CLIENT_ERROR;
          break;
      }
    }
  }
}
