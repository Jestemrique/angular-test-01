import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ServerInfo } from "./ServerInfo";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    //private mstrUrl = 'http://10.23.3.162:8080/MicroStrategyLibrary/api/status';
    private mstrUrl = 'http://10.23.3.162:8080/MicroStrategyLibrary/api/auth/login';

    private userInfo = {
        "username": "administrator",
        "password": "",
        "loginMode": 1,
        "maxSearch": 3,
        "workingSet": 10,
        "changePassword": false,
        "newPassword": "string",
        "metadataLocale": "en_us",
        "warehouseDataLocale": "en_us",
        "displayLocale": "en_us",
        "messagesLocale": "en_us",
        "numberLocale": "en_us",
        "timeZone": "UTC",
        "applicationType": 35
      }
      private httpOptions: any = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        observe: 'response',
        //responseType: 'text' as 'text'
        responseType: 'text'
      };

    constructor(private http: HttpClient) {}

    getStatus(): Observable<ServerInfo>{
        return this.http.get<ServerInfo>(this.mstrUrl).pipe(
            tap( 
                response => { console.log('All', JSON.stringify(response))}
            ),
            catchError(this.handleError)
        );
    }

    doLogin(): Observable<any>{
        const headers = {'content-type':'application/json', 'accept': 'application/json'};
        const body = JSON.stringify(this.userInfo);

        return this.http.post<any>(this.mstrUrl, body,this.httpOptions)
            .pipe(
                tap( data => console.log('All', 'doLogin method called!')),
                catchError(this.handleError)
            );
    }




    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if ( err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }

}