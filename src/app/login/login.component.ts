import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Subscription } from "rxjs";
import { ServerInfo } from './ServerInfo';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

   //userNameControl = new FormControl('');
   //passwordControl = new FormControl('');


  serverInfo: ServerInfo = {
    upSince: 0,
    upTime: 0,
    upTimeText: '',
    webVersion: '',
    baseUri: '',
    isIServerConfigured: false,
    iServerVersion: '',
    minMobileCompatibleVersion: '',
    deploymentType: '',
    mciType: ''
  };
  
  subscription!: Subscription ;

  constructor(private loginService: LoginService) { }

  getServerInfo(): void {
    console.log("in getStatus()");
    this.subscription = this.loginService.getStatus().subscribe({
      next: serverInfo => {
        this.serverInfo = serverInfo;
      }
    })
  }

  doLogin(loginForm: FormGroup): void {
    this.subscription = this.loginService.doLogin().subscribe({
      next: response => {
        console.log('Token: ', response.headers.get('X-MSTR-AuthToken'));
      }
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userNameControl: new FormControl(''),
      passwordControl: new FormControl('')
    });

  }

  ngOnDestroy(): void{
    //First check if the subscription exists so that we can unsubscribe.
    //Check the "?"
    this.subscription?.unsubscribe();
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

}
