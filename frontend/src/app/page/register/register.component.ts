import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, Validators , FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiUrl = 'http://localhost:3000/api/authUser/register'; 

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleRegister() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...formData } = this.registerForm.value; // Exclude confirmPassword

      this.http.post(this.apiUrl, formData).subscribe({
        next: (res) => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Registration failed. Try again.');
          console.error(err);
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
