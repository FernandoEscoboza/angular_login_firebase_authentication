import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error'

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code: string){
    switch(code){
      case FirebaseCodeErrorEnum.EmailAlreadyInUse: return 'El usuario ya existe';
      case FirebaseCodeErrorEnum.WeakPassword: return 'La contraseña tiene menos de 6 caracteres';
      case FirebaseCodeErrorEnum.WrongPassword: return 'Contraseña incorrecta';
      case FirebaseCodeErrorEnum.UserNotFound: return 'El usuario no existe, favor de registrarse';
      case FirebaseCodeErrorEnum.InvalidEmail: return 'Correo invalido';

      default:
       return'Error desconocido';
    }
  }
}
