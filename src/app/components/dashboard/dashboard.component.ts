import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datauser: any;

  constructor(
    private afireauth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.afireauth.currentUser.then((user) =>{
      if(user && user.emailVerified){
        this.datauser = user;
      } else{
        this.router.navigate(['/login']) 
      }
    });
  }

  logOut(){
    this.afireauth.signOut().then(() => this.router.navigate(['/login']) );
  }

}
