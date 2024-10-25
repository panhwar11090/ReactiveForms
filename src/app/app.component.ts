import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule , ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';

  reactiveForm!: FormGroup;

  // when app is load so we are going to initialize this logic
  ngOnInit(): void {
      this.reactiveForm= new FormGroup({
        //validation is required
        firstname: new FormControl(null,Validators.required),
        lastname: new FormControl(null,Validators.required),
        // here iam adding validation specific for email
        email: new FormControl(null, [Validators.required,Validators.email]),
        username: new FormControl(null),
        dob: new FormControl(null),
        gender: new FormControl('male'),
        // Form Group
        address : new FormGroup({
          street: new FormControl(null, Validators.required),
          country: new FormControl('India', Validators.required),
          city: new FormControl(null),
          region: new FormControl(null),
          postal: new FormControl(null, Validators.required),
        }),
        skills: new FormArray([
          new FormControl(null, Validators.required),

        ])
    });
  }

  get skills(): FormArray {
    return this.reactiveForm.get('skills') as FormArray;
  }

  OnFormSubmited(){
    console.log(this.reactiveForm)
  }

  AddSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required))
  }

  DeleteSkills(index: number){
    const controls =<FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index)
  }

}
