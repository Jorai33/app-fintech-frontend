import {FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class PasswordMatchErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
  
      const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.hasError('notSame') && ( control.dirty || control.touched || isSubmitted ));
  
      return (invalidParent);
    
    }
  }
  