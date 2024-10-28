import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { resolve } from "path";

export class CustomValidators{
  static noSpaceAllowed(control: FormControl): ValidationErrors | null {
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed: true}
    }
    return null;
  }

  static checkUserName(control: AbstractControl): Promise<any>{
    return userNameAllowed(control.value)
  }
}



function userNameAllowed(username: string){
  const takenUserNames = ['huzaifa','umar', 'taimoor', 'mahnoor'];

  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if(takenUserNames.includes(username)){
              resolve({checkUsername: true});
          }
          else{
              resolve(null);
          }
      }, 5000);
  });
}
