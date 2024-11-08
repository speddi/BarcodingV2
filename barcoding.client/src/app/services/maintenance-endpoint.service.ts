import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
/*import 'rxjs/add/operator/map';*/

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class MaintenanceEndpoint extends EndpointBase {

    private readonly _statusesUrl: string = "/api/status";
    private readonly _racesUrl: string = "/api/race";
    private readonly _raceSubCategoriesUrl: string = "/api/racesubcategory";
    private readonly _gendersUrl: string = "/api/gender";
    private readonly _ethnicityUrl: string = "/api/ethnicity";
    private readonly _ethnicitySubCategoriesUrl: string = "/api/ethnicitysubcategory";
    private readonly _hospitalUrl: string = "/api/hospital";
    private readonly _ageModifiersUrl: string = "/api/agemodifier";
    private readonly _amountSizeTypesUrl: string = "/api/amountsizetype";
    private readonly _procedureTypesUrl: string = "/api/proceduretype";
    private readonly _legacyProcedureTypesUrl: string = "/api/legacyproceduretype";
    private readonly _tissueAreasUrl: string = "/api/tissuearea";
    private readonly _shipmentStatusesUrl: string = "/api/shipmentstatus";
    private readonly _preparationsUrl: string = "/api/preparation";
    private readonly _preparationDetailsUrl: string = "/api/preparationdetail";
    private readonly _investigatorsUrl: string = "/api/investigator";
    private readonly _legacyInvestigatorsUrl: string = "/api/legacyinvestigator";
    private readonly _investigatorRequestsUrl: string = "/api/investigatorrequest";
    private readonly _metastaticSiteUrl: string = "/api/metastaticsite";
    private readonly _anatomicSiteUrl: string = "/api/anatomicsite";
    private readonly _tissueTypeUrl: string = "/api/tissuetype";
    private readonly _diagnosisUrl: string = "/api/diagnosis";
    private readonly _diagnosisSubClassUrl: string = "/api/diagnosissubclass";
    private readonly _diagnosisModifierUrl: string = "/api/diagnosismodifier";
    private readonly _sampleSequencePartOneUrl: string = "/api/samplesequencepartone";
    private readonly _sampleSequencePartTwoUrl: string = "/api/samplesequenceparttwo";
    private readonly _protocolUrl: string = "/api/protocol";
    private readonly _freezerUrl: string = "/api/freezer";
    private readonly _rackUrl: string = "/api/rack";
    private readonly _levelUrl: string = "/api/level";
    private readonly _specimenContainerUrl: string = "/api/specimencontainer";
    private readonly _consVersionUrl: string = "/api/consversion";
    private readonly _consDenyReasonUrl: string = "/api/consdenyreason";
    private readonly _saveDiagnosisUrl: string = "/api/savediagnosis";

    get statusesUrl() { return this.configurations.baseUrl + this._statusesUrl; }
    get racesUrl() { return this.configurations.baseUrl + this._racesUrl; }
    get raceSubCategoriesUrl() { return this.configurations.baseUrl + this._raceSubCategoriesUrl; }
    get gendersUrl() { return this.configurations.baseUrl + this._gendersUrl; }
    get ethnicitiesUrl() { return this.configurations.baseUrl + this._ethnicityUrl; }
    get ethnicitySubCategoriesUrl() { return this.configurations.baseUrl + this._ethnicitySubCategoriesUrl; }
    get hospitalsUrl() { return this.configurations.baseUrl + this._hospitalUrl; }
    get ageModifiersUrl() { return this.configurations.baseUrl + this._ageModifiersUrl; }
    get amountSizeTypesUrl() { return this.configurations.baseUrl + this._amountSizeTypesUrl; }
    get procedureTypesUrl() { return this.configurations.baseUrl + this._procedureTypesUrl; }
    get legacyprocedureTypesUrl() { return this.configurations.baseUrl + this._legacyProcedureTypesUrl; }
    get tissueAreasUrl() { return this.configurations.baseUrl + this._tissueAreasUrl; }
    get shipmentStatusesUrl() { return this.configurations.baseUrl + this._shipmentStatusesUrl; }
    get preparationsUrl() { return this.configurations.baseUrl + this._preparationsUrl; }
    get preparationDetailsUrl() { return this.configurations.baseUrl + this._preparationDetailsUrl; }
    get investigatorsUrl() { return this.configurations.baseUrl + this._investigatorsUrl; }
    get legacyinvestigatorsUrl() { return this.configurations.baseUrl + this._legacyInvestigatorsUrl; }
    get investigatorRequestsUrl() { return this.configurations.baseUrl + this._investigatorRequestsUrl; }

    get metastaticSitesUrl() { return this.configurations.baseUrl + this._metastaticSiteUrl; }
    get anatomicSitesUrl() { return this.configurations.baseUrl + this._anatomicSiteUrl; }
    get tissueTypesUrl() { return this.configurations.baseUrl + this._tissueTypeUrl; }
    get diagnosisesUrl() { return this.configurations.baseUrl + this._diagnosisUrl; }
    get diagnosisSubClassesUrl() { return this.configurations.baseUrl + this._diagnosisSubClassUrl; }
    get diagnosisModifiersUrl() { return this.configurations.baseUrl + this._diagnosisModifierUrl; }
    get savediagnosisUrl() { return this.configurations.baseUrl + this._saveDiagnosisUrl; }

    get sampleSequencePartOnesUrl() { return this.configurations.baseUrl + this._sampleSequencePartOneUrl; }
    get sampleSequencePartTwosUrl() { return this.configurations.baseUrl + this._sampleSequencePartTwoUrl; }
    get protocolsUrl() { return this.configurations.baseUrl + this._protocolUrl; }
    get freezersUrl() { return this.configurations.baseUrl + this._freezerUrl; }
    get racksUrl() { return this.configurations.baseUrl + this._rackUrl; }
    get levelsUrl() { return this.configurations.baseUrl + this._levelUrl; }
    get specimenContainersUrl() { return this.configurations.baseUrl + this._specimenContainerUrl; }
    get consVersionsUrl() { return this.configurations.baseUrl + this._consVersionUrl; }
    get consDenyReasonsUrl() { return this.configurations.baseUrl + this._consDenyReasonUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

    //constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

    //    super(http, configurations, injector);
    //}

    ///* Status Endpoints */
    //getStatusesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.statusesUrl}/${page}/${pageSize}` : this.statusesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getStatusesEndpoint(page, pageSize));
    //        });
    //}

    //getStatusEndpoint<T>(statusId?: string): Observable<T> {
    //    let endpointUrl = statusId ? `${this.statusesUrl}/${statusId}` : this.statusesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getStatusEndpoint(statusId));
    //        });
    //}

    //getNewStatusEndpoint<T>(statusObject: any): Observable<T> {

    //    return this.http.post(this.statusesUrl, JSON.stringify(statusObject), this.getRequestHeaders())
    //        .map((response: Response) => {
    //            return response;
    //        })
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewStatusEndpoint(statusObject));
    //        });
    //}

    //getUpdateStatusEndpoint<T>(statusObject: any, statusId?: string): Observable<T> {
    //    let endpointUrl = statusId ? `${this.statusesUrl}/${statusId}` : this.statusesUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(statusObject), this.getRequestHeaders())
    //        .map((response: Response) => {
    //            return response;
    //        })
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateStatusEndpoint(statusObject, statusId));
    //        });
    //}

    //getStatusByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.statusesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getStatusByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteStatusEndpoint<T>(statusId: string): Observable<T> {
    //    let endpointUrl = `${this.statusesUrl}/${statusId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteStatusEndpoint(statusId));
    //        });
    //}

    ///* Race Endpoints */
    //getRacesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.racesUrl}/${page}/${pageSize}` : this.racesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRacesEndpoint(page, pageSize));
    //        });
    //}

    //getRaceEndpoint<T>(raceId?: string): Observable<T> {
    //    let endpointUrl = raceId ? `${this.racesUrl}/${raceId}` : this.racesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRaceEndpoint(raceId));
    //        });
    //}

    //getNewRaceEndpoint<T>(raceObject: any): Observable<T> {

    //    return this.http.post<T>(this.racesUrl, JSON.stringify(raceObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewRaceEndpoint(raceObject));
    //        });
    //}

    //getUpdateRaceEndpoint<T>(raceObject: any, raceId?: string): Observable<T> {
    //    let endpointUrl = raceId ? `${this.racesUrl}/${raceId}` : this.racesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(raceObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateRaceEndpoint(raceObject, raceId));
    //        });
    //}

    //getRaceByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.racesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRaceByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteRaceEndpoint<T>(raceId: string): Observable<T> {
    //    let endpointUrl = `${this.racesUrl}/${raceId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteRaceEndpoint(raceId));
    //        });
    //}

    ///* RaceSubCategory Endpoints */
    //getRaceSubCategoriesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.raceSubCategoriesUrl}/${page}/${pageSize}` : this.raceSubCategoriesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRaceSubCategoriesEndpoint(page, pageSize));
    //        });
    //}

    //getRaceSubCategoryEndpoint<T>(raceSubCategoryId?: string): Observable<T> {
    //    let endpointUrl = raceSubCategoryId ? `${this.raceSubCategoriesUrl}/${raceSubCategoryId}` : this.raceSubCategoriesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRaceSubCategoryEndpoint(raceSubCategoryId));
    //        });
    //}

    //getNewRaceSubCategoryEndpoint<T>(raceSubCategoryObject: any): Observable<T> {

    //    return this.http.post<T>(this.raceSubCategoriesUrl, JSON.stringify(raceSubCategoryObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewRaceSubCategoryEndpoint(raceSubCategoryObject));
    //        });
    //}

    //getUpdateRaceSubCategoryEndpoint<T>(raceSubCategoryObject: any, raceSubCategoryId?: string): Observable<T> {
    //    let endpointUrl = raceSubCategoryId ? `${this.raceSubCategoriesUrl}/${raceSubCategoryId}` : this.raceSubCategoriesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(raceSubCategoryObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateRaceSubCategoryEndpoint(raceSubCategoryObject, raceSubCategoryId));
    //        });
    //}

    //getRaceSubCategoryByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.raceSubCategoriesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRaceSubCategoryByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteRaceSubCategoryEndpoint<T>(raceSubCategoryId: string): Observable<T> {
    //    let endpointUrl = `${this.raceSubCategoriesUrl}/${raceSubCategoryId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteRaceSubCategoryEndpoint(raceSubCategoryId));
    //        });
    //}

    ///* Gender Endpoints */
    //getGendersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.gendersUrl}/${page}/${pageSize}` : this.gendersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getGendersEndpoint(page, pageSize));
    //        });
    //}

    //getGenderEndpoint<T>(genderId?: string): Observable<T> {
    //    let endpointUrl = genderId ? `${this.gendersUrl}/${genderId}` : this.gendersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getGenderEndpoint(genderId));
    //        });
    //}

    //getNewGenderEndpoint<T>(genderObject: any): Observable<T> {

    //    return this.http.post<T>(this.gendersUrl, JSON.stringify(genderObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewGenderEndpoint(genderObject));
    //        });
    //}

    //getUpdateGenderEndpoint<T>(genderObject: any, genderId?: string): Observable<T> {
    //    let endpointUrl = genderId ? `${this.gendersUrl}/${genderId}` : this.gendersUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(genderObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateGenderEndpoint(genderObject, genderId));
    //        });
    //}

    //getGenderByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.gendersUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getGenderByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteGenderEndpoint<T>(genderId: string): Observable<T> {
    //    let endpointUrl = `${this.gendersUrl}/${genderId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteGenderEndpoint(genderId));
    //        });
    //}

    ///* Ethnicity Endpoints */
    //getEthnicitiesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.ethnicitiesUrl}/${page}/${pageSize}` : this.ethnicitiesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getEthnicitiesEndpoint(page, pageSize));
    //        });
    //}

    //getEthnicityEndpoint<T>(ethnicityId?: string): Observable<T> {
    //    let endpointUrl = ethnicityId ? `${this.ethnicitiesUrl}/${ethnicityId}` : this.ethnicitiesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getEthnicityEndpoint(ethnicityId));
    //        });
    //}

    //getNewEthnicityEndpoint<T>(ethnicityObject: any): Observable<T> {

    //    return this.http.post<T>(this.ethnicitiesUrl, JSON.stringify(ethnicityObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewEthnicityEndpoint(ethnicityObject));
    //        });
    //}

    //getUpdateEthnicityEndpoint<T>(ethnicityObject: any, ethnicityId?: string): Observable<T> {
    //    let endpointUrl = ethnicityId ? `${this.ethnicitiesUrl}/${ethnicityId}` : this.ethnicitiesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(ethnicityObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateEthnicityEndpoint(ethnicityObject, ethnicityId));
    //        });
    //}

    //getEthnicityByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.ethnicitiesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getEthnicityByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteEthnicityEndpoint<T>(ethnicityId: string): Observable<T> {
    //    let endpointUrl = `${this.ethnicitiesUrl}/${ethnicityId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteEthnicityEndpoint(ethnicityId));
    //        });
    //}

    ///* Hospital Endpoints */
    //getHospitalsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.hospitalsUrl}/${page}/${pageSize}` : this.hospitalsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getHospitalsEndpoint(page, pageSize));
    //        });
    //}

    //getHospitalEndpoint<T>(hospitalId?: string): Observable<T> {
    //    let endpointUrl = hospitalId ? `${this.hospitalsUrl}/${hospitalId}` : this.hospitalsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getHospitalEndpoint(hospitalId));
    //        });
    //}

    //getNewHospitalEndpoint<T>(hospitalObject: any): Observable<T> {

    //    return this.http.post<T>(this.hospitalsUrl, JSON.stringify(hospitalObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewHospitalEndpoint(hospitalObject));
    //        });
    //}

    //getUpdateHospitalEndpoint<T>(hospitalObject: any, hospitalId?: string): Observable<T> {
    //    let endpointUrl = hospitalId ? `${this.hospitalsUrl}/${hospitalId}` : this.hospitalsUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(hospitalObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateHospitalEndpoint(hospitalObject, hospitalId));
    //        });
    //}

    //getHospitalByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.hospitalsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getHospitalByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteHospitalEndpoint<T>(hospitalId: string): Observable<T> {
    //    let endpointUrl = `${this.hospitalsUrl}/${hospitalId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteHospitalEndpoint(hospitalId));
    //        });
    //}

    

    /* AgeModifier Endpoints */
    getAgeModifiersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
      let endpointUrl = page && pageSize ? `${this.ageModifiersUrl}/${page}/${pageSize}` : this.ageModifiersUrl;

      return this.http.get<T>(endpointUrl, this.requestHeaders)
        catchError(error => {
          return this.handleError(error, () => this.getAgeModifiersEndpoint(page, pageSize));
        });
    }

    getAgeModifierEndpoint<T>(ageModifierId?: string): Observable<T> {
        let endpointUrl = ageModifierId ? `${this.ageModifiersUrl}/${ageModifierId}` : this.ageModifiersUrl;

        return this.http.get<T>(endpointUrl, this.requestHeaders)
            catchError(error => {
                return this.handleError(error, () => this.getAgeModifierEndpoint(ageModifierId));
            });
    }

    getNewAgeModifierEndpoint<T>(ageModifierObject: any): Observable<T> {

        return this.http.post<T>(this.ageModifiersUrl, JSON.stringify(ageModifierObject), this.requestHeaders)
            catchError(error => {
                return this.handleError(error, () => this.getNewAgeModifierEndpoint(ageModifierObject));
            });
    }

    getUpdateAgeModifierEndpoint<T>(ageModifierObject: any, ageModifierId?: string): Observable<T> {
        let endpointUrl = ageModifierId ? `${this.ageModifiersUrl}/${ageModifierId}` : this.ageModifiersUrl;

        return this.http.put<T>(endpointUrl, JSON.stringify(ageModifierObject), this.requestHeaders)
            catchError(error => {
                return this.handleError(error, () => this.getUpdateAgeModifierEndpoint(ageModifierObject, ageModifierId));
            });
    }

    getAgeModifierByDescriptionEndpoint<T>(description?: string): Observable<T> {
        let endpointUrl = `${this.ageModifiersUrl}/${description}`;

        return this.http.get<T>(endpointUrl, this.requestHeaders)
            catchError(error => {
                return this.handleError(error, () => this.getAgeModifierByDescriptionEndpoint(description));
            });
    }

    getDeleteAgeModifierEndpoint<T>(ageModifierId: string): Observable<T> {
        let endpointUrl = `${this.ageModifiersUrl}/${ageModifierId}`;

        return this.http.delete<T>(endpointUrl, this.requestHeaders)
            catchError(error => {
                return this.handleError(error, () => this.getDeleteAgeModifierEndpoint(ageModifierId));
            });
    }

    ///* AmountSizeType Endpoints */
    //getAmountSizeTypesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.amountSizeTypesUrl}/${page}/${pageSize}` : this.amountSizeTypesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getAmountSizeTypesEndpoint(page, pageSize));
    //        });
    //}

    //getAmountSizeTypeEndpoint<T>(amountSizeTypeId?: string): Observable<T> {
    //    let endpointUrl = amountSizeTypeId ? `${this.amountSizeTypesUrl}/${amountSizeTypeId}` : this.amountSizeTypesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getAmountSizeTypeEndpoint(amountSizeTypeId));
    //        });
    //}

    //getNewAmountSizeTypeEndpoint<T>(amountSizeTypeObject: any): Observable<T> {

    //    return this.http.post<T>(this.amountSizeTypesUrl, JSON.stringify(amountSizeTypeObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewAmountSizeTypeEndpoint(amountSizeTypeObject));
    //        });
    //}

    //getUpdateAmountSizeTypeEndpoint<T>(amountSizeTypeObject: any, amountSizeTypeId?: string): Observable<T> {
    //    let endpointUrl = amountSizeTypeId ? `${this.amountSizeTypesUrl}/${amountSizeTypeId}` : this.amountSizeTypesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(amountSizeTypeObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateAmountSizeTypeEndpoint(amountSizeTypeObject, amountSizeTypeId));
    //        });
    //}

    //getAmountSizeTypeByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.amountSizeTypesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getAmountSizeTypeByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteAmountSizeTypeEndpoint<T>(amountSizeTypeId: string): Observable<T> {
    //    let endpointUrl = `${this.amountSizeTypesUrl}/${amountSizeTypeId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteAmountSizeTypeEndpoint(amountSizeTypeId));
    //        });
    //}

    ///* ProcedureType Endpoints */
    //getProcedureTypesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.procedureTypesUrl}/${page}/${pageSize}` : this.procedureTypesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getProcedureTypesEndpoint(page, pageSize));
    //        });
    //}

    //getLegacyProcedureTypesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.legacyprocedureTypesUrl}/${page}/${pageSize}` : this.legacyprocedureTypesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getLegacyProcedureTypesEndpoint(page, pageSize));
    //        });
    //}

    //getProcedureTypeEndpoint<T>(procedureTypeId?: string): Observable<T> {
    //    let endpointUrl = procedureTypeId ? `${this.procedureTypesUrl}/${procedureTypeId}` : this.procedureTypesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getProcedureTypeEndpoint(procedureTypeId));
    //        });
    //}

    //getNewProcedureTypeEndpoint<T>(procedureTypeObject: any): Observable<T> {

    //    return this.http.post<T>(this.procedureTypesUrl, JSON.stringify(procedureTypeObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewProcedureTypeEndpoint(procedureTypeObject));
    //        });
    //}

    //getUpdateProcedureTypeEndpoint<T>(procedureTypeObject: any, procedureTypeId?: string): Observable<T> {
    //    let endpointUrl = procedureTypeId ? `${this.procedureTypesUrl}/${procedureTypeId}` : this.procedureTypesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(procedureTypeObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateProcedureTypeEndpoint(procedureTypeObject, procedureTypeId));
    //        });
    //}

    //getProcedureTypeByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.procedureTypesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getProcedureTypeByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteProcedureTypeEndpoint<T>(procedureTypeId: string): Observable<T> {
    //    let endpointUrl = `${this.procedureTypesUrl}/${procedureTypeId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteProcedureTypeEndpoint(procedureTypeId));
    //        });
    //}

    ///* TissueArea Endpoints */
    //getTissueAreasEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.tissueAreasUrl}/${page}/${pageSize}` : this.tissueAreasUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getTissueAreasEndpoint(page, pageSize));
    //        });
    //}

    //getTissueAreaEndpoint<T>(tissueAreaId?: string): Observable<T> {
    //    let endpointUrl = tissueAreaId ? `${this.tissueAreasUrl}/${tissueAreaId}` : this.tissueAreasUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getTissueAreaEndpoint(tissueAreaId));
    //        });
    //}

    //getNewTissueAreaEndpoint<T>(tissueAreaObject: any): Observable<T> {

    //    return this.http.post<T>(this.tissueAreasUrl, JSON.stringify(tissueAreaObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewTissueAreaEndpoint(tissueAreaObject));
    //        });
    //}

    //getUpdateTissueAreaEndpoint<T>(tissueAreaObject: any, tissueAreaId?: string): Observable<T> {
    //    let endpointUrl = tissueAreaId ? `${this.tissueAreasUrl}/${tissueAreaId}` : this.tissueAreasUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(tissueAreaObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateTissueAreaEndpoint(tissueAreaObject, tissueAreaId));
    //        });
    //}

    //getTissueAreaByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.tissueAreasUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getTissueAreaByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteTissueAreaEndpoint<T>(tissueAreaId: string): Observable<T> {
    //    let endpointUrl = `${this.tissueAreasUrl}/${tissueAreaId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteTissueAreaEndpoint(tissueAreaId));
    //        });
    //}

    ///* ShipmentStatus Endpoints */
    //getShipmentStatusesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.shipmentStatusesUrl}/${page}/${pageSize}` : this.shipmentStatusesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getShipmentStatusesEndpoint(page, pageSize));
    //        });
    //}

    //getShipmentStatusEndpoint<T>(shipmentStatusId?: string): Observable<T> {
    //    let endpointUrl = shipmentStatusId ? `${this.shipmentStatusesUrl}/${shipmentStatusId}` : this.shipmentStatusesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getShipmentStatusEndpoint(shipmentStatusId));
    //        });
    //}

    //getNewShipmentStatusEndpoint<T>(shipmentStatusObject: any): Observable<T> {

    //    return this.http.post<T>(this.shipmentStatusesUrl, JSON.stringify(shipmentStatusObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewShipmentStatusEndpoint(shipmentStatusObject));
    //        });
    //}

    //getUpdateShipmentStatusEndpoint<T>(shipmentStatusObject: any, shipmentStatusId?: string): Observable<T> {
    //    let endpointUrl = shipmentStatusId ? `${this.shipmentStatusesUrl}/${shipmentStatusId}` : this.shipmentStatusesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(shipmentStatusObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateShipmentStatusEndpoint(shipmentStatusObject, shipmentStatusId));
    //        });
    //}

    //getShipmentStatusByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.shipmentStatusesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getShipmentStatusByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteShipmentStatusEndpoint<T>(shipmentStatusId: string): Observable<T> {
    //    let endpointUrl = `${this.shipmentStatusesUrl}/${shipmentStatusId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteShipmentStatusEndpoint(shipmentStatusId));
    //        });
    //}

    ///* Preparation Endpoints */
    //getPreparationsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.preparationsUrl}/${page}/${pageSize}` : this.preparationsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getPreparationsEndpoint(page, pageSize));
    //        });
    //}

    //getPreparationEndpoint<T>(preparationId?: string): Observable<T> {
    //    let endpointUrl = preparationId ? `${this.preparationsUrl}/${preparationId}` : this.preparationsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getPreparationEndpoint(preparationId));
    //        });
    //}

    //getNewPreparationEndpoint<T>(preparationObject: any): Observable<T> {

    //    return this.http.post<T>(this.preparationsUrl, JSON.stringify(preparationObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewPreparationEndpoint(preparationObject));
    //        });
    //}

    //getUpdatePreparationEndpoint<T>(preparationObject: any, preparationId?: string): Observable<T> {
    //    let endpointUrl = preparationId ? `${this.preparationsUrl}/${preparationId}` : this.preparationsUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(preparationObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdatePreparationEndpoint(preparationObject, preparationId));
    //        });
    //}

    //getPreparationByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.preparationsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getPreparationByDescriptionEndpoint(description));
    //        });
    //}

    //getDeletePreparationEndpoint<T>(preparationId: string): Observable<T> {
    //    let endpointUrl = `${this.preparationsUrl}/${preparationId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeletePreparationEndpoint(preparationId));
    //        });
    //}

    ///* PreparationDetail Endpoints */
    //getPreparationDetailsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.preparationDetailsUrl}/${page}/${pageSize}` : this.preparationDetailsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getPreparationDetailsEndpoint(page, pageSize));
    //        });
    //}

    //getPreparationDetailEndpoint<T>(preparationDetailId?: string): Observable<T> {
    //    let endpointUrl = preparationDetailId ? `${this.preparationDetailsUrl}/${preparationDetailId}` : this.preparationDetailsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getPreparationDetailEndpoint(preparationDetailId));
    //        });
    //}

    //getNewPreparationDetailEndpoint<T>(preparationDetailObject: any): Observable<T> {

    //    return this.http.post<T>(this.preparationDetailsUrl, JSON.stringify(preparationDetailObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewPreparationDetailEndpoint(preparationDetailObject));
    //        });
    //}

    //getUpdatePreparationDetailEndpoint<T>(preparationDetailObject: any, preparationDetailId?: string): Observable<T> {
    //    let endpointUrl = preparationDetailId ? `${this.preparationDetailsUrl}/${preparationDetailId}` : this.preparationDetailsUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(preparationDetailObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdatePreparationDetailEndpoint(preparationDetailObject, preparationDetailId));
    //        });
    //}

    //getPreparationDetailByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.preparationDetailsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getPreparationDetailByDescriptionEndpoint(description));
    //        });
    //}

    //getDeletePreparationDetailEndpoint<T>(preparationDetailId: string): Observable<T> {
    //    let endpointUrl = `${this.preparationDetailsUrl}/${preparationDetailId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeletePreparationDetailEndpoint(preparationDetailId));
    //        });
    //}

    ///* Investigator Endpoints */
    //getInvestigatorsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.investigatorsUrl}/${page}/${pageSize}` : this.investigatorsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getInvestigatorsEndpoint(page, pageSize));
    //        });
    //}

    //getlegacyInvestigatorsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.legacyinvestigatorsUrl}/${page}/${pageSize}` : this.legacyinvestigatorsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getlegacyInvestigatorsEndpoint(page, pageSize));
    //        });
    //}

    //getInvestigatorEndpoint<T>(investigatorId?: string): Observable<T> {
    //    let endpointUrl = investigatorId ? `${this.investigatorsUrl}/${investigatorId}` : this.investigatorsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getInvestigatorEndpoint(investigatorId));
    //        });
    //}

    //getNewInvestigatorEndpoint<T>(investigatorObject: any): Observable<T> {

    //    return this.http.post<T>(this.investigatorsUrl, JSON.stringify(investigatorObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewInvestigatorEndpoint(investigatorObject));
    //        });
    //}

    //getUpdateInvestigatorEndpoint<T>(investigatorObject: any, investigatorId?: string): Observable<T> {
    //    let endpointUrl = investigatorId ? `${this.investigatorsUrl}/${investigatorId}` : this.investigatorsUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(investigatorObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateInvestigatorEndpoint(investigatorObject, investigatorId));
    //        });
    //}

    //getInvestigatorByCodeEndpoint<T>(code: string): Observable<T> {
    //    let endpointUrl = `${this.investigatorsUrl}/${code}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getInvestigatorByCodeEndpoint(code));
    //        });
    //}

    //getDeleteInvestigatorEndpoint<T>(investigatorId: string): Observable<T> {
    //    let endpointUrl = `${this.investigatorsUrl}/${investigatorId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteInvestigatorEndpoint(investigatorId));
    //        });
    //}

    ///* InvestigatorRequest Endpoints */
    //getInvestigatorRequestsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.investigatorRequestsUrl}/${page}/${pageSize}` : this.investigatorRequestsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getInvestigatorRequestsEndpoint(page, pageSize));
    //        });
    //}

    //getInvestigatorRequestEndpoint<T>(investigatorRequestId?: string): Observable<T> {
    //    let endpointUrl = investigatorRequestId ? `${this.investigatorRequestsUrl}/${investigatorRequestId}` : this.investigatorRequestsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getInvestigatorRequestEndpoint(investigatorRequestId));
    //        });
    //}

    //getNewInvestigatorRequestEndpoint<T>(investigatorRequestObject: any): Observable<T> {

    //    return this.http.post(this.investigatorRequestsUrl, JSON.stringify(investigatorRequestObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewInvestigatorRequestEndpoint(investigatorRequestObject));
    //        });
    //}

    //getUpdateInvestigatorRequestEndpoint<T>(investigatorRequestObject: any, investigatorRequestId?: string): Observable<T> {
    //    let endpointUrl = investigatorRequestId ? `${this.investigatorRequestsUrl}/${investigatorRequestId}` : this.investigatorRequestsUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(investigatorRequestObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateInvestigatorRequestEndpoint(investigatorRequestObject, investigatorRequestId));
    //        });
    //}

    //getInvestigatorRequestByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.investigatorRequestsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getInvestigatorRequestByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteInvestigatorRequestEndpoint<T>(investigatorRequestId: string): Observable<T> {
    //    let endpointUrl = `${this.investigatorRequestsUrl}/${investigatorRequestId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteInvestigatorRequestEndpoint(investigatorRequestId));
    //        });
    //}

    ///* MetastaticSite Endpoints */
    //getMetastaticSitesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.metastaticSitesUrl}/${page}/${pageSize}` : this.metastaticSitesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getMetastaticSitesEndpoint(page, pageSize));
    //        });
    //}

    //getMetastaticSiteEndpoint<T>(metastaticSiteId?: string): Observable<T> {
    //    let endpointUrl = metastaticSiteId ? `${this.metastaticSitesUrl}/${metastaticSiteId}` : this.metastaticSitesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getMetastaticSiteEndpoint(metastaticSiteId));
    //        });
    //}

    //getNewMetastaticSiteEndpoint<T>(metastaticSiteObject: any): Observable<T> {

    //    return this.http.post<T>(this.metastaticSitesUrl, JSON.stringify(metastaticSiteObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewMetastaticSiteEndpoint(metastaticSiteObject));
    //        });
    //}

    //getUpdateMetastaticSiteEndpoint<T>(metastaticSiteObject: any, metastaticSiteId?: string): Observable<T> {
    //    let endpointUrl = metastaticSiteId ? `${this.metastaticSitesUrl}/${metastaticSiteId}` : this.metastaticSitesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(metastaticSiteObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateMetastaticSiteEndpoint(metastaticSiteObject, metastaticSiteId));
    //        });
    //}

    //getMetastaticSiteByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.metastaticSitesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getMetastaticSiteByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteMetastaticSiteEndpoint<T>(metastaticSiteId: string): Observable<T> {
    //    let endpointUrl = `${this.metastaticSitesUrl}/${metastaticSiteId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteMetastaticSiteEndpoint(metastaticSiteId));
    //        });
    //}

    ///* AnatomicSite Endpoints */
    //getAnatomicSitesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.anatomicSitesUrl}/${page}/${pageSize}` : this.anatomicSitesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getAnatomicSitesEndpoint(page, pageSize));
    //        });
    //}

    //getMalignantAnatomicSitesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.anatomicSitesUrl}/Malignant/${page}/${pageSize}` : `${this.anatomicSitesUrl}/Malignant`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getMalignantAnatomicSitesEndpoint(page, pageSize));
    //        });
    //}

    //getNonMalignantAnatomicSitesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.anatomicSitesUrl}/NonMalignant/${page}/${pageSize}` : `${this.anatomicSitesUrl}/NonMalignant`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNonMalignantAnatomicSitesEndpoint(page, pageSize));
    //        });
    //}

    //getAnatomicSiteEndpoint<T>(anatomicSiteId?: string): Observable<T> {
    //    let endpointUrl = anatomicSiteId ? `${this.anatomicSitesUrl}/${anatomicSiteId}` : this.anatomicSitesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getAnatomicSiteEndpoint(anatomicSiteId));
    //        });
    //}

    //getNewAnatomicSiteEndpoint<T>(anatomicSiteObject: any): Observable<T> {

    //    return this.http.post<T>(this.anatomicSitesUrl, JSON.stringify(anatomicSiteObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewAnatomicSiteEndpoint(anatomicSiteObject));
    //        });
    //}

    //getUpdateAnatomicSiteEndpoint<T>(anatomicSiteObject: any, anatomicSiteId?: string): Observable<T> {
    //    let endpointUrl = anatomicSiteId ? `${this.anatomicSitesUrl}/${anatomicSiteId}` : this.anatomicSitesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(anatomicSiteObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateAnatomicSiteEndpoint(anatomicSiteObject, anatomicSiteId));
    //        });
    //}

    //getAnatomicSiteByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.anatomicSitesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getAnatomicSiteByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteAnatomicSiteEndpoint<T>(anatomicSiteId: string): Observable<T> {
    //    let endpointUrl = `${this.anatomicSitesUrl}/${anatomicSiteId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteAnatomicSiteEndpoint(anatomicSiteId));
    //        });
    //}

    ///* TissueType Endpoints */
    //getTissueTypesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.tissueTypesUrl}/${page}/${pageSize}` : this.tissueTypesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getTissueTypesEndpoint(page, pageSize));
    //        });
    //}

    //getTissueTypesByAnatomicSiteIdEndpoint<T>(anatomicSiteId: number): Observable<T> {
    //    let endpointUrl = `${this.tissueTypesUrl}/GetByAnatomicSiteId/${anatomicSiteId}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getTissueTypesByAnatomicSiteIdEndpoint(anatomicSiteId));
    //        });
    //}

    //getTissueTypeEndpoint<T>(tissueTypeId?: string): Observable<T> {
    //    let endpointUrl = tissueTypeId ? `${this.tissueTypesUrl}/${tissueTypeId}` : this.tissueTypesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getTissueTypeEndpoint(tissueTypeId));
    //        });
    //}

    //getNewTissueTypeEndpoint<T>(tissueTypeObject: any): Observable<T> {

    //    return this.http.post<T>(this.tissueTypesUrl, JSON.stringify(tissueTypeObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewTissueTypeEndpoint(tissueTypeObject));
    //        });
    //}

    //getUpdateTissueTypeEndpoint<T>(tissueTypeObject: any, tissueTypeId?: string): Observable<T> {
    //    let endpointUrl = tissueTypeId ? `${this.tissueTypesUrl}/${tissueTypeId}` : this.tissueTypesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(tissueTypeObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateTissueTypeEndpoint(tissueTypeObject, tissueTypeId));
    //        });
    //}

    //getTissueTypeByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.tissueTypesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getTissueTypeByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteTissueTypeEndpoint<T>(tissueTypeId: string): Observable<T> {
    //    let endpointUrl = `${this.tissueTypesUrl}/${tissueTypeId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteTissueTypeEndpoint(tissueTypeId));
    //        });
    //}

    ///* Diagnosis Endpoints */
    //getDiagnosisesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.diagnosisesUrl}/${page}/${pageSize}` : this.diagnosisesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisesEndpoint(page, pageSize));
    //        });
    //}

    //getDiagnosisesByTissueTypeIdEndpoint<T>(tissueTypeId: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisesUrl}/tissueTypeId/${tissueTypeId}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisesByTissueTypeIdEndpoint(tissueTypeId));
    //        });
    //}

    //getDiagnosisEndpoint<T>(diagnosisId?: string): Observable<T> {
    //    let endpointUrl = diagnosisId ? `${this.diagnosisesUrl}/${diagnosisId}` : this.diagnosisesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisEndpoint(diagnosisId));
    //        });
    //}

    //getNewDiagnosisEndpoint<T>(diagnosisObject: any): Observable<T> {

    //    return this.http.post<T>(this.diagnosisesUrl, JSON.stringify(diagnosisObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewDiagnosisEndpoint(diagnosisObject));
    //        });
    //}

    //getUpdateDiagnosisEndpoint<T>(diagnosisObject: any, diagnosisId?: string): Observable<T> {
    //    let endpointUrl = diagnosisId ? `${this.diagnosisesUrl}/${diagnosisId}` : this.diagnosisesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(diagnosisObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateDiagnosisEndpoint(diagnosisObject, diagnosisId));
    //        });
    //}

    //getDiagnosisByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteDiagnosisEndpoint<T>(diagnosisId: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisesUrl}/${diagnosisId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteDiagnosisEndpoint(diagnosisId));
    //        });
    //}

    ///* DiagnosisSubClass Endpoints */
    //getDiagnosisSubClassesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.diagnosisSubClassesUrl}/${page}/${pageSize}` : this.diagnosisSubClassesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisSubClassesEndpoint(page, pageSize));
    //        });
    //}

    //getDiagnosisSubClassesByDiagnosisIdEndpoint<T>(diagnosisId: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisSubClassesUrl}/GetByDiagnosisId/${diagnosisId}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisSubClassesByDiagnosisIdEndpoint(diagnosisId));
    //        });
    //}

    //getDiagnosisSubClassEndpoint<T>(diagnosisSubClassId?: string): Observable<T> {
    //    let endpointUrl = diagnosisSubClassId ? `${this.diagnosisSubClassesUrl}/${diagnosisSubClassId}` : this.diagnosisSubClassesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisSubClassEndpoint(diagnosisSubClassId));
    //        });
    //}

    //getNewDiagnosisSubClassEndpoint<T>(diagnosisSubClassObject: any): Observable<T> {

    //    return this.http.post<T>(this.diagnosisSubClassesUrl, JSON.stringify(diagnosisSubClassObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewDiagnosisSubClassEndpoint(diagnosisSubClassObject));
    //        });
    //}

    //getUpdateDiagnosisSubClassEndpoint<T>(diagnosisSubClassObject: any, diagnosisSubClassId?: string): Observable<T> {
    //    let endpointUrl = diagnosisSubClassId ? `${this.diagnosisSubClassesUrl}/${diagnosisSubClassId}` : this.diagnosisSubClassesUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(diagnosisSubClassObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateDiagnosisSubClassEndpoint(diagnosisSubClassObject, diagnosisSubClassId));
    //        });
    //}

    //getDiagnosisSubClassByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisSubClassesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisSubClassByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteDiagnosisSubClassEndpoint<T>(diagnosisSubClassId: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisSubClassesUrl}/${diagnosisSubClassId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteDiagnosisSubClassEndpoint(diagnosisSubClassId));
    //        });
    //}

    ///* DiagnosisModifier Endpoints */
    //getDiagnosisModifiersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.diagnosisModifiersUrl}/${page}/${pageSize}` : this.diagnosisModifiersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisModifiersEndpoint(page, pageSize));
    //        });
    //}

    //getDiagnosisModifiersByDiagnosisSubClassIdEndpoint<T>(diagnosisSubClassId: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisModifiersUrl}/GetByDiagnosisSubClassId/${diagnosisSubClassId}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisModifiersByDiagnosisSubClassIdEndpoint(diagnosisSubClassId));
    //        });
    //}

    //getDiagnosisModifierEndpoint<T>(diagnosisModifierId?: string): Observable<T> {
    //    let endpointUrl = diagnosisModifierId ? `${this.diagnosisModifiersUrl}/${diagnosisModifierId}` : this.diagnosisModifiersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisModifierEndpoint(diagnosisModifierId));
    //        });
    //}

    //getNewDiagnosisModifierEndpoint<T>(diagnosisModifierObject: any): Observable<T> {

    //    return this.http.post<T>(this.diagnosisModifiersUrl, JSON.stringify(diagnosisModifierObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewDiagnosisModifierEndpoint(diagnosisModifierObject));
    //        });
    //}

    //getUpdateDiagnosisModifierEndpoint<T>(diagnosisModifierObject: any, diagnosisModifierId?: string): Observable<T> {
    //    let endpointUrl = diagnosisModifierId ? `${this.diagnosisModifiersUrl}/${diagnosisModifierId}` : this.diagnosisModifiersUrl;

    //    return this.http.put<T>(endpointUrl, JSON.stringify(diagnosisModifierObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateDiagnosisModifierEndpoint(diagnosisModifierObject, diagnosisModifierId));
    //        });
    //}

    //getDiagnosisModifierByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisModifiersUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDiagnosisModifierByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteDiagnosisModifierEndpoint<T>(diagnosisModifierId: string): Observable<T> {
    //    let endpointUrl = `${this.diagnosisModifiersUrl}/${diagnosisModifierId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteDiagnosisModifierEndpoint(diagnosisModifierId));
    //        });
    //}

    ///* SampleSequencePartOne Endpoints */
    //getSampleSequencePartOnesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.sampleSequencePartOnesUrl}/${page}/${pageSize}` : this.sampleSequencePartOnesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSampleSequencePartOnesEndpoint(page, pageSize));
    //        });
    //}

    //getSampleSequencePartOneEndpoint<T>(sampleSequencePartOneId?: string): Observable<T> {
    //    let endpointUrl = sampleSequencePartOneId ? `${this.sampleSequencePartOnesUrl}/${sampleSequencePartOneId}` : this.sampleSequencePartOnesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSampleSequencePartOneEndpoint(sampleSequencePartOneId));
    //        });
    //}

    //getNewSampleSequencePartOneEndpoint<T>(sampleSequencePartOneObject: any): Observable<T> {

    //    return this.http.post(this.sampleSequencePartOnesUrl, JSON.stringify(sampleSequencePartOneObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewSampleSequencePartOneEndpoint(sampleSequencePartOneObject));
    //        });
    //}

    //getUpdateSampleSequencePartOneEndpoint<T>(sampleSequencePartOneObject: any, sampleSequencePartOneId?: string): Observable<T> {
    //    let endpointUrl = sampleSequencePartOneId ? `${this.sampleSequencePartOnesUrl}/${sampleSequencePartOneId}` : this.sampleSequencePartOnesUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(sampleSequencePartOneObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateSampleSequencePartOneEndpoint(sampleSequencePartOneObject, sampleSequencePartOneId));
    //        });
    //}

    //getSampleSequencePartOneByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.sampleSequencePartOnesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSampleSequencePartOneByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteSampleSequencePartOneEndpoint<T>(sampleSequencePartOneId: string): Observable<T> {
    //    let endpointUrl = `${this.sampleSequencePartOnesUrl}/${sampleSequencePartOneId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteSampleSequencePartOneEndpoint(sampleSequencePartOneId));
    //        });
    //}

    ///* SampleSequencePartTwo Endpoints */
    //getSampleSequencePartTwosEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.sampleSequencePartTwosUrl}/${page}/${pageSize}` : this.sampleSequencePartTwosUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSampleSequencePartTwosEndpoint(page, pageSize));
    //        });
    //}

    //getSampleSequencePartTwoEndpoint<T>(sampleSequencePartTwoId?: string): Observable<T> {
    //    let endpointUrl = sampleSequencePartTwoId ? `${this.sampleSequencePartTwosUrl}/${sampleSequencePartTwoId}` : this.sampleSequencePartTwosUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSampleSequencePartTwoEndpoint(sampleSequencePartTwoId));
    //        });
    //}

    //getNewSampleSequencePartTwoEndpoint<T>(sampleSequencePartTwoObject: any): Observable<T> {

    //    return this.http.post(this.sampleSequencePartTwosUrl, JSON.stringify(sampleSequencePartTwoObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewSampleSequencePartTwoEndpoint(sampleSequencePartTwoObject));
    //        });
    //}

    //getUpdateSampleSequencePartTwoEndpoint<T>(sampleSequencePartTwoObject: any, sampleSequencePartTwoId?: string): Observable<T> {
    //    let endpointUrl = sampleSequencePartTwoId ? `${this.sampleSequencePartTwosUrl}/${sampleSequencePartTwoId}` : this.sampleSequencePartTwosUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(sampleSequencePartTwoObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateSampleSequencePartTwoEndpoint(sampleSequencePartTwoObject, sampleSequencePartTwoId));
    //        });
    //}

    //getSampleSequencePartTwoByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.sampleSequencePartTwosUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSampleSequencePartTwoByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteSampleSequencePartTwoEndpoint<T>(sampleSequencePartTwoId: string): Observable<T> {
    //    let endpointUrl = `${this.sampleSequencePartTwosUrl}/${sampleSequencePartTwoId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteSampleSequencePartTwoEndpoint(sampleSequencePartTwoId));
    //        });
    //}

    ///* Protocol Endpoints */
    //getProtocolsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.protocolsUrl}/${page}/${pageSize}` : this.protocolsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getProtocolsEndpoint(page, pageSize));
    //        });
    //}

    //getProtocolEndpoint<T>(protocolId?: string): Observable<T> {
    //    let endpointUrl = protocolId ? `${this.protocolsUrl}/${protocolId}` : this.protocolsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getProtocolEndpoint(protocolId));
    //        });
    //}

    //getNewProtocolEndpoint<T>(protocolObject: any): Observable<T> {

    //    return this.http.post(this.protocolsUrl, JSON.stringify(protocolObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewProtocolEndpoint(protocolObject));
    //        });
    //}

    //getUpdateProtocolEndpoint<T>(protocolObject: any, protocolId?: string): Observable<T> {
    //    let endpointUrl = protocolId ? `${this.protocolsUrl}/${protocolId}` : this.protocolsUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(protocolObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateProtocolEndpoint(protocolObject, protocolId));
    //        });
    //}

    //getProtocolByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.protocolsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getProtocolByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteProtocolEndpoint<T>(protocolId: string): Observable<T> {
    //    let endpointUrl = `${this.protocolsUrl}/${protocolId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteProtocolEndpoint(protocolId));
    //        });
    //}

    ///* Freezer Endpoints */
    //getFreezersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.freezersUrl}/${page}/${pageSize}` : this.freezersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getFreezersEndpoint(page, pageSize));
    //        });
    //}

    //getFreezerEndpoint<T>(freezerId?: string): Observable<T> {
    //    let endpointUrl = freezerId ? `${this.freezersUrl}/${freezerId}` : this.freezersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getFreezerEndpoint(freezerId));
    //        });
    //}

    //getNewFreezerEndpoint<T>(freezerObject: any): Observable<T> {

    //    return this.http.post(this.freezersUrl, JSON.stringify(freezerObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewFreezerEndpoint(freezerObject));
    //        });
    //}

    //getUpdateFreezerEndpoint<T>(freezerObject: any, freezerId?: string): Observable<T> {
    //    let endpointUrl = freezerId ? `${this.freezersUrl}/${freezerId}` : this.freezersUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(freezerObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateFreezerEndpoint(freezerObject, freezerId));
    //        });
    //}

    //getFreezerByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.freezersUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getFreezerByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteFreezerEndpoint<T>(freezerId: string): Observable<T> {
    //    let endpointUrl = `${this.freezersUrl}/${freezerId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteFreezerEndpoint(freezerId));
    //        });
    //}

    ///* Rack Endpoints */
    //getRacksEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.racksUrl}/${page}/${pageSize}` : this.racksUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRacksEndpoint(page, pageSize));
    //        });
    //}

    //getRackEndpoint<T>(rackId?: string): Observable<T> {
    //    let endpointUrl = rackId ? `${this.racksUrl}/${rackId}` : this.racksUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRackEndpoint(rackId));
    //        });
    //}

    //getNewRackEndpoint<T>(rackObject: any): Observable<T> {

    //    return this.http.post(this.racksUrl, JSON.stringify(rackObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewRackEndpoint(rackObject));
    //        });
    //}

    //getUpdateRackEndpoint<T>(rackObject: any, rackId?: string): Observable<T> {
    //    let endpointUrl = rackId ? `${this.racksUrl}/${rackId}` : this.racksUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(rackObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateRackEndpoint(rackObject, rackId));
    //        });
    //}

    //getRackByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.racksUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getRackByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteRackEndpoint<T>(rackId: string): Observable<T> {
    //    let endpointUrl = `${this.racksUrl}/${rackId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteRackEndpoint(rackId));
    //        });
    //}

    ///* Level Endpoints */
    //getLevelsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.levelsUrl}/${page}/${pageSize}` : this.levelsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getLevelsEndpoint(page, pageSize));
    //        });
    //}

    //getLevelEndpoint<T>(levelId?: string): Observable<T> {
    //    let endpointUrl = levelId ? `${this.levelsUrl}/${levelId}` : this.levelsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getLevelEndpoint(levelId));
    //        });
    //}

    //getNewLevelEndpoint<T>(levelObject: any): Observable<T> {

    //    return this.http.post(this.levelsUrl, JSON.stringify(levelObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewLevelEndpoint(levelObject));
    //        });
    //}

    //getUpdateLevelEndpoint<T>(levelObject: any, levelId?: string): Observable<T> {
    //    let endpointUrl = levelId ? `${this.levelsUrl}/${levelId}` : this.levelsUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(levelObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateLevelEndpoint(levelObject, levelId));
    //        });
    //}

    //getLevelByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.levelsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getLevelByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteLevelEndpoint<T>(levelId: string): Observable<T> {
    //    let endpointUrl = `${this.levelsUrl}/${levelId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteLevelEndpoint(levelId));
    //        });
    //}



    ///* SpecimenContainer Endpoints */
    //getSpecimenContainersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.specimenContainersUrl}/${page}/${pageSize}` : this.specimenContainersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSpecimenContainersEndpoint(page, pageSize));
    //        });
    //}

    //getSpecimenContainerEndpoint<T>(specimenContainerId?: string): Observable<T> {
    //    let endpointUrl = specimenContainerId ? `${this.specimenContainersUrl}/${specimenContainerId}` : this.specimenContainersUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSpecimenContainerEndpoint(specimenContainerId));
    //        });
    //}

    //getNewSpecimenContainerEndpoint<T>(specimenContainerObject: any): Observable<T> {

    //    return this.http.post(this.specimenContainersUrl, JSON.stringify(specimenContainerObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewSpecimenContainerEndpoint(specimenContainerObject));
    //        });
    //}

    //getUpdateSpecimenContainerEndpoint<T>(specimenContainerObject: any, specimenContainerId?: string): Observable<T> {
    //    let endpointUrl = specimenContainerId ? `${this.specimenContainersUrl}/${specimenContainerId}` : this.specimenContainersUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(specimenContainerObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateSpecimenContainerEndpoint(specimenContainerObject, specimenContainerId));
    //        });
    //}

    //getSpecimenContainerByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.specimenContainersUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSpecimenContainerByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteSpecimenContainerEndpoint<T>(specimenContainerId: string): Observable<T> {
    //    let endpointUrl = `${this.specimenContainersUrl}/${specimenContainerId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteSpecimenContainerEndpoint(specimenContainerId));
    //        });
    //}

    ///* EthnicitySubCategory Endpoints */
    //getEthnicitySubCategoriesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.ethnicitySubCategoriesUrl}/${page}/${pageSize}` : this.ethnicitySubCategoriesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getEthnicitySubCategoriesEndpoint(page, pageSize));
    //        });
    //}

    //getEthnicitySubCategoryEndpoint<T>(ethnicitySubCategoryId?: string): Observable<T> {
    //    let endpointUrl = ethnicitySubCategoryId ? `${this.ethnicitySubCategoriesUrl}/${ethnicitySubCategoryId}` : this.ethnicitySubCategoriesUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getEthnicitySubCategoryEndpoint(ethnicitySubCategoryId));
    //        });
    //}

    //getNewEthnicitySubCategoryEndpoint<T>(ethnicitySubCategoryObject: any): Observable<T> {

    //    return this.http.post(this.ethnicitySubCategoriesUrl, JSON.stringify(ethnicitySubCategoryObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewEthnicitySubCategoryEndpoint(ethnicitySubCategoryObject));
    //        });
    //}

    //getUpdateEthnicitySubCategoryEndpoint<T>(ethnicitySubCategoryObject: any, ethnicitySubCategoryId?: string): Observable<T> {
    //    let endpointUrl = ethnicitySubCategoryId ? `${this.ethnicitySubCategoriesUrl}/${ethnicitySubCategoryId}` : this.ethnicitySubCategoriesUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(ethnicitySubCategoryObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateEthnicitySubCategoryEndpoint(ethnicitySubCategoryObject, ethnicitySubCategoryId));
    //        });
    //}

    //getEthnicitySubCategoryByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.ethnicitySubCategoriesUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getEthnicitySubCategoryByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteEthnicitySubCategoryEndpoint<T>(ethnicitySubCategoryId: string): Observable<T> {
    //    let endpointUrl = `${this.ethnicitySubCategoriesUrl}/${ethnicitySubCategoryId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteEthnicitySubCategoryEndpoint(ethnicitySubCategoryId));
    //        });
    //}

    ///* ConsVersion Endpoints */
    //getConsVersionsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.consVersionsUrl}/${page}/${pageSize}` : this.consVersionsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getConsVersionsEndpoint(page, pageSize));
    //        });
    //}

    //getConsVersionEndpoint<T>(consVersionId?: string): Observable<T> {
    //    let endpointUrl = consVersionId ? `${this.consVersionsUrl}/${consVersionId}` : this.consVersionsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getConsVersionEndpoint(consVersionId));
    //        });
    //}

    //getNewConsVersionEndpoint<T>(consVersionObject: any): Observable<T> {

    //    return this.http.post(this.consVersionsUrl, JSON.stringify(consVersionObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewConsVersionEndpoint(consVersionObject));
    //        });
    //}

    //getUpdateConsVersionEndpoint<T>(consVersionObject: any, consVersionId?: string): Observable<T> {
    //    let endpointUrl = consVersionId ? `${this.consVersionsUrl}/${consVersionId}` : this.consVersionsUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(consVersionObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateConsVersionEndpoint(consVersionObject, consVersionId));
    //        });
    //}

    //getConsVersionByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.consVersionsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getConsVersionByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteConsVersionEndpoint<T>(consVersionId: string): Observable<T> {
    //    let endpointUrl = `${this.consVersionsUrl}/${consVersionId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteConsVersionEndpoint(consVersionId));
    //        });
    //}

    ///* ConsDenyReason Endpoints */
    //getConsDenyReasonsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    //    let endpointUrl = page && pageSize ? `${this.consDenyReasonsUrl}/${page}/${pageSize}` : this.consDenyReasonsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getConsDenyReasonsEndpoint(page, pageSize));
    //        });
    //}

    //getConsDenyReasonEndpoint<T>(consDenyReasonId?: string): Observable<T> {
    //    let endpointUrl = consDenyReasonId ? `${this.consDenyReasonsUrl}/${consDenyReasonId}` : this.consDenyReasonsUrl;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getConsDenyReasonEndpoint(consDenyReasonId));
    //        });
    //}

    //getNewConsDenyReasonEndpoint<T>(consDenyReasonObject: any): Observable<T> {

    //    return this.http.post(this.consDenyReasonsUrl, JSON.stringify(consDenyReasonObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getNewConsDenyReasonEndpoint(consDenyReasonObject));
    //        });
    //}

    //getUpdateConsDenyReasonEndpoint<T>(consDenyReasonObject: any, consDenyReasonId?: string): Observable<T> {
    //    let endpointUrl = consDenyReasonId ? `${this.consDenyReasonsUrl}/${consDenyReasonId}` : this.consDenyReasonsUrl;

    //    return this.http.put(endpointUrl, JSON.stringify(consDenyReasonObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getUpdateConsDenyReasonEndpoint(consDenyReasonObject, consDenyReasonId));
    //        });
    //}

    //getConsDenyReasonByDescriptionEndpoint<T>(description: string): Observable<T> {
    //    let endpointUrl = `${this.consDenyReasonsUrl}/${description}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getConsDenyReasonByDescriptionEndpoint(description));
    //        });
    //}

    //getDeleteConsDenyReasonEndpoint<T>(consDenyReasonId: string): Observable<T> {
    //    let endpointUrl = `${this.consDenyReasonsUrl}/${consDenyReasonId}`;

    //    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getDeleteConsDenyReasonEndpoint(consDenyReasonId));
    //        });
    //}

    //getSaveDiagnosisEndpoint<T>(diagnosis: string): Observable<T> {
    //    let endpointUrl = this._saveDiagnosisUrl;

    //    return this.http.post<T>(endpointUrl, JSON.stringify(diagnosis), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getSaveDiagnosisEndpoint(diagnosis));
    //        });
    //}
}
