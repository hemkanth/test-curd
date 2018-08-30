import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { CurdService } from './service/curd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Form: FormGroup;
  items: any[] = [];

  constructor(private service: CurdService) {
    this.service.List().subscribe(response => {
      const Result = JSON.parse(response['_body']);
      if (response['status'] === 200) {
        this.items = Result['Response'];
      }
    });
  }

  ngOnInIt() {
    this.Form = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('')
    });
  }

  submit() {
    this.service.create(this.Form.value).subscribe(response => {
      const Result = JSON.parse(response['body']);
      if (response['status'] === 200) {
        this.items.splice(0, 0, Result['Response']);
      }
    });
  }
  delete(_index) {
    this.service.delete(this.items[_index]['_id']).subscribe(response => {
       const Result = JSON.parse(response['_body']);
       if (response['status'] === 200 && Result['Status']) {
          this.items.splice(_index, 1);
       }
    });
 }

  edit(_index) {
      const obj = this.items[_index];
      this.Form.controls['name'].setValue(obj['name']);
      this.Form.controls['email'].setValue(obj['email']);
      this.Form.controls['phone'].setValue(obj['phone']);
      this.Form.removeControl('User_Id');
      this.Form.addControl('User_Id', new FormControl(obj['_id'], Validators.required));
  }
}
