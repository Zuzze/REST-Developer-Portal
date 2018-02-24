import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface UserResponse {
  login: string,
  bio: string
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  //Generic component that 
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
  @ViewChild('responses') //refers to DOM element #responses
  private responsesHTML: ElementRef;

  @Input()  title: string;
  @Input()  url: string;
  @Input()  method: string;
  @Input()  headers: object;
  @Input()  contentType: string;
  @Input()  body?: object[];
  name: string = "";
  email: string = "";
  phone: string = "";
  requestJSON: string;
  responses: string = ""

  @Output() sizeChange = new EventEmitter<number>();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();


  @Output()
  sendJSON = new EventEmitter<string>();

 

  constructor(private http: HttpClient) { 
    //used only for dependency injections in Angular 2+ (e.g services)
    //HTML attributes initialized in the beginning of the class
  }

  ngOnInit() {
    console.log(this.headers);

    /*    {
      title: ${this.title},
      url: '${this.url}',
      method: '${this.method},
      headers: {
        Authorization: '${this.headers["Authorization"]}',
        'Content-Type': '${this.contentType}'
      },
      body: [*/
    this.requestJSON = '{"email": "' + this.email + '", "full-name": "' + this.name + '", "phone": "' + this.phone + '"}';
  }

  ngOnChange() {
    this.requestJSON = '{"email": "' + this.email + '", "full-name": "' + this.name + '", "phone": "' + this.phone + '"}';
  }
  
  //POST new user data
  postUserAPI(){
  const req = this.http.post(
    'https://jsonplaceholder.typicode.com/users/', 
    JSON.parse(this.requestJSON))
    .subscribe(
      res => {
        console.log(res);
        this.responsesHTML.nativeElement.innerHTML = JSON.stringify(res, null, "\t"); // stringify with tabs inserted at each level
      },
      err => {
        console.log("Error occured");
      });
}

//GET users data
getUsersAPI(){
  this.http.get<UserResponse>('https://jsonplaceholder.typicode.com/users').subscribe(
    data => {
    console.log(data);
    this.responsesHTML.nativeElement.innerHTML = JSON.stringify(data, null, "\t"); // stringify with tabs inserted at each level
  }, 
  (err : HttpErrorResponse) => {
  if(err.error instanceof Error){
    console.log("Client-side error occured");
  }
  console.log("server-side error occured");
  });
  
}
  
  callREST(){
    if(this.method === "POST"){
      this.postUserAPI();
    } else {
      this.getUsersAPI();
    }
    console.log("call sent");
    //this.sendJSON.emit('complete');
  }

}
