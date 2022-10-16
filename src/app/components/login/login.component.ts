import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from '../../services/firebase-error.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afireauth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private servfirebaseError: FirebaseErrorService
  ) { 
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  ngOnInit(): void {
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;

    this.afireauth.signInWithEmailAndPassword(email, password)
    .then((user) =>{
      if(user.user?.emailVerified){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/verificar_correo'])
      }
    }).catch((error) => {
      
      this.toastr.error(this.servfirebaseError.codeError(error.code),'Error');
      this.loading = false;
    });
  }




  // auth/wrong-password
}
