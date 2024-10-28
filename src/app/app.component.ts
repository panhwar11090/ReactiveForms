import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CustomValidators } from './Validators/noSpaceAllowed.validator'; // Import your custom validator here


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule , ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';
  formStatus : string = '';
  username: string = '';
  formdata: any = {};

  reactiveForm!: FormGroup;

  @ViewChild('registerationForm') form: NgForm | undefined;

  // when app is load so we are going to initialize this logic
  ngOnInit(): void {
      this.reactiveForm= new FormGroup({
        //validation is required
        firstname: new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
        lastname: new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
        // here iam adding validation specific for email
        email: new FormControl(null, [Validators.required,Validators.email]),
        username: new FormControl(null,Validators.required, CustomValidators.checkUserName),
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

        ]),
        experience: new FormArray([

        ])

    });

    // this.reactiveForm.get('firstname')?.valueChanges.subscribe((val)=>{
    //   console.log(val)
    // })

    // this.reactiveForm.valueChanges.subscribe((data)=>{
    //   console.log(data)
    // })

    // this.reactiveForm.get('username')?.statusChanges.subscribe((status)=>{
    //   console.log(status);
    // })
    this.reactiveForm.statusChanges.subscribe((status)=>{
      console.log(status)
      this.formStatus= status;
    })
  }

  get firstname (): FormControl {
    return this.reactiveForm.get('firstname') as FormControl;
  }

  get lastname () : FormControl {
    return this.reactiveForm.get('lastname') as FormControl;
  }

  get dateOfBirth () : FormControl {
    return this.reactiveForm.get('dob') as FormControl;
  }

  get skills(): FormArray {
    return this.reactiveForm.get('skills') as FormArray;
  }

  get experience(): FormArray{
    return this.reactiveForm.get('experience') as FormArray;
  }

  OnFormSubmited(){
    console.log(this.reactiveForm)
    this.formdata = this.reactiveForm.value;
    localStorage.setItem('formData', JSON.stringify(this.formdata));
  }

  AddSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required))
  }

  DeleteSkills(index: number){
    const controls =<FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index)
  }

  AddExperience(){
    const frmGroup =new FormGroup({

      comapny : new FormControl(null),
      position : new FormControl(null),
      totalExp : new FormControl(null),
      start : new FormControl(null),
      end : new FormControl(null),

    })
    this.experience.push(frmGroup)
  }

  DeleteExperience(index: number){
    const frmArr =  this. experience;
    frmArr.removeAt(index)
  }

  GenerateUsername() {
    let generatedUsername = '';

    const firstNameValue : string = this.firstname.value; // Get the value of firstname
    const lastnameValue: string = this.lastname.value

    if (typeof firstNameValue === 'string' && firstNameValue.length >= 3) {
        generatedUsername += firstNameValue.slice(0, 3); // Use slice on the string value
    } else {
        generatedUsername += firstNameValue ; // Use the entire value or an empty string if null
    }

    if( typeof lastnameValue === 'string' && lastnameValue.length >=3){
        generatedUsername += lastnameValue.slice(0,3);
    }else{
      generatedUsername += lastnameValue;
    }

    const dateOfBirthValue : string = this.dateOfBirth.value;
    const dateOfBirths = new Date(dateOfBirthValue);
    generatedUsername += dateOfBirths.getFullYear();
    // this.username = generatedUsername;
    // this.reactiveForm.get('username')?.setValue(this.username);
    // this.reactiveForm.get('username')?.setValue(generatedUsername);
    this.reactiveForm.patchValue({
      username: generatedUsername
    })



    // Optionally append some part of lastname or other logic
    // console.log('Generated Username:', generatedUsername);
}

}
