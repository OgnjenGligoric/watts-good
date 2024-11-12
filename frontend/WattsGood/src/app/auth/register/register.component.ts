import { Component } from '@angular/core';
import {CityService} from "../../service/city.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MapComponent} from "../../map/map.component";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MapComponent,
    MatSelectModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private cityService: CityService) {
  }
  uploadedPictures: File[] = [];

  loginForm = new FormGroup({
    email: new FormControl('', ),
    password: new FormControl('', ),
    name: new FormControl(''),
    image: new FormControl(''),
  });

  ngOnInit(){
  }


  choosenImageChanged($event: Event) {
    const files: FileList | null = ($event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedPictures.push(files[i]);
        console.log(files[i]);
      }
    }
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
