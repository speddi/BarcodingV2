import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

//import 'rxjs/add/observable/forkJoin';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/map';

import { MaintenanceEndpoint } from './maintenance-endpoint.service';
import { AuthService } from './auth.service';
//import { Status } from '../models/maintenance/status.model';
//import { StatusEdit } from '../models/maintenance/status-edit.model';
//import { Race } from '../models/maintenance/race.model';
//import { RaceEdit } from '../models/maintenance/race-edit.model';
//import { RaceSubCategory } from '../models/maintenance/racesubcategory.model';
//import { RaceSubCategoryEdit } from '../models/maintenance/racesubcategory-edit.model';
//import { Gender } from '../models/maintenance/gender.model';
//import { GenderEdit } from '../models/maintenance/gender-edit.model';
//import { Ethnicity } from '../models/maintenance/ethnicity.model';
//import { EthnicityEdit } from '../models/maintenance/ethnicity-edit.model';
//import { EthnicitySubCategory } from '../models/maintenance/ethnicitysubcategory.model';
//import { EthnicitySubCategoryEdit } from '../models/maintenance/ethnicitysubcategory-edit.model';
//import { Hospital } from '../models/maintenance/hospital.model';
//import { HospitalEdit } from '../models/maintenance/hospital-edit.model';

import { AgeModifier } from '../models/maintenance/agemodifier.model';
import { AgeModifierEdit } from '../models/maintenance/agemodifier-edit.model';
//import { mergeMap } from 'rxjs';
//import { AmountSizeType } from '../models/maintenance/amountsizetype.model';
//import { AmountSizeTypeEdit } from '../models/maintenance/amountsizetype-edit.model';
//import { ProcedureType } from '../models/maintenance/proceduretype.model';
//import { ProcedureTypeEdit } from '../models/maintenance/proceduretype-edit.model';
//import { TissueArea } from '../models/maintenance/tissuearea.model';
//import { TissueAreaEdit } from '../models/maintenance/tissuearea-edit.model';
//import { ShipmentStatus } from '../models/maintenance/shipmentstatus.model';
//import { ShipmentStatusEdit } from '../models/maintenance/shipmentstatus-edit.model';
//import { FreezerLocation } from '../models/maintenance/freezerlocation.model';
//import { FreezerLocationEdit } from '../models/maintenance/freezerlocation-edit.model';
//import { Preparation } from '../models/maintenance/preparation.model';
//import { PreparationEdit } from '../models/maintenance/preparation-edit.model';
//import { PreparationDetail } from '../models/maintenance/preparationdetail.model';
//import { PreparationDetailEdit } from '../models/maintenance/preparationdetail-edit.model';
//import { Investigator } from '../models/maintenance/investigator.model';
//import { InvestigatorEdit } from '../models/maintenance/investigator-edit.model';
//import { InvestigatorRequest } from '../models/maintenance/investigatorrequest.model';
//import { InvestigatorRequestEdit } from '../models/maintenance/investigatorrequest-edit.model';

//import { AnatomicSite } from '../models/maintenance/anatomicsite.model';
//import { AnatomicSiteEdit } from '../models/maintenance/anatomicsite-edit.model';
//import { TissueType } from '../models/maintenance/tissuetype.model';
//import { TissueTypeEdit } from '../models/maintenance/tissuetype-edit.model';
//import { Diagnosis } from '../models/maintenance/diagnosis.model';
//import { DiagnosisEdit } from '../models/maintenance/diagnosis-edit.model';
//import { DiagnosisSubClass } from '../models/maintenance/diagnosissubclass.model';
//import { DiagnosisSubClassEdit } from '../models/maintenance/diagnosissubclass-edit.model';
//import { DiagnosisModifier } from '../models/maintenance/diagnosismodifier.model';
//import { DiagnosisModifierEdit } from '../models/maintenance/diagnosismodifier-edit.model';
//import { MetastaticSite } from '../models/maintenance/metastaticsite.model';
//import { MetastaticSiteEdit } from '../models/maintenance/metastaticsite-edit.model';

//import { SampleSequencePartOne } from '../models/maintenance/samplesequencepartone.model';
//import { SampleSequencePartOneEdit } from '../models/maintenance/samplesequencepartone-edit.model';

//import { SampleSequencePartTwo } from '../models/maintenance/samplesequenceparttwo.model';
//import { SampleSequencePartTwoEdit } from '../models/maintenance/samplesequenceparttwo-edit.model';

//import { Protocol } from '../models/maintenance/protocol.model';
//import { ProtocolEdit } from '../models/maintenance/protocol-edit.model';
//import { Freezer } from '../models/maintenance/freezer.model';
//import { FreezerEdit } from '../models/maintenance/freezer-edit.model';
//import { Rack } from '../models/maintenance/rack.model';
//import { RackEdit } from '../models/maintenance/rack-edit.model';
//import { Level } from '../models/maintenance/level.model';
//import { LevelEdit } from '../models/maintenance/level-edit.model';
//import { SpecimenContainer } from '../models/maintenance/specimencontainer.model';
//import { SpecimenContainerEdit } from '../models/maintenance/specimencontainer-edit.model';

//import { ConsVersion } from '../models/maintenance/consversion.model';
//import { ConsVersionEdit } from '../models/maintenance/consversion-edit.model';
//import { ConsDenyReason } from '../models/maintenance/consdenyreason.model';
//import { ConsDenyReasonEdit } from '../models/maintenance/consdenyreason-edit.model';

@Injectable()
export class MaintenanceService {

    constructor(private router: Router, private http: HttpClient, private authService: AuthService,
        private maintenanceEndpoint: MaintenanceEndpoint) {

    }

    //getStatuses(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getStatusesEndpoint<Status[]>(page, pageSize);
    //}

    //getStatus(statusId?: string) {

    //    return this.maintenanceEndpoint.getStatusEndpoint<Status>(statusId);
    //}

    //newStatus(status: StatusEdit) {
    //    return this.maintenanceEndpoint.getNewStatusEndpoint<Status>(status);
    //}

    //updateStatus(status: StatusEdit) {
    //    if (status.id) {
    //        return this.maintenanceEndpoint.getUpdateStatusEndpoint(status, status.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getStatusByDescriptionEndpoint<Status>(status.description)
    //            .mergeMap(foundStatus => {
    //                status.id = foundStatus.id;
    //                return this.maintenanceEndpoint.getUpdateStatusEndpoint(status, status.id)
    //            });
    //    }
    //}

    //deleteStatus(statusOrStatusId: string | StatusEdit): Observable<Status> {

    //    if (typeof statusOrStatusId === 'string' || statusOrStatusId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteStatusEndpoint<Status>(<string>statusOrStatusId);
    //    }
    //    else {

    //        if (statusOrStatusId.id) {
    //            return this.deleteStatus(statusOrStatusId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getStatusByDescriptionEndpoint<Status>(statusOrStatusId.description)
    //                .mergeMap(status => this.deleteStatus(status.id));
    //        }
    //    }
    //}

    //getRaces(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getRacesEndpoint<Race[]>(page, pageSize);
    //}

    //getRace(raceId?: string) {

    //    return this.maintenanceEndpoint.getRaceEndpoint<Race>(raceId);
    //}

    //newRace(race: RaceEdit) {
    //    return this.maintenanceEndpoint.getNewRaceEndpoint<Race>(race);
    //}

    //updateRace(race: RaceEdit) {
    //    if (race.id) {
    //        return this.maintenanceEndpoint.getUpdateRaceEndpoint(race, race.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getRaceByDescriptionEndpoint<Race>(race.description)
    //            .mergeMap(foundRace => {
    //                race.id = foundRace.id;
    //                return this.maintenanceEndpoint.getUpdateRaceEndpoint(race, race.id)
    //            });
    //    }
    //}

    //deleteRace(raceOrRaceId: string | RaceEdit): Observable<Race> {

    //    if (typeof raceOrRaceId === 'string' || raceOrRaceId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteRaceEndpoint<Race>(<string>raceOrRaceId);
    //    }
    //    else {

    //        if (raceOrRaceId.id) {
    //            return this.deleteRace(raceOrRaceId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getRaceByDescriptionEndpoint<Race>(raceOrRaceId.description)
    //                .mergeMap(race => this.deleteRace(race.id));
    //        }
    //    }
    //}

    //getRaceSubCategories(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getRaceSubCategoriesEndpoint<RaceSubCategory[]>(page, pageSize);
    //}

    //getRaceSubCategory(raceSubCategoryId?: string) {

    //    return this.maintenanceEndpoint.getRaceSubCategoryEndpoint<RaceSubCategory>(raceSubCategoryId);
    //}

    //newRaceSubCategory(raceSubCategory: RaceSubCategoryEdit) {
    //    return this.maintenanceEndpoint.getNewRaceSubCategoryEndpoint<RaceSubCategory>(raceSubCategory);
    //}

    //updateRaceSubCategory(raceSubCategory: RaceSubCategoryEdit) {
    //    if (raceSubCategory.id) {
    //        return this.maintenanceEndpoint.getUpdateRaceSubCategoryEndpoint(raceSubCategory, raceSubCategory.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getRaceSubCategoryByDescriptionEndpoint<RaceSubCategory>(raceSubCategory.description)
    //            .mergeMap(foundRaceSubCategory => {
    //                raceSubCategory.id = foundRaceSubCategory.id;
    //                return this.maintenanceEndpoint.getUpdateRaceSubCategoryEndpoint(raceSubCategory, raceSubCategory.id)
    //            });
    //    }
    //}

    //deleteRaceSubCategory(raceSubCategoryOrRaceSubCategoryId: string | RaceSubCategoryEdit): Observable<RaceSubCategory> {

    //    if (typeof raceSubCategoryOrRaceSubCategoryId === 'string' || raceSubCategoryOrRaceSubCategoryId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteRaceSubCategoryEndpoint<RaceSubCategory>(<string>raceSubCategoryOrRaceSubCategoryId);
    //    }
    //    else {

    //        if (raceSubCategoryOrRaceSubCategoryId.id) {
    //            return this.deleteRaceSubCategory(raceSubCategoryOrRaceSubCategoryId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getRaceSubCategoryByDescriptionEndpoint<RaceSubCategory>(raceSubCategoryOrRaceSubCategoryId.description)
    //                .mergeMap(raceSubCategory => this.deleteRaceSubCategory(raceSubCategory.id));
    //        }
    //    }
    //}

    //getGenders(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getGendersEndpoint<Gender[]>(page, pageSize);
    //}

    //getGender(genderId?: string) {

    //    return this.maintenanceEndpoint.getGenderEndpoint<Gender>(genderId);
    //}

    //newGender(gender: GenderEdit) {
    //    return this.maintenanceEndpoint.getNewGenderEndpoint<Gender>(gender);
    //}

    //updateGender(gender: GenderEdit) {
    //    if (gender.id) {
    //        return this.maintenanceEndpoint.getUpdateGenderEndpoint(gender, gender.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getGenderByDescriptionEndpoint<Gender>(gender.description)
    //            .mergeMap(foundGender => {
    //                gender.id = foundGender.id;
    //                return this.maintenanceEndpoint.getUpdateGenderEndpoint(gender, gender.id)
    //            });
    //    }
    //}

    //deleteGender(genderOrGenderId: string | GenderEdit): Observable<Gender> {

    //    if (typeof genderOrGenderId === 'string' || genderOrGenderId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteGenderEndpoint<Gender>(<string>genderOrGenderId);
    //    }
    //    else {

    //        if (genderOrGenderId.id) {
    //            return this.deleteGender(genderOrGenderId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getGenderByDescriptionEndpoint<Gender>(genderOrGenderId.description)
    //                .mergeMap(gender => this.deleteGender(gender.id));
    //        }
    //    }
    //}

    //getEthnicities(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getEthnicitiesEndpoint<Ethnicity[]>(page, pageSize);
    //}

    //getEthnicity(ethnicityId?: string) {

    //    return this.maintenanceEndpoint.getEthnicityEndpoint<Ethnicity>(ethnicityId);
    //}

    //newEthnicity(ethnicity: EthnicityEdit) {
    //    return this.maintenanceEndpoint.getNewEthnicityEndpoint<Ethnicity>(ethnicity);
    //}

    //updateEthnicity(ethnicity: EthnicityEdit) {
    //    if (ethnicity.id) {
    //        return this.maintenanceEndpoint.getUpdateEthnicityEndpoint(ethnicity, ethnicity.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getEthnicityByDescriptionEndpoint<Ethnicity>(ethnicity.description)
    //            .mergeMap(foundEthnicity => {
    //                ethnicity.id = foundEthnicity.id;
    //                return this.maintenanceEndpoint.getUpdateEthnicityEndpoint(ethnicity, ethnicity.id)
    //            });
    //    }
    //}

    //deleteEthnicity(ethnicityOrEthnicityId: string | EthnicityEdit): Observable<Ethnicity> {

    //    if (typeof ethnicityOrEthnicityId === 'string' || ethnicityOrEthnicityId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteEthnicityEndpoint<Ethnicity>(<string>ethnicityOrEthnicityId);
    //    }
    //    else {

    //        if (ethnicityOrEthnicityId.id) {
    //            return this.deleteEthnicity(ethnicityOrEthnicityId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getEthnicityByDescriptionEndpoint<Ethnicity>(ethnicityOrEthnicityId.description)
    //                .mergeMap(ethnicity => this.deleteEthnicity(ethnicity.id));
    //        }
    //    }
    //}

    //getHospitals(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getHospitalsEndpoint<Hospital[]>(page, pageSize);
    //}

    //getHospital(hospitalId?: string) {

    //    return this.maintenanceEndpoint.getHospitalEndpoint<Hospital>(hospitalId);
    //}

    //newHospital(hospital: HospitalEdit) {
    //    return this.maintenanceEndpoint.getNewHospitalEndpoint<Hospital>(hospital);
    //}

    //updateHospital(hospital: HospitalEdit) {
    //    if (hospital.id) {
    //        return this.maintenanceEndpoint.getUpdateHospitalEndpoint(hospital, hospital.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getHospitalByDescriptionEndpoint<Hospital>(hospital.description)
    //            .mergeMap(foundHospital => {
    //                hospital.id = foundHospital.id;
    //                return this.maintenanceEndpoint.getUpdateHospitalEndpoint(hospital, hospital.id)
    //            });
    //    }
    //}

    //deleteHospital(hospitalOrHospitalId: string | HospitalEdit): Observable<Hospital> {

    //    if (typeof hospitalOrHospitalId === 'string' || hospitalOrHospitalId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteHospitalEndpoint<Hospital>(<string>hospitalOrHospitalId);
    //    }
    //    else {

    //        if (hospitalOrHospitalId.id) {
    //            return this.deleteHospital(hospitalOrHospitalId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getHospitalByDescriptionEndpoint<Hospital>(hospitalOrHospitalId.description)
    //                .mergeMap(hospital => this.deleteHospital(hospital.id));
    //        }
    //    }
    //}

    getAgeModifiers(page?: number, pageSize?: number) {

        return this.maintenanceEndpoint.getAgeModifiersEndpoint<AgeModifier[]>(page, pageSize);
    }

    getAgeModifier(ageModifierId?: string) {

        return this.maintenanceEndpoint.getAgeModifierEndpoint<AgeModifier>(ageModifierId);
    }

    newAgeModifier(ageModifier: AgeModifierEdit) {
        return this.maintenanceEndpoint.getNewAgeModifierEndpoint<AgeModifier>(ageModifier);
    }

    updateAgeModifier(ageModifier: AgeModifierEdit) {
        if (ageModifier.id) {
            return this.maintenanceEndpoint.getUpdateAgeModifierEndpoint(ageModifier, ageModifier.id);
        }
        else {
          return this.maintenanceEndpoint.getAgeModifierByDescriptionEndpoint<AgeModifier>(ageModifier.description).pipe(
                mergeMap(foundAgeModifier => {
                  ageModifier.id = foundAgeModifier.id;
                  return this.maintenanceEndpoint.getUpdateAgeModifierEndpoint(ageModifier, ageModifier.id)
                }));
        }
    }

    deleteAgeModifier(ageModifierOrAgeModifierId?: string | AgeModifierEdit): Observable<AgeModifier> {

        if (typeof ageModifierOrAgeModifierId === 'string' || ageModifierOrAgeModifierId instanceof String) {
            return this.maintenanceEndpoint.getDeleteAgeModifierEndpoint<AgeModifier>(<string>ageModifierOrAgeModifierId);
        }
        else {

            if (ageModifierOrAgeModifierId?.id) {
                return this.deleteAgeModifier(ageModifierOrAgeModifierId.id.toString());
            }
            else {
              return this.maintenanceEndpoint.getAgeModifierByDescriptionEndpoint<AgeModifier>(ageModifierOrAgeModifierId?.description).pipe(
                  mergeMap(ageModifier => this.deleteAgeModifier(ageModifier.id))
                );
            }
        }
    }

    //getAmountSizeTypes(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getAmountSizeTypesEndpoint<AmountSizeType[]>(page, pageSize);
    //}

    //getAmountSizeType(amountSizeTypeId?: string) {

    //    return this.maintenanceEndpoint.getAmountSizeTypeEndpoint<AmountSizeType>(amountSizeTypeId);
    //}

    //newAmountSizeType(amountSizeType: AmountSizeTypeEdit) {
    //    return this.maintenanceEndpoint.getNewAmountSizeTypeEndpoint<AmountSizeType>(amountSizeType);
    //}

    //updateAmountSizeType(amountSizeType: AmountSizeTypeEdit) {
    //    if (amountSizeType.id) {
    //        return this.maintenanceEndpoint.getUpdateAmountSizeTypeEndpoint(amountSizeType, amountSizeType.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getAmountSizeTypeByDescriptionEndpoint<AmountSizeType>(amountSizeType.description)
    //            .mergeMap(foundAmountSizeType => {
    //                amountSizeType.id = foundAmountSizeType.id;
    //                return this.maintenanceEndpoint.getUpdateAmountSizeTypeEndpoint(amountSizeType, amountSizeType.id)
    //            });
    //    }
    //}

    //deleteAmountSizeType(amountSizeTypeOrAmountSizeTypeId: string | AmountSizeTypeEdit): Observable<AmountSizeType> {

    //    if (typeof amountSizeTypeOrAmountSizeTypeId === 'string' || amountSizeTypeOrAmountSizeTypeId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteAmountSizeTypeEndpoint<AmountSizeType>(<string>amountSizeTypeOrAmountSizeTypeId);
    //    }
    //    else {

    //        if (amountSizeTypeOrAmountSizeTypeId.id) {
    //            return this.deleteAmountSizeType(amountSizeTypeOrAmountSizeTypeId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getAmountSizeTypeByDescriptionEndpoint<AmountSizeType>(amountSizeTypeOrAmountSizeTypeId.description)
    //                .mergeMap(amountSizeType => this.deleteAmountSizeType(amountSizeType.id));
    //        }
    //    }
    //}

    //getProcedureTypes(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getProcedureTypesEndpoint<ProcedureType[]>(page, pageSize);
    //}

    //getLegacyProcedureTypes(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getLegacyProcedureTypesEndpoint<ProcedureType[]>(page, pageSize);
    //}

    //getProcedureType(procedureTypeId?: string) {

    //    return this.maintenanceEndpoint.getProcedureTypeEndpoint<ProcedureType>(procedureTypeId);
    //}

    //newProcedureType(procedureType: ProcedureTypeEdit) {
    //    return this.maintenanceEndpoint.getNewProcedureTypeEndpoint<ProcedureType>(procedureType);
    //}

    //updateProcedureType(procedureType: ProcedureTypeEdit) {
    //    if (procedureType.id) {
    //        return this.maintenanceEndpoint.getUpdateProcedureTypeEndpoint(procedureType, procedureType.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getProcedureTypeByDescriptionEndpoint<ProcedureType>(procedureType.description)
    //            .mergeMap(foundProcedureType => {
    //                procedureType.id = foundProcedureType.id;
    //                return this.maintenanceEndpoint.getUpdateProcedureTypeEndpoint(procedureType, procedureType.id)
    //            });
    //    }
    //}

    //deleteProcedureType(procedureTypeOrProcedureTypeId: string | ProcedureTypeEdit): Observable<ProcedureType> {

    //    if (typeof procedureTypeOrProcedureTypeId === 'string' || procedureTypeOrProcedureTypeId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteProcedureTypeEndpoint<ProcedureType>(<string>procedureTypeOrProcedureTypeId);
    //    }
    //    else {

    //        if (procedureTypeOrProcedureTypeId.id) {
    //            return this.deleteProcedureType(procedureTypeOrProcedureTypeId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getProcedureTypeByDescriptionEndpoint<ProcedureType>(procedureTypeOrProcedureTypeId.description)
    //                .mergeMap(procedureType => this.deleteProcedureType(procedureType.id));
    //        }
    //    }
    //}

    //getTissueAreas(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getTissueAreasEndpoint<TissueArea[]>(page, pageSize);
    //}

    //getTissueArea(tissueAreaId?: string) {

    //    return this.maintenanceEndpoint.getTissueAreaEndpoint<TissueArea>(tissueAreaId);
    //}

    //newTissueArea(tissueArea: TissueAreaEdit) {
    //    return this.maintenanceEndpoint.getNewTissueAreaEndpoint<TissueArea>(tissueArea);
    //}

    //updateTissueArea(tissueArea: TissueAreaEdit) {
    //    if (tissueArea.id) {
    //        return this.maintenanceEndpoint.getUpdateTissueAreaEndpoint(tissueArea, tissueArea.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getTissueAreaByDescriptionEndpoint<TissueArea>(tissueArea.description)
    //            .mergeMap(foundTissueArea => {
    //                tissueArea.id = foundTissueArea.id;
    //                return this.maintenanceEndpoint.getUpdateTissueAreaEndpoint(tissueArea, tissueArea.id)
    //            });
    //    }
    //}

    //deleteTissueArea(tissueAreaOrTissueAreaId: string | TissueAreaEdit): Observable<TissueArea> {

    //    if (typeof tissueAreaOrTissueAreaId === 'string' || tissueAreaOrTissueAreaId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteTissueAreaEndpoint<TissueArea>(<string>tissueAreaOrTissueAreaId);
    //    }
    //    else {

    //        if (tissueAreaOrTissueAreaId.id) {
    //            return this.deleteTissueArea(tissueAreaOrTissueAreaId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getTissueAreaByDescriptionEndpoint<TissueArea>(tissueAreaOrTissueAreaId.description)
    //                .mergeMap(tissueArea => this.deleteTissueArea(tissueArea.id));
    //        }
    //    }
    //}

    //getShipmentStatuses(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getShipmentStatusesEndpoint<ShipmentStatus[]>(page, pageSize);
    //}

    //getShipmentStatus(shipmentStatusId?: string) {

    //    return this.maintenanceEndpoint.getShipmentStatusEndpoint<ShipmentStatus>(shipmentStatusId);
    //}

    //newShipmentStatus(shipmentStatus: ShipmentStatusEdit) {
    //    return this.maintenanceEndpoint.getNewShipmentStatusEndpoint<ShipmentStatus>(shipmentStatus);
    //}

    //updateShipmentStatus(shipmentStatus: ShipmentStatusEdit) {
    //    if (shipmentStatus.id) {
    //        return this.maintenanceEndpoint.getUpdateShipmentStatusEndpoint(shipmentStatus, shipmentStatus.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getShipmentStatusByDescriptionEndpoint<ShipmentStatus>(shipmentStatus.description)
    //            .mergeMap(foundShipmentStatus => {
    //                shipmentStatus.id = foundShipmentStatus.id;
    //                return this.maintenanceEndpoint.getUpdateShipmentStatusEndpoint(shipmentStatus, shipmentStatus.id)
    //            });
    //    }
    //}

    //deleteShipmentStatus(shipmentStatusOrShipmentStatusId: string | ShipmentStatusEdit): Observable<ShipmentStatus> {

    //    if (typeof shipmentStatusOrShipmentStatusId === 'string' || shipmentStatusOrShipmentStatusId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteShipmentStatusEndpoint<ShipmentStatus>(<string>shipmentStatusOrShipmentStatusId);
    //    }
    //    else {

    //        if (shipmentStatusOrShipmentStatusId.id) {
    //            return this.deleteShipmentStatus(shipmentStatusOrShipmentStatusId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getShipmentStatusByDescriptionEndpoint<ShipmentStatus>(shipmentStatusOrShipmentStatusId.description)
    //                .mergeMap(shipmentStatus => this.deleteShipmentStatus(shipmentStatus.id));
    //        }
    //    }
    //}

    //getPreparations(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getPreparationsEndpoint<Preparation[]>(page, pageSize);
    //}

    //getPreparation(preparationId?: string) {

    //    return this.maintenanceEndpoint.getPreparationEndpoint<Preparation>(preparationId);
    //}

    //newPreparation(preparation: PreparationEdit) {
    //    return this.maintenanceEndpoint.getNewPreparationEndpoint<Preparation>(preparation);
    //}

    //updatePreparation(preparation: PreparationEdit) {
    //    if (preparation.id) {
    //        return this.maintenanceEndpoint.getUpdatePreparationEndpoint(preparation, preparation.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getPreparationByDescriptionEndpoint<Preparation>(preparation.description)
    //            .mergeMap(foundPreparation => {
    //                preparation.id = foundPreparation.id;
    //                return this.maintenanceEndpoint.getUpdatePreparationEndpoint(preparation, preparation.id)
    //            });
    //    }
    //}

    //deletePreparation(preparationOrPreparationId: string | PreparationEdit): Observable<Preparation> {

    //    if (typeof preparationOrPreparationId === 'string' || preparationOrPreparationId instanceof String) {
    //        return this.maintenanceEndpoint.getDeletePreparationEndpoint<Preparation>(<string>preparationOrPreparationId);
    //    }
    //    else {

    //        if (preparationOrPreparationId.id) {
    //            return this.deletePreparation(preparationOrPreparationId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getPreparationByDescriptionEndpoint<Preparation>(preparationOrPreparationId.description)
    //                .mergeMap(preparation => this.deletePreparation(preparation.id));
    //        }
    //    }
    //}

    //getPreparationDetails(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getPreparationDetailsEndpoint<PreparationDetail[]>(page, pageSize);
    //}

    //getPreparationDetail(preparationDetailId?: string) {

    //    return this.maintenanceEndpoint.getPreparationDetailEndpoint<PreparationDetail>(preparationDetailId);
    //}

    //newPreparationDetail(preparationDetail: PreparationDetailEdit) {
    //    return this.maintenanceEndpoint.getNewPreparationDetailEndpoint<PreparationDetail>(preparationDetail);
    //}

    //updatePreparationDetail(preparationDetail: PreparationDetailEdit) {
    //    if (preparationDetail.id) {
    //        return this.maintenanceEndpoint.getUpdatePreparationDetailEndpoint(preparationDetail, preparationDetail.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getPreparationDetailByDescriptionEndpoint<PreparationDetail>(preparationDetail.description)
    //            .mergeMap(foundPreparationDetail => {
    //                preparationDetail.id = foundPreparationDetail.id;
    //                return this.maintenanceEndpoint.getUpdatePreparationDetailEndpoint(preparationDetail, preparationDetail.id)
    //            });
    //    }
    //}

    //deletePreparationDetail(preparationDetailOrPreparationDetailId: string | PreparationDetailEdit): Observable<PreparationDetail> {

    //    if (typeof preparationDetailOrPreparationDetailId === 'string' || preparationDetailOrPreparationDetailId instanceof String) {
    //        return this.maintenanceEndpoint.getDeletePreparationDetailEndpoint<PreparationDetail>(<string>preparationDetailOrPreparationDetailId);
    //    }
    //    else {

    //        if (preparationDetailOrPreparationDetailId.id) {
    //            return this.deletePreparationDetail(preparationDetailOrPreparationDetailId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getPreparationDetailByDescriptionEndpoint<PreparationDetail>(preparationDetailOrPreparationDetailId.description)
    //                .mergeMap(preparationDetail => this.deletePreparationDetail(preparationDetail.id));
    //        }
    //    }
    //}

    //getInvestigators(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getInvestigatorsEndpoint<Investigator[]>(page, pageSize);
    //}

    //getLegacyInvestigators(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getlegacyInvestigatorsEndpoint<Investigator[]>(page, pageSize);
    //}

    //getInvestigator(investigatorId?: string) {

    //    return this.maintenanceEndpoint.getInvestigatorEndpoint<Investigator>(investigatorId);
    //}

    //newInvestigator(investigator: InvestigatorEdit) {
    //    return this.maintenanceEndpoint.getNewInvestigatorEndpoint<Investigator>(investigator);
    //}

    //updateInvestigator(investigator: InvestigatorEdit) {
    //    if (investigator.id) {
    //        return this.maintenanceEndpoint.getUpdateInvestigatorEndpoint(investigator, investigator.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getInvestigatorByCodeEndpoint<Investigator>(investigator.investigatorCode)
    //            .mergeMap(foundInvestigator => {
    //                investigator.id = foundInvestigator.id;
    //                return this.maintenanceEndpoint.getUpdateInvestigatorEndpoint(investigator, investigator.id)
    //            });
    //    }
    //}

    //deleteInvestigator(investigatorOrInvestigatorId: string | InvestigatorEdit): Observable<Investigator> {

    //    if (typeof investigatorOrInvestigatorId === 'string' || investigatorOrInvestigatorId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteInvestigatorEndpoint<Investigator>(<string>investigatorOrInvestigatorId);
    //    }
    //    else {

    //        if (investigatorOrInvestigatorId.id) {
    //            return this.deleteInvestigator(investigatorOrInvestigatorId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getInvestigatorByCodeEndpoint<Investigator>(investigatorOrInvestigatorId.investigatorCode)
    //                .mergeMap(investigator => this.deleteInvestigator(investigator.id));
    //        }
    //    }
    //}

    //getInvestigatorRequests(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getInvestigatorRequestsEndpoint<InvestigatorRequest>(page, pageSize);
    //}

    //getInvestigatorRequest(investigatorRequestId?: string) {

    //    return this.maintenanceEndpoint.getInvestigatorRequestEndpoint<InvestigatorRequest>(investigatorRequestId);
    //}

    //newInvestigatorRequest(investigatorRequest: InvestigatorRequestEdit) {
    //    return this.maintenanceEndpoint.getNewInvestigatorRequestEndpoint<InvestigatorRequest>(investigatorRequest);
    //}

    //updateInvestigatorRequest(investigatorRequest: InvestigatorRequestEdit) {
    //    if (investigatorRequest.id) {
    //        return this.maintenanceEndpoint.getUpdateInvestigatorRequestEndpoint(investigatorRequest, investigatorRequest.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getInvestigatorRequestByDescriptionEndpoint<InvestigatorRequest>(investigatorRequest.description)
    //            .mergeMap(foundInvestigatorRequest => {
    //                investigatorRequest.id = foundInvestigatorRequest.id;
    //                return this.maintenanceEndpoint.getUpdateInvestigatorRequestEndpoint(investigatorRequest, investigatorRequest.id)
    //            });
    //    }
    //}

    //deleteInvestigatorRequest(investigatorRequestOrInvestigatorRequestId: string | InvestigatorRequestEdit): Observable<InvestigatorRequest> {

    //    if (typeof investigatorRequestOrInvestigatorRequestId === 'string' || investigatorRequestOrInvestigatorRequestId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteInvestigatorRequestEndpoint<InvestigatorRequest>(<string>investigatorRequestOrInvestigatorRequestId);
    //    }
    //    else {

    //        if (investigatorRequestOrInvestigatorRequestId.id) {
    //            return this.deleteInvestigatorRequest(investigatorRequestOrInvestigatorRequestId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getInvestigatorRequestByDescriptionEndpoint<InvestigatorRequest>(investigatorRequestOrInvestigatorRequestId.description)
    //                .mergeMap(investigatorRequest => this.deleteInvestigatorRequest(investigatorRequest.id));
    //        }
    //    }
    //}

    //getAnatomicSites(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getAnatomicSitesEndpoint<AnatomicSite[]>(page, pageSize);
    //}

    //getMalignantAnatomicSites(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getMalignantAnatomicSitesEndpoint<AnatomicSite[]>(page, pageSize);
    //}

    //getNonMalignantAnatomicSites(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getNonMalignantAnatomicSitesEndpoint<AnatomicSite[]>(page, pageSize);
    //}

    //getAnatomicSite(anatomicSiteId?: string) {

    //    return this.maintenanceEndpoint.getAnatomicSiteEndpoint<AnatomicSite>(anatomicSiteId);
    //}

    //newAnatomicSite(anatomicSite: AnatomicSiteEdit) {
    //    return this.maintenanceEndpoint.getNewAnatomicSiteEndpoint<AnatomicSite>(anatomicSite);
    //}

    //updateAnatomicSite(anatomicSite: AnatomicSiteEdit) {
    //    if (anatomicSite.id) {
    //        return this.maintenanceEndpoint.getUpdateAnatomicSiteEndpoint(anatomicSite, anatomicSite.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getAnatomicSiteByDescriptionEndpoint<AnatomicSite>(anatomicSite.description)
    //            .mergeMap(foundAnatomicSite => {
    //                anatomicSite.id = foundAnatomicSite.id;
    //                return this.maintenanceEndpoint.getUpdateAnatomicSiteEndpoint(anatomicSite, anatomicSite.id)
    //            });
    //    }
    //}

    //deleteAnatomicSite(anatomicSiteOrAnatomicSiteId: string | AnatomicSiteEdit): Observable<AnatomicSite> {

    //    if (typeof anatomicSiteOrAnatomicSiteId === 'string' || anatomicSiteOrAnatomicSiteId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteAnatomicSiteEndpoint<AnatomicSite>(<string>anatomicSiteOrAnatomicSiteId);
    //    }
    //    else {

    //        if (anatomicSiteOrAnatomicSiteId.id) {
    //            return this.deleteAnatomicSite(anatomicSiteOrAnatomicSiteId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getAnatomicSiteByDescriptionEndpoint<AnatomicSite>(anatomicSiteOrAnatomicSiteId.description)
    //                .mergeMap(anatomicSite => this.deleteAnatomicSite(anatomicSite.id));
    //        }
    //    }
    //}

    //getTissueTypes(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getTissueTypesEndpoint<TissueType[]>(page, pageSize);
    //}

    //getTissueTypesByAnatomicSiteId(anatomicSiteId: number) {
    //    return this.maintenanceEndpoint.getTissueTypesByAnatomicSiteIdEndpoint<TissueType[]>(anatomicSiteId);
    //}

    //getTissueType(tissueTypeId?: string) {

    //    return this.maintenanceEndpoint.getTissueTypeEndpoint<TissueType>(tissueTypeId);
    //}

    //newTissueType(tissueType: TissueTypeEdit) {
    //    return this.maintenanceEndpoint.getNewTissueTypeEndpoint<TissueType>(tissueType);
    //}

    //updateTissueType(tissueType: TissueTypeEdit) {
    //    if (tissueType.id) {
    //        return this.maintenanceEndpoint.getUpdateTissueTypeEndpoint(tissueType, tissueType.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getTissueTypeByDescriptionEndpoint<TissueType>(tissueType.description)
    //            .mergeMap(foundTissueType => {
    //                tissueType.id = foundTissueType.id;
    //                return this.maintenanceEndpoint.getUpdateTissueTypeEndpoint(tissueType, tissueType.id)
    //            });
    //    }
    //}

    //deleteTissueType(tissueTypeOrTissueTypeId: string | TissueTypeEdit): Observable<TissueType> {

    //    if (typeof tissueTypeOrTissueTypeId === 'string' || tissueTypeOrTissueTypeId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteTissueTypeEndpoint<TissueType>(<string>tissueTypeOrTissueTypeId);
    //    }
    //    else {

    //        if (tissueTypeOrTissueTypeId.id) {
    //            return this.deleteTissueType(tissueTypeOrTissueTypeId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getTissueTypeByDescriptionEndpoint<TissueType>(tissueTypeOrTissueTypeId.description)
    //                .mergeMap(tissueType => this.deleteTissueType(tissueType.id));
    //        }
    //    }
    //}

    //getDiagnosises(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getDiagnosisesEndpoint<Diagnosis[]>(page, pageSize);
    //}

    //getDiagnosisesByTissueTypeId(tissueTypeId: string) {

    //    return this.maintenanceEndpoint.getDiagnosisesByTissueTypeIdEndpoint<Diagnosis[]>(tissueTypeId);
    //}

    //getDiagnosis(diagnosisId?: string) {

    //    return this.maintenanceEndpoint.getDiagnosisEndpoint<Diagnosis>(diagnosisId);
    //}

    //newDiagnosis(diagnosis: DiagnosisEdit) {
    //    return this.maintenanceEndpoint.getNewDiagnosisEndpoint<Diagnosis>(diagnosis);
    //}

    //updateDiagnosis(diagnosis: DiagnosisEdit) {
    //    if (diagnosis.id) {
    //        return this.maintenanceEndpoint.getUpdateDiagnosisEndpoint(diagnosis, diagnosis.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getDiagnosisByDescriptionEndpoint<Diagnosis>(diagnosis.description)
    //            .mergeMap(foundDiagnosis => {
    //                diagnosis.id = foundDiagnosis.id;
    //                return this.maintenanceEndpoint.getUpdateDiagnosisEndpoint(diagnosis, diagnosis.id)
    //            });
    //    }
    //}

    //deleteDiagnosis(diagnosisOrDiagnosisId: string | DiagnosisEdit): Observable<Diagnosis> {

    //    if (typeof diagnosisOrDiagnosisId === 'string' || diagnosisOrDiagnosisId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteDiagnosisEndpoint<Diagnosis>(<string>diagnosisOrDiagnosisId);
    //    }
    //    else {

    //        if (diagnosisOrDiagnosisId.id) {
    //            return this.deleteDiagnosis(diagnosisOrDiagnosisId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getDiagnosisByDescriptionEndpoint<Diagnosis>(diagnosisOrDiagnosisId.description)
    //                .mergeMap(diagnosis => this.deleteDiagnosis(diagnosis.id));
    //        }
    //    }
    //}

    //getDiagnosisSubClasses(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getDiagnosisSubClassesEndpoint<DiagnosisSubClass[]>(page, pageSize);
    //}

    //getDiagnosisSubClassesByDiagnosisId(diagnosisId: string) {

    //    return this.maintenanceEndpoint.getDiagnosisSubClassesByDiagnosisIdEndpoint<DiagnosisSubClass[]>(diagnosisId);
    //}

    //getDiagnosisSubClass(diagnosisSubClassId?: string) {

    //    return this.maintenanceEndpoint.getDiagnosisSubClassEndpoint<DiagnosisSubClass>(diagnosisSubClassId);
    //}

    //newDiagnosisSubClass(diagnosisSubClass: DiagnosisSubClassEdit) {
    //    return this.maintenanceEndpoint.getNewDiagnosisSubClassEndpoint<DiagnosisSubClass>(diagnosisSubClass);
    //}

    //updateDiagnosisSubClass(diagnosisSubClass: DiagnosisSubClassEdit) {
    //    if (diagnosisSubClass.id) {
    //        return this.maintenanceEndpoint.getUpdateDiagnosisSubClassEndpoint(diagnosisSubClass, diagnosisSubClass.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getDiagnosisSubClassByDescriptionEndpoint<DiagnosisSubClass>(diagnosisSubClass.description)
    //            .mergeMap(foundDiagnosisSubClass => {
    //                diagnosisSubClass.id = foundDiagnosisSubClass.id;
    //                return this.maintenanceEndpoint.getUpdateDiagnosisSubClassEndpoint(diagnosisSubClass, diagnosisSubClass.id)
    //            });
    //    }
    //}

    //deleteDiagnosisSubClass(diagnosisSubClassOrDiagnosisSubClassId: string | DiagnosisSubClassEdit): Observable<DiagnosisSubClass> {

    //    if (typeof diagnosisSubClassOrDiagnosisSubClassId === 'string' || diagnosisSubClassOrDiagnosisSubClassId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteDiagnosisSubClassEndpoint<DiagnosisSubClass>(<string>diagnosisSubClassOrDiagnosisSubClassId);
    //    }
    //    else {

    //        if (diagnosisSubClassOrDiagnosisSubClassId.id) {
    //            return this.deleteDiagnosisSubClass(diagnosisSubClassOrDiagnosisSubClassId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getDiagnosisSubClassByDescriptionEndpoint<DiagnosisSubClass>(diagnosisSubClassOrDiagnosisSubClassId.description)
    //                .mergeMap(diagnosisSubClass => this.deleteDiagnosisSubClass(diagnosisSubClass.id));
    //        }
    //    }
    //}

    //getDiagnosisModifiers(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getDiagnosisModifiersEndpoint<DiagnosisModifier[]>(page, pageSize);
    //}

    //getDiagnosisModifiersByDiagnosisSubClassId(diagnosisSubClassId: string) {

    //    return this.maintenanceEndpoint.getDiagnosisModifiersByDiagnosisSubClassIdEndpoint<DiagnosisModifier[]>(diagnosisSubClassId);
    //}

    //getDiagnosisModifier(diagnosisModifierId?: string) {

    //    return this.maintenanceEndpoint.getDiagnosisModifierEndpoint<DiagnosisModifier>(diagnosisModifierId);
    //}

    //newDiagnosisModifier(diagnosisModifier: DiagnosisModifierEdit) {
    //    return this.maintenanceEndpoint.getNewDiagnosisModifierEndpoint<DiagnosisModifier>(diagnosisModifier);
    //}

    //updateDiagnosisModifier(diagnosisModifier: DiagnosisModifierEdit) {
    //    if (diagnosisModifier.id) {
    //        return this.maintenanceEndpoint.getUpdateDiagnosisModifierEndpoint(diagnosisModifier, diagnosisModifier.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getDiagnosisModifierByDescriptionEndpoint<DiagnosisModifier>(diagnosisModifier.description)
    //            .mergeMap(foundDiagnosisModifier => {
    //                diagnosisModifier.id = foundDiagnosisModifier.id;
    //                return this.maintenanceEndpoint.getUpdateDiagnosisModifierEndpoint(diagnosisModifier, diagnosisModifier.id)
    //            });
    //    }
    //}

    //deleteDiagnosisModifier(diagnosisModifierOrDiagnosisModifierId: string | DiagnosisModifierEdit): Observable<DiagnosisModifier> {

    //    if (typeof diagnosisModifierOrDiagnosisModifierId === 'string' || diagnosisModifierOrDiagnosisModifierId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteDiagnosisModifierEndpoint<DiagnosisModifier>(<string>diagnosisModifierOrDiagnosisModifierId);
    //    }
    //    else {

    //        if (diagnosisModifierOrDiagnosisModifierId.id) {
    //            return this.deleteDiagnosisModifier(diagnosisModifierOrDiagnosisModifierId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getDiagnosisModifierByDescriptionEndpoint<DiagnosisModifier>(diagnosisModifierOrDiagnosisModifierId.description)
    //                .mergeMap(diagnosisModifier => this.deleteDiagnosisModifier(diagnosisModifier.id));
    //        }
    //    }
    //}

    //getMetastaticSites(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getMetastaticSitesEndpoint<MetastaticSite[]>(page, pageSize);
    //}

    //getMetastaticSite(metastaticSiteId?: string) {

    //    return this.maintenanceEndpoint.getMetastaticSiteEndpoint<MetastaticSite>(metastaticSiteId);
    //}

    //newMetastaticSite(metastaticSite: MetastaticSiteEdit) {
    //    return this.maintenanceEndpoint.getNewMetastaticSiteEndpoint<MetastaticSite>(metastaticSite);
    //}

    //updateMetastaticSite(metastaticSite: MetastaticSiteEdit) {
    //    if (metastaticSite.id) {
    //        return this.maintenanceEndpoint.getUpdateMetastaticSiteEndpoint(metastaticSite, metastaticSite.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getMetastaticSiteByDescriptionEndpoint<MetastaticSite>(metastaticSite.description)
    //            .mergeMap(foundMetastaticSite => {
    //                metastaticSite.id = foundMetastaticSite.id;
    //                return this.maintenanceEndpoint.getUpdateMetastaticSiteEndpoint(metastaticSite, metastaticSite.id)
    //            });
    //    }
    //}

    //deleteMetastaticSite(metastaticSiteOrMetastaticSiteId: string | MetastaticSiteEdit): Observable<MetastaticSite> {

    //    if (typeof metastaticSiteOrMetastaticSiteId === 'string' || metastaticSiteOrMetastaticSiteId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteMetastaticSiteEndpoint<MetastaticSite>(<string>metastaticSiteOrMetastaticSiteId);
    //    }
    //    else {

    //        if (metastaticSiteOrMetastaticSiteId.id) {
    //            return this.deleteMetastaticSite(metastaticSiteOrMetastaticSiteId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getMetastaticSiteByDescriptionEndpoint<MetastaticSite>(metastaticSiteOrMetastaticSiteId.description)
    //                .mergeMap(metastaticSite => this.deleteMetastaticSite(metastaticSite.id));
    //        }
    //    }
    //}

    //getSampleDiagnosisEntities(page?: number, pageSize?: number) {

    //    return Observable.forkJoin(
    //        this.maintenanceEndpoint.getMetastaticSitesEndpoint<MetastaticSite[]>(page, pageSize),
    //        this.maintenanceEndpoint.getAnatomicSitesEndpoint<AnatomicSite[]>(page, pageSize),
    //        this.maintenanceEndpoint.getTissueTypesEndpoint<TissueType[]>(page, pageSize),
    //        this.maintenanceEndpoint.getDiagnosisesEndpoint<Diagnosis[]>(page, pageSize),
    //        this.maintenanceEndpoint.getDiagnosisSubClassesEndpoint<DiagnosisSubClass[]>(page, pageSize),
    //        this.maintenanceEndpoint.getDiagnosisModifiersEndpoint<DiagnosisModifier[]>(page, pageSize)
    //    );
    //}

    //getSampleEntities(page?: number, pageSize?: number) {

    //    return Observable.forkJoin(
    //        this.maintenanceEndpoint.getProcedureTypesEndpoint<ProcedureType[]>(page, pageSize),
    //        this.maintenanceEndpoint.getAmountSizeTypesEndpoint<AmountSizeType[]>(page, pageSize),
    //        this.maintenanceEndpoint.getPreparationsEndpoint<Preparation[]>(page, pageSize),
    //        this.maintenanceEndpoint.getStatusesEndpoint<Status[]>(page, pageSize),
    //        this.maintenanceEndpoint.getInvestigatorsEndpoint<Investigator[]>(page, pageSize),
    //        this.maintenanceEndpoint.getTissueAreasEndpoint<TissueArea[]>(page, pageSize),
    //        this.maintenanceEndpoint.getAgeModifiersEndpoint<AgeModifier[]>(page, pageSize),
    //        this.maintenanceEndpoint.getSampleSequencePartOnesEndpoint<SampleSequencePartOne[]>(page, pageSize),
    //        this.maintenanceEndpoint.getSampleSequencePartTwosEndpoint<SampleSequencePartTwo[]>(page, pageSize),
    //        this.maintenanceEndpoint.getHospitalsEndpoint<Hospital[]>(page, pageSize),
    //        this.maintenanceEndpoint.getSpecimenContainersEndpoint<SpecimenContainer[]>(page, pageSize)
    //    );
    //}

    //getSampleSequencePartOnes(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getSampleSequencePartOnesEndpoint<SampleSequencePartOne>(page, pageSize);
    //}

    //getSampleSequencePartOne(sampleSequencePartOneId?: string) {

    //    return this.maintenanceEndpoint.getSampleSequencePartOneEndpoint<SampleSequencePartOne>(sampleSequencePartOneId);
    //}

    //newSampleSequencePartOne(sampleSequencePartOne: SampleSequencePartOneEdit) {
    //    return this.maintenanceEndpoint.getNewSampleSequencePartOneEndpoint<SampleSequencePartOne>(sampleSequencePartOne);
    //}

    //updateSampleSequencePartOne(sampleSequencePartOne: SampleSequencePartOneEdit) {
    //    if (sampleSequencePartOne.id) {
    //        return this.maintenanceEndpoint.getUpdateSampleSequencePartOneEndpoint(sampleSequencePartOne, sampleSequencePartOne.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getSampleSequencePartOneByDescriptionEndpoint<SampleSequencePartOne>(sampleSequencePartOne.description)
    //            .mergeMap(foundSampleSequencePartOne => {
    //                sampleSequencePartOne.id = foundSampleSequencePartOne.id;
    //                return this.maintenanceEndpoint.getUpdateSampleSequencePartOneEndpoint(sampleSequencePartOne, sampleSequencePartOne.id)
    //            });
    //    }
    //}

    //deleteSampleSequencePartOne(sampleSequencePartOneOrSampleSequencePartOneId: string | SampleSequencePartOneEdit): Observable<SampleSequencePartOne> {

    //    if (typeof sampleSequencePartOneOrSampleSequencePartOneId === 'string' || sampleSequencePartOneOrSampleSequencePartOneId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteSampleSequencePartOneEndpoint<SampleSequencePartOne>(<string>sampleSequencePartOneOrSampleSequencePartOneId);
    //    }
    //    else {

    //        if (sampleSequencePartOneOrSampleSequencePartOneId.id) {
    //            return this.deleteSampleSequencePartOne(sampleSequencePartOneOrSampleSequencePartOneId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getSampleSequencePartOneByDescriptionEndpoint<SampleSequencePartOne>(sampleSequencePartOneOrSampleSequencePartOneId.description)
    //                .mergeMap(sampleSequencePartOne => this.deleteSampleSequencePartOne(sampleSequencePartOne.id));
    //        }
    //    }
    //}

    //getSampleSequencePartTwos(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getSampleSequencePartTwosEndpoint<SampleSequencePartTwo>(page, pageSize);
    //}

    //getSampleSequencePartTwo(sampleSequencePartTwoId?: string) {

    //    return this.maintenanceEndpoint.getSampleSequencePartTwoEndpoint<SampleSequencePartTwo>(sampleSequencePartTwoId);
    //}

    //newSampleSequencePartTwo(sampleSequencePartTwo: SampleSequencePartTwoEdit) {
    //    return this.maintenanceEndpoint.getNewSampleSequencePartTwoEndpoint<SampleSequencePartTwo>(sampleSequencePartTwo);
    //}

    //updateSampleSequencePartTwo(sampleSequencePartTwo: SampleSequencePartTwoEdit) {
    //    if (sampleSequencePartTwo.id) {
    //        return this.maintenanceEndpoint.getUpdateSampleSequencePartTwoEndpoint(sampleSequencePartTwo, sampleSequencePartTwo.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getSampleSequencePartTwoByDescriptionEndpoint<SampleSequencePartTwo>(sampleSequencePartTwo.description)
    //            .mergeMap(foundSampleSequencePartTwo => {
    //                sampleSequencePartTwo.id = foundSampleSequencePartTwo.id;
    //                return this.maintenanceEndpoint.getUpdateSampleSequencePartTwoEndpoint(sampleSequencePartTwo, sampleSequencePartTwo.id)
    //            });
    //    }
    //}

    //deleteSampleSequencePartTwo(sampleSequencePartTwoOrSampleSequencePartTwoId: string | SampleSequencePartTwoEdit): Observable<SampleSequencePartTwo> {

    //    if (typeof sampleSequencePartTwoOrSampleSequencePartTwoId === 'string' || sampleSequencePartTwoOrSampleSequencePartTwoId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteSampleSequencePartTwoEndpoint<SampleSequencePartTwo>(<string>sampleSequencePartTwoOrSampleSequencePartTwoId);
    //    }
    //    else {

    //        if (sampleSequencePartTwoOrSampleSequencePartTwoId.id) {
    //            return this.deleteSampleSequencePartTwo(sampleSequencePartTwoOrSampleSequencePartTwoId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getSampleSequencePartTwoByDescriptionEndpoint<SampleSequencePartTwo>(sampleSequencePartTwoOrSampleSequencePartTwoId.description)
    //                .mergeMap(sampleSequencePartTwo => this.deleteSampleSequencePartTwo(sampleSequencePartTwo.id));
    //        }
    //    }
    //}

    //getProtocols(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getProtocolsEndpoint<Protocol[]>(page, pageSize);
    //}

    //getProtocol(protocolId?: string) {

    //    return this.maintenanceEndpoint.getProtocolEndpoint<Protocol>(protocolId);
    //}

    //newProtocol(protocol: ProtocolEdit) {
    //    return this.maintenanceEndpoint.getNewProtocolEndpoint<Protocol>(protocol);
    //}

    //updateProtocol(protocol: ProtocolEdit) {
    //    if (protocol.id) {
    //        return this.maintenanceEndpoint.getUpdateProtocolEndpoint(protocol, protocol.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getProtocolByDescriptionEndpoint<Protocol>(protocol.description)
    //            .mergeMap(foundProtocol => {
    //                protocol.id = foundProtocol.id;
    //                return this.maintenanceEndpoint.getUpdateProtocolEndpoint(protocol, protocol.id)
    //            });
    //    }
    //}

    //deleteProtocol(protocolOrProtocolId: string | ProtocolEdit): Observable<Protocol> {

    //    if (typeof protocolOrProtocolId === 'string' || protocolOrProtocolId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteProtocolEndpoint<Protocol>(<string>protocolOrProtocolId);
    //    }
    //    else {

    //        if (protocolOrProtocolId.id) {
    //            return this.deleteProtocol(protocolOrProtocolId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getProtocolByDescriptionEndpoint<Protocol>(protocolOrProtocolId.description)
    //                .mergeMap(protocol => this.deleteProtocol(protocol.id));
    //        }
    //    }
    //}

    //getFreezers(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getFreezersEndpoint<Freezer[]>(page, pageSize);
    //}

    //getFreezer(freezerId?: string) {

    //    return this.maintenanceEndpoint.getFreezerEndpoint<Freezer>(freezerId);
    //}

    //newFreezer(freezer: FreezerEdit) {
    //    return this.maintenanceEndpoint.getNewFreezerEndpoint<Freezer>(freezer);
    //}

    //updateFreezer(freezer: FreezerEdit) {
    //    if (freezer.id) {
    //        return this.maintenanceEndpoint.getUpdateFreezerEndpoint(freezer, freezer.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getFreezerByDescriptionEndpoint<Freezer>(freezer.description)
    //            .mergeMap(foundFreezer => {
    //                freezer.id = foundFreezer.id;
    //                return this.maintenanceEndpoint.getUpdateFreezerEndpoint(freezer, freezer.id)
    //            });
    //    }
    //}

    //deleteFreezer(freezerOrFreezerId: string | FreezerEdit): Observable<Freezer> {

    //    if (typeof freezerOrFreezerId === 'string' || freezerOrFreezerId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteFreezerEndpoint<Freezer>(<string>freezerOrFreezerId);
    //    }
    //    else {

    //        if (freezerOrFreezerId.id) {
    //            return this.deleteFreezer(freezerOrFreezerId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getFreezerByDescriptionEndpoint<Freezer>(freezerOrFreezerId.description)
    //                .mergeMap(freezer => this.deleteFreezer(freezer.id));
    //        }
    //    }
    //}

    //getRacks(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getRacksEndpoint<Rack[]>(page, pageSize);
    //}

    //getRack(rackId?: string) {

    //    return this.maintenanceEndpoint.getRackEndpoint<Rack>(rackId);
    //}

    //newRack(rack: RackEdit) {
    //    return this.maintenanceEndpoint.getNewRackEndpoint<Rack>(rack);
    //}

    //updateRack(rack: RackEdit) {
    //    if (rack.id) {
    //        return this.maintenanceEndpoint.getUpdateRackEndpoint(rack, rack.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getRackByDescriptionEndpoint<Rack>(rack.description)
    //            .mergeMap(foundRack => {
    //                rack.id = foundRack.id;
    //                return this.maintenanceEndpoint.getUpdateRackEndpoint(rack, rack.id)
    //            });
    //    }
    //}

    //deleteRack(rackOrRackId: string | RackEdit): Observable<Rack> {

    //    if (typeof rackOrRackId === 'string' || rackOrRackId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteRackEndpoint<Rack>(<string>rackOrRackId);
    //    }
    //    else {

    //        if (rackOrRackId.id) {
    //            return this.deleteRack(rackOrRackId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getRackByDescriptionEndpoint<Rack>(rackOrRackId.description)
    //                .mergeMap(rack => this.deleteRack(rack.id));
    //        }
    //    }
    //}

    //getLevels(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getLevelsEndpoint<Level[]>(page, pageSize);
    //}

    //getLevel(levelId?: string) {

    //    return this.maintenanceEndpoint.getLevelEndpoint<Level>(levelId);
    //}

    //newLevel(level: LevelEdit) {
    //    return this.maintenanceEndpoint.getNewLevelEndpoint<Level>(level);
    //}

    //updateLevel(level: LevelEdit) {
    //    if (level.id) {
    //        return this.maintenanceEndpoint.getUpdateLevelEndpoint(level, level.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getLevelByDescriptionEndpoint<Level>(level.description)
    //            .mergeMap(foundLevel => {
    //                level.id = foundLevel.id;
    //                return this.maintenanceEndpoint.getUpdateLevelEndpoint(level, level.id)
    //            });
    //    }
    //}

    //deleteLevel(levelOrLevelId: string | LevelEdit): Observable<Level> {

    //    if (typeof levelOrLevelId === 'string' || levelOrLevelId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteLevelEndpoint<Level>(<string>levelOrLevelId);
    //    }
    //    else {

    //        if (levelOrLevelId.id) {
    //            return this.deleteLevel(levelOrLevelId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getLevelByDescriptionEndpoint<Level>(levelOrLevelId.description)
    //                .mergeMap(level => this.deleteLevel(level.id));
    //        }
    //    }
    //}

    //getFreezerLocationEntities(page?: number, pageSize?: number) {
    //    return Observable.forkJoin(
    //        this.maintenanceEndpoint.getFreezersEndpoint<Freezer[]>(page, pageSize),
    //        this.maintenanceEndpoint.getRacksEndpoint<Rack[]>(page, pageSize),
    //        this.maintenanceEndpoint.getLevelsEndpoint<Level[]>(page, pageSize)
    //    );
    //}


    //getSpecimenContainers(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getSpecimenContainersEndpoint<SpecimenContainer[]>(page, pageSize);
    //}

    //getSpecimenContainer(specimenContainerId?: string) {

    //    return this.maintenanceEndpoint.getSpecimenContainerEndpoint<SpecimenContainer>(specimenContainerId);
    //}

    //newSpecimenContainer(specimenContainer: SpecimenContainerEdit) {
    //    return this.maintenanceEndpoint.getNewSpecimenContainerEndpoint<SpecimenContainer>(specimenContainer);
    //}

    //updateSpecimenContainer(specimenContainer: SpecimenContainerEdit) {
    //    if (specimenContainer.id) {
    //        return this.maintenanceEndpoint.getUpdateSpecimenContainerEndpoint(specimenContainer, specimenContainer.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getSpecimenContainerByDescriptionEndpoint<SpecimenContainer>(specimenContainer.description)
    //            .mergeMap(foundSpecimenContainer => {
    //                specimenContainer.id = foundSpecimenContainer.id;
    //                return this.maintenanceEndpoint.getUpdateSpecimenContainerEndpoint(specimenContainer, specimenContainer.id)
    //            });
    //    }
    //}

    //deleteSpecimenContainer(specimenContainerOrSpecimenContainerId: string | SpecimenContainerEdit): Observable<SpecimenContainer> {

    //    if (typeof specimenContainerOrSpecimenContainerId === 'string' || specimenContainerOrSpecimenContainerId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteSpecimenContainerEndpoint<SpecimenContainer>(<string>specimenContainerOrSpecimenContainerId);
    //    }
    //    else {

    //        if (specimenContainerOrSpecimenContainerId.id) {
    //            return this.deleteSpecimenContainer(specimenContainerOrSpecimenContainerId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getSpecimenContainerByDescriptionEndpoint<SpecimenContainer>(specimenContainerOrSpecimenContainerId.description)
    //                .mergeMap(specimenContainer => this.deleteSpecimenContainer(specimenContainer.id));
    //        }
    //    }
    //}

    //getEthnicitySubCategories(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getEthnicitySubCategoriesEndpoint<EthnicitySubCategory>(page, pageSize);
    //}

    //getEthnicitySubCategory(ethnicitySubCategoryId?: string) {

    //    return this.maintenanceEndpoint.getEthnicitySubCategoryEndpoint<EthnicitySubCategory>(ethnicitySubCategoryId);
    //}

    //newEthnicitySubCategory(ethnicitySubCategory: EthnicitySubCategoryEdit) {
    //    return this.maintenanceEndpoint.getNewEthnicitySubCategoryEndpoint<EthnicitySubCategory>(ethnicitySubCategory);
    //}

    //updateEthnicitySubCategory(ethnicitySubCategory: EthnicitySubCategoryEdit) {
    //    if (ethnicitySubCategory.id) {
    //        return this.maintenanceEndpoint.getUpdateEthnicitySubCategoryEndpoint(ethnicitySubCategory, ethnicitySubCategory.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getEthnicitySubCategoryByDescriptionEndpoint<EthnicitySubCategory>(ethnicitySubCategory.description)
    //            .mergeMap(foundEthnicitySubCategory => {
    //                ethnicitySubCategory.id = foundEthnicitySubCategory.id;
    //                return this.maintenanceEndpoint.getUpdateEthnicitySubCategoryEndpoint(ethnicitySubCategory, ethnicitySubCategory.id)
    //            });
    //    }
    //}

    //deleteEthnicitySubCategory(ethnicitySubCategoryOrEthnicitySubCategoryId: string | EthnicitySubCategoryEdit): Observable<EthnicitySubCategory> {

    //    if (typeof ethnicitySubCategoryOrEthnicitySubCategoryId === 'string' || ethnicitySubCategoryOrEthnicitySubCategoryId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteEthnicitySubCategoryEndpoint<EthnicitySubCategory>(<string>ethnicitySubCategoryOrEthnicitySubCategoryId);
    //    }
    //    else {

    //        if (ethnicitySubCategoryOrEthnicitySubCategoryId.id) {
    //            return this.deleteEthnicitySubCategory(ethnicitySubCategoryOrEthnicitySubCategoryId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getEthnicitySubCategoryByDescriptionEndpoint<EthnicitySubCategory>(ethnicitySubCategoryOrEthnicitySubCategoryId.description)
    //                .mergeMap(ethnicitySubCategory => this.deleteEthnicitySubCategory(ethnicitySubCategory.id));
    //        }
    //    }
    //}

    //getConsVersions(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getConsVersionsEndpoint<ConsVersion[]>(page, pageSize);
    //}

    //getConsVersion(consVersionId?: string) {

    //    return this.maintenanceEndpoint.getConsVersionEndpoint<ConsVersion>(consVersionId);
    //}

    //newConsVersion(consVersion: ConsVersionEdit) {
    //    return this.maintenanceEndpoint.getNewConsVersionEndpoint<ConsVersion>(consVersion);
    //}

    //updateConsVersion(consVersion: ConsVersionEdit) {
    //    if (consVersion.id) {
    //        return this.maintenanceEndpoint.getUpdateConsVersionEndpoint(consVersion, consVersion.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getConsVersionByDescriptionEndpoint<ConsVersion>(consVersion.description)
    //            .mergeMap(foundConsVersion => {
    //                consVersion.id = foundConsVersion.id;
    //                return this.maintenanceEndpoint.getUpdateConsVersionEndpoint(consVersion, consVersion.id)
    //            });
    //    }
    //}

    //deleteConsVersion(consVersionOrConsVersionId: string | ConsVersionEdit): Observable<ConsVersion> {

    //    if (typeof consVersionOrConsVersionId === 'string' || consVersionOrConsVersionId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteConsVersionEndpoint<ConsVersion>(<string>consVersionOrConsVersionId);
    //    }
    //    else {

    //        if (consVersionOrConsVersionId.id) {
    //            return this.deleteConsVersion(consVersionOrConsVersionId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getConsVersionByDescriptionEndpoint<ConsVersion>(consVersionOrConsVersionId.description)
    //                .mergeMap(consVersion => this.deleteConsVersion(consVersion.id));
    //        }
    //    }
    //}

    //getConsDenyReasons(page?: number, pageSize?: number) {

    //    return this.maintenanceEndpoint.getConsDenyReasonsEndpoint<ConsDenyReason[]>(page, pageSize);
    //}

    //getConsDenyReason(consDenyReasonId?: string) {

    //    return this.maintenanceEndpoint.getConsDenyReasonEndpoint<ConsDenyReason>(consDenyReasonId);
    //}

    //newConsDenyReason(consDenyReason: ConsDenyReasonEdit) {
    //    return this.maintenanceEndpoint.getNewConsDenyReasonEndpoint<ConsDenyReason>(consDenyReason);
    //}

    //updateConsDenyReason(consDenyReason: ConsDenyReasonEdit) {
    //    if (consDenyReason.id) {
    //        return this.maintenanceEndpoint.getUpdateConsDenyReasonEndpoint(consDenyReason, consDenyReason.id);
    //    }
    //    else {
    //        return this.maintenanceEndpoint.getConsDenyReasonByDescriptionEndpoint<ConsDenyReason>(consDenyReason.description)
    //            .mergeMap(foundConsDenyReason => {
    //                consDenyReason.id = foundConsDenyReason.id;
    //                return this.maintenanceEndpoint.getUpdateConsDenyReasonEndpoint(consDenyReason, consDenyReason.id)
    //            });
    //    }
    //}

    //deleteConsDenyReason(consDenyReasonOrConsDenyReasonId: string | ConsDenyReasonEdit): Observable<ConsDenyReason> {

    //    if (typeof consDenyReasonOrConsDenyReasonId === 'string' || consDenyReasonOrConsDenyReasonId instanceof String) {
    //        return this.maintenanceEndpoint.getDeleteConsDenyReasonEndpoint<ConsDenyReason>(<string>consDenyReasonOrConsDenyReasonId);
    //    }
    //    else {

    //        if (consDenyReasonOrConsDenyReasonId.id) {
    //            return this.deleteConsDenyReason(consDenyReasonOrConsDenyReasonId.id.toString());
    //        }
    //        else {
    //            return this.maintenanceEndpoint.getConsDenyReasonByDescriptionEndpoint<ConsDenyReason>(consDenyReasonOrConsDenyReasonId.description)
    //                .mergeMap(consDenyReason => this.deleteConsDenyReason(consDenyReason.id));
    //        }
    //    }
    //}

    //saveDiagnosis(diagnosis: string) {
    //    return this.maintenanceEndpoint.getSaveDiagnosisEndpoint(diagnosis);
    //}

}
