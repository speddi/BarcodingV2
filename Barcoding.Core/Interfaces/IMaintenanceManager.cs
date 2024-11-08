using Barcoding.Core.Models;

namespace Barcoding.Core.Interfaces
{
    public interface IMaintenanceManager
    {
        //#region Status
        //Task<List<Status>> GetStatusesAsync();
        //Task<Status> GetStatusByIdAsync(int id);
        //Task<Status> GetStatusByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveStatusAsync(Status status);
        //#endregion

        //#region Race
        //Task<List<Race>> GetRacesAsync();
        //Task<Race> GetRaceByIdAsync(int id);
        //Task<Race> GetRaceByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveRaceAsync(Race race);
        //#endregion

        //#region RaceSubCategory
        //Task<List<RaceSubCategory>> GetRaceSubCategoriesAsync();
        //Task<RaceSubCategory> GetRaceSubCategoryByIdAsync(int id);
        //Task<RaceSubCategory> GetRaceSubCategoryByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveRaceSubCategoryAsync(RaceSubCategory raceSubCategory);
        //#endregion

        //#region Gender
        //Task<List<Gender>> GetGendersAsync();
        //Task<Gender> GetGenderByIdAsync(int id);
        //Task<Gender> GetGenderByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveGenderAsync(Gender gender);
        //#endregion

        //#region Ethnicity
        //Task<List<Ethnicity>> GetEthnicitiesAsync();
        //Task<Ethnicity> GetEthnicityByIdAsync(int id);
        //Task<Ethnicity> GetEthnicityByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveEthnicityAsync(Ethnicity ethnicity);
        //#endregion

        //#region EthnicitySubCategory
        //Task<List<EthnicitySubCategory>> GetEthnicitySubCategoriesAsync();
        //Task<EthnicitySubCategory> GetEthnicitySubCategoryByIdAsync(int id);
        //Task<EthnicitySubCategory> GetEthnicitySubCategoryByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveEthnicitySubCategoryAsync(EthnicitySubCategory ethnicitySubCategory);
        //#endregion

        //#region Hospital
        //Task<List<Hospital>> GetHospitalsAsync();
        //Task<Hospital> GetHospitalByIdAsync(int id);
        //Task<Hospital> GetHospitalByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveHospitalAsync(Hospital hospital);
        //#endregion

        #region AgeModifier
        Task<List<AgeModifier>> GetAgeModifiersAsync();
        Task<AgeModifier> GetAgeModifierByIdAsync(int id);
        Task<AgeModifier> GetAgeModifierByDescriptionAsync(string description);
        Task<Tuple<bool, string>> SaveAgeModifierAsync(AgeModifier ageModifier);
        #endregion

        //#region AmountSizeType
        //Task<List<AmountSizeType>> GetAmountSizeTypesAsync();
        //Task<AmountSizeType> GetAmountSizeTypeByIdAsync(int id);
        //Task<AmountSizeType> GetAmountSizeTypeByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveAmountSizeTypeAsync(AmountSizeType amountSizeType);
        //#endregion

        //#region ProcedureType
        //Task<List<ProcedureType>> GetProcedureTypesAsync();
        //Task<ProcedureType> GetProcedureTypeByIdAsync(int id);
        //Task<ProcedureType> GetProcedureTypeByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveProcedureTypeAsync(ProcedureType procedureType);
        //Task<List<ProcedureType>> GetLegacyProcedureTypesAsync();
        //#endregion

        //#region TissueArea
        //Task<List<TissueArea>> GetTissueAreasAsync();
        //Task<TissueArea> GetTissueAreaByIdAsync(int id);
        //Task<TissueArea> GetTissueAreaByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveTissueAreaAsync(TissueArea tissueArea);
        //#endregion

        //#region ShipmentStatus
        //Task<List<ShipmentStatus>> GetShipmentStatusesAsync();
        //Task<ShipmentStatus> GetShipmentStatusByIdAsync(int id);
        //Task<ShipmentStatus> GetShipmentStatusByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveShipmentStatusAsync(ShipmentStatus shipmentStatus);
        //#endregion

        //#region Preparation
        //Task<List<Preparation>> GetPreparationsAsync();
        //Task<Preparation> GetPreparationByIdAsync(int id);
        //Task<Preparation> GetPreparationByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SavePreparationAsync(Preparation preparation);
        //#endregion

        //#region PreparationDetail
        //Task<List<PreparationDetail>> GetPreparationDetailsAsync();
        //Task<PreparationDetail> GetPreparationDetailByIdAsync(int id);
        //Task<PreparationDetail> GetPreparationDetailByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SavePreparationDetailAsync(PreparationDetail preparationDetail);
        //#endregion

        //#region Investigator
        //Task<List<Investigator>> GetInvestigatorsAsync();
        //Task<Investigator> GetInvestigatorByIdAsync(int id);
        //Task<Investigator> GetInvestigatorByInvestigatorNameAsync(string investigatorName);
        //Task<Tuple<bool, string>> SaveInvestigatorAsync(Investigator investigator);

        //Task<List<Investigator>> GetLegacyInvestigatorsAsync();
        //#endregion

        //#region InvestigatorRequest
        //Task<List<InvestigatorRequest>> GetInvestigatorRequestsAsync();
        //Task<InvestigatorRequest> GetInvestigatorRequestByIdAsync(int id);
        //Task<InvestigatorRequest> GetInvestigatorRequestByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveInvestigatorRequestAsync(InvestigatorRequest investigatorRequest);
        //#endregion

        //#region SampleSequencePartOne
        //Task<List<SampleSequencePartOne>> GetSampleSequencePartOnesAsync();
        //Task<SampleSequencePartOne> GetSampleSequencePartOneByIdAsync(int id);
        //Task<SampleSequencePartOne> GetSampleSequencePartOneByDescriptionAsync(string number);
        //Task<Tuple<bool, string>> SaveSampleSequencePartOneAsync(SampleSequencePartOne sampleSequencePartOne);
        //#endregion

        //#region SampleSequencePartTwo
        //Task<List<SampleSequencePartTwo>> GetSampleSequencePartTwosAsync();
        //Task<SampleSequencePartTwo> GetSampleSequencePartTwoByIdAsync(int id);
        //Task<SampleSequencePartTwo> GetSampleSequencePartTwoByDescriptionAsync(string number);
        //Task<Tuple<bool, string>> SaveSampleSequencePartTwoAsync(SampleSequencePartTwo sampleSequencePartTwo);
        //#endregion

        //#region Protocol
        //Task<List<Protocol>> GetProtocolsAsync();
        //Task<Protocol> GetProtocolByIdAsync(int id);
        //Task<Protocol> GetProtocolByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveProtocolAsync(Protocol protocol);
        //#endregion

        //#region Freezer
        //Task<List<Freezer>> GetFreezersAsync();
        //Task<Freezer> GetFreezerByIdAsync(int id);
        //Task<Freezer> GetFreezerByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveFreezerAsync(Freezer freezer);
        //#endregion

        //#region Rack
        //Task<List<Rack>> GetRacksAsync();
        //Task<Rack> GetRackByIdAsync(int id);
        //Task<Rack> GetRackByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveRackAsync(Rack rack);
        //#endregion

        //#region Level
        //Task<List<Level>> GetLevelsAsync();
        //Task<Level> GetLevelByIdAsync(int id);
        //Task<Level> GetLevelByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveLevelAsync(Level level);
        //#endregion

        //#region SpecimenContainer
        //Task<List<SpecimenContainer>> GetSpecimenContainersAsync();
        //Task<SpecimenContainer> GetSpecimenContainerByIdAsync(int id);
        //Task<SpecimenContainer> GetSpecimenContainerByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveSpecimenContainerAsync(SpecimenContainer specimenContainer);
        //#endregion

        //#region ConsVersion
        //Task<List<ConsVersion>> GetConsVersionsAsync();
        //Task<ConsVersion> GetConsVersionByIdAsync(int id);
        //Task<ConsVersion> GetConsVersionByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveConsVersionAsync(ConsVersion consVersion);
        //#endregion

        //#region ConsDenyReason
        //Task<List<ConsDenyReason>> GetConsDenyReasonsAsync();
        //Task<ConsDenyReason> GetConsDenyReasonByIdAsync(int id);
        //Task<ConsDenyReason> GetConsDenyReasonByDescriptionAsync(string description);
        //Task<Tuple<bool, string>> SaveConsDenyReasonAsync(ConsDenyReason consDenyReason);
        //#endregion

        //#region Diagnosis
        //Task<Tuple<bool, string>> SaveDiagnosisAsync(SaveDiagnosisModel saveDiagnosis);
        //#endregion
    }
}
