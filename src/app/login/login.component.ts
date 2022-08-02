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
  private _userName: string = '';

  public get userName(): string {
    return this._userName;
  }

  public set userName(value: string) {
    this._userName = value;
    console.log('In setter:', value);
  }
  


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
    this.subscription = this.loginService.doLogin().subscribe({
      next: response => {
        console.log('Token: ', response.headers.get('X-MSTR-AuthToken'));
      }
    })
  }

  ngOnInit(): void {
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
