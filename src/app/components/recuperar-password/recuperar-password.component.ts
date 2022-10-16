import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from '../../services/firebase-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarPassword: FormGroup;
  loading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private afireauth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private servfirebaseError: FirebaseErrorService
  ) { 
    this.recuperarPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  recuperar(){
    const email = this.recuperarPassword.value.email;

    this.loading = true;

    this.afireauth.sendPasswordResetEmail(email)
    .then(() => {
      this.toastr.info('Le enviamos un correo para restablecer su contraseña', 'Recuperar contraseña');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.toastr.error(this.servfirebaseError.codeError(error.code),'Error');
      this.loading = false;
    });
  }

}
