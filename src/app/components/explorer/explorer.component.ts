import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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
  @Input()  title: string;
  @Input()  url: string;
  @Input()  method: string;
  @Input()  headers: object;
  @Input()  contentType: string;
  @Input()  body?: object[];
  requestJSON: string;
  name: string = "John";
  email: string = "john@gmail.com";
  phone: string = "050-5554";

  @Output() sizeChange = new EventEmitter<number>();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();


  @Output()
  sendJSON = new EventEmitter<string>();

 

  constructor() { 
    //used only for dependency injections in Angular 2+ (e.g services)
    //HTML attributes initialized in the beginning of the class
  }

  ngOnInit() {
    console.log(this.headers["Authorization"]);

    /*    {
      title: ${this.title},
      url: '${this.url}',
      method: '${this.method},
      headers: {
        Authorization: '${this.headers["Authorization"]}',
        'Content-Type': '${this.contentType}'
      },
      body: [*/
    this.requestJSON = `
    {
      "full-name": "${this.name}",
      "email": "${this.email}",
      "phone": "${this.phone}"
    }`
  }

  postData(){
    
  }
    
  getData(){
    
  }
  

  callREST(){
    console.log("call sent");
    this.sendJSON.emit('complete');
  }

}
