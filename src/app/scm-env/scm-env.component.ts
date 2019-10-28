import { Component, OnInit, EventEmitter } from '@angular/core';
import { EnvironmentService } from 'src/service/environment.service';
import { IEnvironment } from 'src/service/Environment';
import { ApiService } from 'src/service/api.service';


@Component({
  selector: 'app-scm-env',
  templateUrl: './scm-env.component.html',
  styleUrls: ['./scm-env.component.css']
})
export class ScmEnvComponent implements OnInit {
  envs: IEnvironment[];

  currentEnv: IEnvironment;
  getCallList: string[];
  postCallList: any[];
  putCallList: any[];

  selectedGetApi: string;
  selectedPostApi: string;
  selectedPutApi: string;

  selectedEnv: string;
  selectedServerUrl: string;
  selectedUser: string;
  selectedPassword: string;
  response: string;
  responseInObj: any;
  token: object;
  displayFormat: string;


  constructor(private envService: EnvironmentService,private apiService: ApiService) { }

  ngOnInit() {
    this.envs = this.envService.getEnvs();
    this.currentEnv = this.envs[5];
    this.getCallList = this.envService.getAPIS();
    this.setSelected();
    this.postCallList  = this.envService.getPostAPIS();
    this.putCallList = this.envService.getPutAPIS();
    this.displayFormat = '1';
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
  }
  selectPostApi(value) {
    this.selectedPostApi = this.postCallList.find( e => {
      return e === value;
    })
  }
  setSelected() {
    this.selectedUser = this.currentEnv.user;
    this.selectedEnv = this.currentEnv.envName;
    this.selectedPassword = this.currentEnv.password;
    this.selectedServerUrl = this.currentEnv.envServerUrl;
    this.selectedGetApi = this.getCallList[17];
  }
  async callGet() {
    var api = "/xxx" + this.removeServer(this.selectedServerUrl) + this.selectedGetApi;

   // console.log("prepare to call: "+api);

    var response = await this.apiService.callGet(this.selectedEnv, this.selectedUser, this.selectedPassword, api)
    this.response = JSON.stringify( response, null, 2);
    this.responseInObj = response;
  }

  removeServer(serverUrl: string): string{
    var start = serverUrl.search("/HeliosConnect");

    var tmp = serverUrl.substring(start);
    return tmp;
  }
  AuthenticateUser(env: string, userid: string, password: string) {


  }
}
