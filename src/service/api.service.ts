import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Injectable, isDevMode } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable()
export class ApiService {
  userid: string = "";
  password: string = "";
  environement: string = "";
  token: string;
  result: string;
  pasedToken: string;
  //baseSecurityUrl: string="http://ambd184es/HeliosSecurityService/Identity.svc";
  baseSecurityUrl: string="/securityCheck/HeliosSecurityService/Identity.svc";
  baseSecurityUrlProductionMode: string="/HeliosSecurityService/Identity.svc";
  securityBody: string = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:s="http://myNamespace/">
    <soapenv:Header/>
    <soapenv:Body>
        <GetIdentityToken xmlns="http://tempuri.org/">
        <userName>${this.userid}</userName>
        <password>${this.password}</password>
        <environmentName>${this.environement}</environmentName>
      </GetIdentityToken>
    </soapenv:Body>
  </soapenv:Envelope>
  `;


  httpHeaders =  new HttpHeaders({

  })

  securityCallHeaders = new HttpHeaders({
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'http://tempuri.org/IIdentity/GetIdentityToken'
  });
  templateVars = {
    userid: "",
    password: "",
    environment: ""
  };


  constructor(private http: HttpClient) {

  }
  private _callResponse : Observable<string>;

  readFile(fileName: string)  {
    return this.http.get('../testData/'+fileName);
  }
  async callGet(env: string, user: string, password: string, api: string): Promise<any> {
    this.userid = user;
    this.password = password;
    this.environement = env;

    this.token = await this.getIdentityToken(this.environement, this.userid, this.password)
    console.log(this.token);
    
    this.pasedToken = this.paarsetokenzip(this.token);
    console.log(this.pasedToken);

    //this.httpHeaders.append('Bearer', pasedToken);
    const myheaders = new HttpHeaders({
      'Bearer': this.pasedToken
    });
    //myheaders.set('Bearer', pasedToken);
    var response = await this.http.get<any>(api,
      {headers: myheaders}
      )
      .toPromise();


    return  response;
  }

  async callPost(env:string, user:string, password:string, api: string, bdy: string): Promise<any> {
    this.userid = user;
    this.password = password;
    this.environement = env;

    this.token = await this.getIdentityToken(this.environement, this.userid, this.password)
    console.log(this.token);
    
    this.pasedToken = this.paarsetokenzip(this.token);
    console.log(this.pasedToken);

    //this.httpHeaders.append('Bearer', pasedToken);
    const myheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Bearer': this.pasedToken
    });
    //myheaders.set('Bearer', pasedToken);
    var response = await this.http.post<any>(api, bdy,
      {headers: myheaders}
      )
      .toPromise();

    return  response;
  } 

  // parsetoken(res: string): string {
  //  var tmp = res.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  //  var start = tmp.search("<a:Token>") + 9;
  //  var end = tmp.search("</a:Token>");
  //  var token = tmp.substring(start, end);

  //  return token;
  // }

  paarsetokenzip(res: string): string {
    var start = res.search("<GetIdentityTokenZipResult>") +  27;
    var end = res.search("</GetIdentityTokenZipResult>");
    var token = res.substring(start, end);
    return token;
  }
  async getIdentityToken(env: string, userid: string, password: string): Promise<string> {
    this.userid = userid;
    this.password = password;
    this.environement = env;
    let postBody  = generateSecuirtyCallBody(env, userid,password);
    let postHeaders = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/IIdentity/GetIdentityTokenZip'
    })

    let url = this.baseSecurityUrlProductionMode;
    if (isDevMode()){
      url = this.baseSecurityUrl;
    }

    const response = await this.http.post(url, postBody,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml; charset=utf-8')
          .append('SOAPAction', 'http://tempuri.org/IIdentity/GetIdentityTokenZip')
          .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
    , responseType:'text'}
    ).toPromise();


    return response.toString();



  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = ``;
    if (err.error instanceof ErrorEvent){
      errorMessage =`An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

 }

 function generateSecuirtyCallBody(environement: string, userid: string, password: string){
   return `
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:s="http://myNamespace/">
   <soapenv:Header/>
   <soapenv:Body>
       <GetIdentityTokenZip xmlns="http://tempuri.org/">
       <userName>${userid}</userName>
       <password>${password}</password>
       <environmentName>${environement}</environmentName>
     </GetIdentityTokenZip>
   </soapenv:Body>
 </soapenv:Envelope>
   `;
 }
