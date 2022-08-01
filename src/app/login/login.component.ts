import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Subscription } from "rxjs";
import { ServerInfo } from './ServerInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  doLogin(): void {
    console.log("in doLogin()");
    this.subscription = this.loginService.doLogin().subscribe({
      next: response => {
        console.log('Token: ', response.headers.get('X-MSTR-AuthToken'));
      }
     
    })

  }


  //method to get status is called in the ngOnInit()
  ngOnInit(): void {
    // this.subscription = this.loginService.getStatus().subscribe({
    //   next: serverInfo => {
    //     this.serverInfo = serverInfo;
    //   }
    // })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
