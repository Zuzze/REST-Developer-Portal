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
  @Input()  body: object[];
  email: string;

  @Output() sizeChange = new EventEmitter<number>();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() { 
    //used only for dependency injections in Angular 2+ (e.g services)
    //HTML attributes initialized in the beginning of the class
  }

  ngOnInit() {

  }

  callREST(){
    console.log("call sent");
  }

}
