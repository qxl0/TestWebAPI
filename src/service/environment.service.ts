import { Injectable, OnInit } from '@angular/core';
import { IEnvironment } from './Environment';

@Injectable()
export class EnvironmentService implements OnInit
{
  ngOnInit() {

  }
  getEnvs() {
    return ENVS;
  }
  getAPIS() {
    return GETAPIS;
  }
  getPostAPIS() {
    return POSTAPIS;
  }
  getPutAPIS() {
    return PUTAPIS;
  }

}

const ENVS: IEnvironment[] = [
  {
    envName: 'MOB_QA_184',
    envServerUrl: 'https://MOBT184ES.rd.allscripts.com/HeliosConnect/84/MOB_QA_184/AmbulatoryWebAPI',
    user: 'esfrancis',
    password: 'eeeeee',
  },
  {
    envName: "MOB_QA_184_CU0",
    envServerUrl: "https://MOBT184ES0.rd.allscripts.com/HeliosConnect/84/MOB_QA_184_CU0/AmbulatoryWebAPI",
    user: "ramamd0",
    password: "aaaaaa",
  },
  {
    envName: "mob_QA_184_CU0_Debug",
    envServerUrl: "https://MOBT184ES0.rd.allscripts.com/HeliosConnect/84/MOB_QA_184_CU0/AmbulatoryWebAPIDebug",
    user: "mobipsi",
    password: "bbbbbb"
  },
  {
    envName: "mob_QA_184_debug",
    envServerUrl: "https://MOBT184ES.rd.allscripts.com/HeliosConnect/84/MOB_QA_184/AmbulatoryWebAPIDebug",
    user: "esfrancis",
    password: "eeeeee"
  },
  {
    envName: "MOB_DEV_184",
    envServerUrl: "https://mobd182es.rd.allscripts.com/HeliosConnect/84/MOB_DEV_184/AmbulatoryCdsWebApi",
    user: "nbetty",
    password: "aaaaaa",
  },
  {
    envName:"AMB_DEV_184",
    envServerUrl: "https://ambd184es.rd.allscripts.com/HeliosConnect/84/AMB_DEV_184/AmbulatoryWebAPI",
    user: "jafepcs",
    password: "aaaaaa"
  },
  {
    envName: "AMB_QA_184",
    envServerUrl: "https://ambt182es.rd.allscripts.com/HeliosConnect/84/AMB_QA_184/AmbulatoryWebAPI",
    user: "doclg",
    password: "aaaaaa"
  },
  {
    envName: "AMB_DEV_184_CU0",
    envServerUrl: "https://ambd184es0.rd.allscripts.com/HeliosConnect/84/AMB_DEV_184_CU0/AmbulatoryWebAPI",
    user: "epcsli502",
    password: "bbbbbb"
  },
  {
    envName: "AMB_QA_184_CU0",
    envServerUrl: "https://ambt184es0.rd.allscripts.com/HeliosConnect/84/AMB_QA_184_CU0/AmbulatoryWebAPI",
    user:"doclg",
    password: "aaaaaa"
  }
]

const GETAPIS: any[] = [
  "/api/drugcatalog/fullcatalog/details?genericNameId=786&isHx=false&genericNameIDs=null&drugNameID=0&OBOUserId=",
  "/api/drugcatalog/therapeuticalternatives?genericNameId=786&genericItemId=4474&isGeneric=True&NDC=30014030312&FormularyListNumber=FSL107&CopayNumber=COP107&AlternativeListNumber=&PBMParticipantNumber=T00000000001010&CoverageNumber=COV107",
  "/api/drugcatalog/payerspecifiedalternatives?genericNameId=786&genericItemId=4474&isGeneric=True&NDC=30014030312&FormularyListNumber=FSL107&CopayNumber=COP107&AlternativeListNumber=&PBMParticipantNumber=T00000000001010&CoverageNumber=COV107",
  "/api/patient/562400200/mha",
  "/api/prescription/2515/refillrequestsourcedata?clientGuid=174900200&clientVisitGuid=188100270",
  "/api/patient/562400200/Prescriptions?clientvisitGuid=328700270",
  "/api/prescription/2075/refillrequestsunrisedata",
  "/api/drugcatalog/favorites/404201190/favoritecategoriesanddetails",
  "/api/drugcatalog/therapeuticalternatives?genericNameId=49&genericItemId=445&isGeneric=False&NDC=50580050008&FormularyListNumber=&CopayNumber=&AlternativeListNumber=&PBMParticipantNumber=T00000000022648&CoverageNumber=",
  "/api/drugcatalog/therapeuticalternatives?genericNameId=788&genericItemId=4493&isGeneric=False&NDC=187514020&FormularyListNumber=&CopayNumber=&AlternativeListNumber=&PBMParticipantNumber=T00000000022648&CoverageNumber=",
  "/api/patient/2147512239/eligibilitystatusrequest",
  "/api/drugcatalog/payerspecifiedalternatives?genericNameId=49&genericItemId=445&isGeneric=False&NDC=50580050110&FormularyListNumber=&CopayNumber=&AlternativeListNumber=&PBMParticipantNumber=S00000000000001&CoverageNumber= ",
  "/api/drugcatalog/therapeuticalternatives?genericNameId=821&genericItemId=4683&isGeneric=True&NDC=93026215&FormularyListNumber=&CopayNumber=&AlternativeListNumber=&PBMParticipantNumber=S00000000000001&CoverageNumber= ",
  "/api/drugcatalog/therapeuticalternatives?genericNameId=820&genericItemId=4671&isGeneric=True&NDC=168005815&FormularyListNumber=&CopayNumber=&AlternativeListNumber=&PBMParticipantNumber=&CoverageNumber",
  "/api/patient/562400200/eligibilitystatus",
  "/api/drugcatalog/favorites/2122201190",
  "/api/drugcatalog/Favorites/474/details",
  "/api/drugcatalog/quicklist?drugName=mor",
  "/api/drugcatalog/quicklist/details?genericNameId=21",
  "/api/drugcatalog/fullcatalog?drugName=mor&isHx=true",
  "/api/drugcatalog/fullcatalog/details?genericNameId=2563",
  "/api/Provider/2200201190/prescriptionTasks?includeself=true&includedelegate=false&fromdate=2010-12-30",
  "/api/Provider/2200201190/prescriptionTasks?includeself=true&includedelegate=false&fromdate=2010-12-30",
  "/api/patient/961400200/preferredpharmacies",
  "/api/utility/pharmacies?PharmacyName=cvs",
  "/api/prescription/2147501077/Details",
  "/api/patient/142600200/HealthIssues?visitguid=154400270&chartguid=154700170"
]

const POSTAPIS: any[] = [
  {url: "/api/prescription/2147501205/submit", body: "SubmitJson.json"},
  {url: "/api/prescription/2147503283/renew", body:  "Renew.json"},
  {url: "/api/prescription/unsubmitted", body: "RequestJSON.json"},
  {url: "/api/patient/172400200/mharequest", body: "EligibilityRequest.json"},
  {url: "/api/patient/160900200/eligibilitystatusrequest", body: "EligibilityRequest.json"},
  {url: "/api/prescription/homemedication", body:  "HomeMed.json"},
  {url: "/api/patient/172400200/eligibilitystatusrequest", body: "EligibilityRequest.json"},
  {url: "/api/prescription/2147497839/reprint",body:  "ReprintJson.json"},
  {url: "/api/cds/alerts", body: "cdsrequest.json"},
  {url: "/api/prescription/2842/denyrefill", body: "Denyrefill.json"},
  {url: "/api/prescription/1462/denyunknown", body: "DenyUnknow.json"},
  {url: "/api/prescription/validatesave", body: "RequestJSON.json"},
  {url: "/api/prescription/validate", body: "RequestJSON.json"},
  {url: "/api/enrollment/service/stop", body: "RequestJSON.json"},
  {url: "/api/patient/686600200/eligibilitystatusrequest",body: "Elegibility.json"},
  {url: "/api/patient/960100200/matchpatient",body: "RequestMatch.json"},
  {url: "/api/prescription/batchsubmit",body:  "BatchSubmit.json"},
  {url: "/api/prescription/2147512271/renew", body: "Renew.json"},
  {url: "/api/prescription/2147512271/renew", body: "RenewWAlerts.json"},
  {url: "/api/prescription/2147503491/refillrequest/approve", body: "approverefill.json"},
  {url: "/api/prescription/2147503701/refillrequest/approve", body: "approverefillMOB.json"}
]

const PUTAPIS: any[] = [
  {url: "api/prescription/4601", body: "RequestJSON.json"}
]
