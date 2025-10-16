import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signuppageForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.signuppageForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  // Custom Validator to check if password and confirm password match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Submit handler for the form
  showSuccessAlert() {
    Swal.fire({
      title: 'Signing Up...',
      text: 'Please wait...',
      allowOutsideClick: false,
      backdrop: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate successful registration
    setTimeout(() => {
      Swal.fire({
        title: 'Successfully Registered!',
        text: 'Your account has been created.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 5000, 
        timerProgressBar: true,
        
        willClose: () => {
          this.router.navigate(['/login']);
        },
        backdrop: false, 
      });
    }, 1500); 
  }
}
