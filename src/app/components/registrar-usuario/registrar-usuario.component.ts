import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from '../../services/firebase-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean= false;

  constructor( 
    private fb: FormBuilder,
    private afireauth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private servfirebaseError: FirebaseErrorService
    ) { 
    this.registrarUsuario = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      repetirpassword:['', Validators.required],
    });
  }


  ngOnInit(): void {
  }

  
  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirpassword = this.registrarUsuario.value.repetirpassword;

    console.log(email, password, repetirpassword);

    if(password != repetirpassword){
      this.toastr.error('La contraseña debe ser la misma', 'Error');
    } else{
      this.loading = true;

      this.afireauth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.verificaremail();
      }).catch((error)=>{
        this.loading = false;
        // console.log(error);
        // alert(this.firebaseError(error.code));
        this.toastr.error(this.servfirebaseError.codeError(error.code),'Error');
      });
    }

  }

  verificaremail(){
    this.afireauth.currentUser
    .then((user) => user?.sendEmailVerification())
    .then(() =>{
      this.loading = false;
        // this.toastr.success('El Usuario fue registrado con exito!','Usuario registrado');
        this.toastr.info('Le enviamos un correo electronico para su verificacion ','Verificar correo');
        this.router.navigate(['/login']);
    });
  }

}
