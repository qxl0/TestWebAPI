import { Component, OnInit, EventEmitter, isDevMode, Inject } from '@angular/core';
import { EnvironmentService } from 'src/service/environment.service';
import { IEnvironment } from 'src/service/Environment';
import { ApiService } from 'src/service/api.service';
import { Toastr, TOASTR_TOKEN } from 'src/service/toastr.service';

let toastr:Toastr = window['toastr'];

@Component({
  selector: 'app-scm-env',
  templateUrl: './scm-env.component.html',
  styleUrls: ['./scm-env.component.css']
})
export class ScmEnvComponent implements OnInit {
  
  envs: IEnvironment[];
  currentEnv: IEnvironment;
  getCallList: any[];
  postCallList: any[];
  putCallList: any[];

  selectedGetApi: string;
  selectedPostApi: any;
  selectedPutApi: any;
  selectedApi: string;

  selectedEnv: string;
  selectedServerUrl: string;
  selectedUser: string;
  selectedPassword: string;
  response: string;
  responseInObj: any;
  token: object;
  displayFormat: string;
  callType: string;
  selectedBody: string;

  constructor(private envService: EnvironmentService,
              private apiService: ApiService){
  }

  ngOnInit() {
    this.callType = "get";
    this.envs = this.envService.getEnvs();
    this.currentEnv = this.envs[5];
    this.getCallList = this.envService.getAPIS();
    this.setSelected();
    this.postCallList  = this.envService.getPostAPIS();
    this.putCallList = this.envService.getPutAPIS();
    this.displayFormat = '1';
  }

  callTypeChange(event) {
    this.clearSelectedApi();
    if (event.value != 'get'){      
      
    }
    // clean up Api textblock
    if (event.value == 'post'){
      this.selectedPostApi = this.postCallList[17];
      this.selectedApi = this.selectedPostApi.url;
      this.loadBody(this.selectedPostApi);
    }
    else if (event.value == 'put'){
      this.selectedApi = this.selectedPutApi;
      this.loadBody(this.selectedPutApi);
    }
  }
  clearSelectedApi() {
    this.selectedApi = "";
  }
  loadBody(papi:any) {
    if (papi === undefined){
      return;
    }
    this.readThis(papi);

  }
  readThis(inputValue: any) : void {
    let fileName = inputValue.body;

    this.apiService.readFile(fileName).subscribe(
      data => {
        this.selectedBody = JSON.stringify( data, null, 2);
      });
  }
  //
  selectItem(value) {
    this.currentEnv = this.envs.find( e => {
      return e.envName.toLocaleLowerCase() === value.toLocaleLowerCase();
    })
    this.setSelected();
    console.log(this.currentEnv.envName);
  }

  selectGetApi(value) {
    this.selectedGetApi = this.getCallList.find( e => {
      return e === value;
    })
    this.selectedApi = this.selectedGetApi;
  }
  selectPostApi(value) {
    
    if (this.selectedPostApi == null)
    {
      return;
    }
    
    this.selectedApi = this.selectedPostApi.url;    
    this.loadBody(this.selectPostApi);    
    console.log(this.selectedApi);
  }
  selectPutApi(value) {
    if (this.selectedPutApi == null) {
      return;
    }
    this.selectedApi = this.selectedPutApi.url;
    this.loadBody(this.selectedPutApi);
    console.log(this.selectedApi);
  }

  setSelected() {
    this.selectedUser = this.currentEnv.user;
    this.selectedEnv = this.currentEnv.envName;
    this.selectedPassword = this.currentEnv.password;
    this.selectedServerUrl = this.currentEnv.envServerUrl;
    this.selectedGetApi = this.getCallList[17];
    
    this.selectedApi = this.selectedGetApi;
  }
  async callGet() {
    let api="";
    if (isDevMode()) {
      api = "/xxx";
    }
    api += this.removeServer(this.selectedServerUrl) + this.selectedApi;

    let response: any
    try {   
      if (this.callType == "get") {
        response = await this.apiService.callGet(this.selectedEnv, this.selectedUser, this.selectedPassword, api);
      }
      else if (this.callType == "post"){
        response = await this.apiService.callPost(this.selectedEnv, this.selectedUser, this.selectedPassword, api, this.selectedBody);
      }
      toastr.success(api + " was sent successfully!!")
    }
    catch(err)
    {
      this.response = JSON.stringify(err, null, 2);
      toastr.error(api + ": received error!!")
      return;
    }

    this.response = JSON.stringify( response, null, 2);

    this.responseInObj = response;

  }

  removeServer(serverUrl: string): string{
    var start = serverUrl.search("/HeliosConnect");

    var tmp = serverUrl.substring(start);
    return tmp;
  } 
}
