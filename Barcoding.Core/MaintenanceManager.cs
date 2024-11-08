using System.Text;
using Barcoding.Core.Infrastructure;
using Barcoding.Core.Interfaces;
using Barcoding.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Barcoding.Core
{
    public class MaintenanceManager : IMaintenanceManager
    {
        private readonly ApplicationDbContext _context;
        //private readonly LegacyDbContext _legacyDbContext;
        //public MaintenanceManager(ApplicationDbContext context, LegacyDbContext legacyDbContext)
        public MaintenanceManager(ApplicationDbContext context)
        {
            _context = context;
            //_legacyDbContext = legacyDbContext;
        }
        //#region Status
        //public async Task<Tuple<bool, string>> SaveStatusAsync(Status status)
        //{
        //    try
        //    {
        //        var existingStatus = await _context.Statuses.FirstOrDefaultAsync(p => p.Id == status.Id);

        //        if (existingStatus != null)
        //        {
        //            _context.Statuses.Update(status);
        //        }
        //        else
        //        {
        //            _context.Statuses.Add(status);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Status> GetStatusByIdAsync(int id)
        //{
        //    return await _context.Statuses.SingleAsync(p => p.Id == id);
        //}
        //public async Task<Status> GetStatusByDescriptionAsync(string description)
        //{
        //    return await _context.Statuses.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Status>> GetStatusesAsync()
        //{
        //    return await _context.Statuses.ToListAsync();
        //}

        //#endregion

        //#region Race
        //public async Task<Tuple<bool, string>> SaveRaceAsync(Race race)
        //{
        //    try
        //    {

        //        var sql = new StringBuilder();
        //        var parameters = new List<SqlParameter>
        //        {
        //            new SqlParameter("@description", race.Description),
        //            new SqlParameter("@enabled", race.Enabled)
        //        };

        //        if (race.Id > 0)
        //        {
        //            var i = 0;
        //            sql.Append("UPDATE [Race] SET Description = @description, Enabled=@enabled WHERE id = @raceId;");
        //            parameters.Add(new SqlParameter("@raceId", race.Id));
        //            foreach (var request in race.RaceSubCategories)
        //            {
        //                if (request.Id > 0)
        //                {
        //                    sql.Append(string.Format("UPDATE [RaceSubcategory] SET Description = @description{0}, Enabled = @enabled{0}, RaceId = @raceId WHERE id = @requestId{0};", i));
        //                    parameters.Add(new SqlParameter(string.Format("@requestId{0}", i), request.Id));
        //                }
        //                else
        //                {
        //                    sql.Append(string.Format("INSERT INTO [RaceSubcategory](Description, Enabled, RaceId)Values(@description{0}, @enabled{0}, @raceId);", i));
        //                }
        //                parameters.Add(new SqlParameter(string.Format("@description{0}", i), request.Description));
        //                parameters.Add(new SqlParameter(string.Format("@enabled{0}", i), request.Enabled));

        //                i++;
        //            }

        //            await _context.Database.ExecuteSqlCommandAsync(sql.ToString(), parameters);
        //        }
        //        else
        //        {
        //            _context.Races.Add(race);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Race> GetRaceByIdAsync(int id)
        //{
        //    return await _context.Races
        //        .Include(r => r.RaceSubCategories).AsNoTracking()
        //        .SingleAsync(p => p.Id == id);
        //}
        //public async Task<Race> GetRaceByDescriptionAsync(string description)
        //{
        //    return await _context.Races
        //        .Include(r => r.RaceSubCategories).AsNoTracking()
        //        .SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Race>> GetRacesAsync()
        //{
        //    return await _context.Races
        //        .Include(r => r.RaceSubCategories).AsNoTracking()
        //        .ToListAsync();
        //}

        //#endregion

        //#region RaceSubCategory
        //public async Task<Tuple<bool, string>> SaveRaceSubCategoryAsync(RaceSubCategory raceSubCategory)
        //{
        //    try
        //    {
        //        var existingRaceSubCategory = await _context.RaceSubCategories.FirstOrDefaultAsync(p => p.Id == raceSubCategory.Id);

        //        if (existingRaceSubCategory != null)
        //        {
        //            _context.RaceSubCategories.Update(raceSubCategory);
        //        }
        //        else
        //        {
        //            _context.RaceSubCategories.Add(raceSubCategory);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<RaceSubCategory> GetRaceSubCategoryByIdAsync(int id)
        //{
        //    return await _context.RaceSubCategories.SingleAsync(p => p.Id == id);
        //}
        //public async Task<RaceSubCategory> GetRaceSubCategoryByDescriptionAsync(string description)
        //{
        //    return await _context.RaceSubCategories.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<RaceSubCategory>> GetRaceSubCategoriesAsync()
        //{
        //    return await _context.RaceSubCategories.ToListAsync();
        //}

        //#endregion

        //#region Gender
        //public async Task<Tuple<bool, string>> SaveGenderAsync(Models.Gender gender)
        //{
        //    try
        //    {
        //        var existingGender = await _context.Genders.FirstOrDefaultAsync(p => p.Id == gender.Id);

        //        if (existingGender != null)
        //        {
        //            _context.Genders.Update(gender);
        //        }
        //        else
        //        {
        //            _context.Genders.Add(gender);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Models.Gender> GetGenderByIdAsync(int id)
        //{
        //    return await _context.Genders.SingleAsync(p => p.Id == id);
        //}
        //public async Task<Models.Gender> GetGenderByDescriptionAsync(string description)
        //{
        //    return await _context.Genders.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Models.Gender>> GetGendersAsync()
        //{
        //    return await _context.Genders.ToListAsync();
        //}

        //#endregion

        //#region Hospital
        //public async Task<Tuple<bool, string>> SaveHospitalAsync(Hospital hospital)
        //{
        //    try
        //    {
        //        var existingHospital = await _context.Hospitals.FirstOrDefaultAsync(p => p.Id == hospital.Id);

        //        if (existingHospital != null)
        //        {
        //            _context.Hospitals.Update(hospital);
        //        }
        //        else
        //        {
        //            _context.Hospitals.Add(hospital);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Hospital> GetHospitalByIdAsync(int id)
        //{
        //    return await _context.Hospitals.SingleAsync(p => p.Id == id);
        //}
        //public async Task<Hospital> GetHospitalByDescriptionAsync(string description)
        //{
        //    return await _context.Hospitals.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Hospital>> GetHospitalsAsync()
        //{
        //    return await _context.Hospitals.ToListAsync();
        //}

        //#endregion

        //#region Ethnicity
        //public async Task<Tuple<bool, string>> SaveEthnicityAsync(Ethnicity ethnicity)
        //{
        //    try
        //    {

        //        var sql = new StringBuilder();
        //        var parameters = new List<SqlParameter>
        //        {
        //            new SqlParameter("@description", ethnicity.Description),
        //            new SqlParameter("@enabled", ethnicity.Enabled)
        //        };

        //        if (ethnicity.Id > 0)
        //        {
        //            var i = 0;
        //            sql.Append("UPDATE [Ethnicity] SET Description = @description, Enabled=@enabled WHERE id = @ethnicityId;");
        //            parameters.Add(new SqlParameter("@ethnicityId", ethnicity.Id));
        //            foreach (var request in ethnicity.EthnicitySubCategories)
        //            {
        //                if (request.Id > 0)
        //                {
        //                    sql.Append(string.Format("UPDATE [EthnicitySubcategory] SET Description = @description{0}, Enabled = @enabled{0}, EthnicityId = @ethnicityId WHERE id = @requestId{0};", i));
        //                    parameters.Add(new SqlParameter(string.Format("@requestId{0}", i), request.Id));
        //                }
        //                else
        //                {
        //                    sql.Append(string.Format("INSERT INTO [EthnicitySubcategory](Description, Enabled, EthnicityId)Values(@description{0}, @enabled{0}, @ethnicityId);", i));
        //                }
        //                parameters.Add(new SqlParameter(string.Format("@description{0}", i), request.Description));
        //                parameters.Add(new SqlParameter(string.Format("@enabled{0}", i), request.Enabled));

        //                i++;
        //            }

        //            await _context.Database.ExecuteSqlCommandAsync(sql.ToString(), parameters);
        //        }
        //        else
        //        {
        //            _context.Ethnicities.Add(ethnicity);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Ethnicity> GetEthnicityByIdAsync(int id)
        //{
        //    return await _context.Ethnicities
        //        .Include(e => e.EthnicitySubCategories).AsNoTracking()
        //        .SingleAsync(p => p.Id == id);
        //}
        //public async Task<Ethnicity> GetEthnicityByDescriptionAsync(string description)
        //{
        //    return await _context.Ethnicities
        //        .Include(e => e.EthnicitySubCategories).AsNoTracking()
        //        .SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Ethnicity>> GetEthnicitiesAsync()
        //{
        //    return await _context.Ethnicities
        //        .Include(e => e.EthnicitySubCategories).AsNoTracking()
        //        .ToListAsync();
        //}

        //#endregion       

        //#region EthnicitySubCategory
        //public async Task<Tuple<bool, string>> SaveEthnicitySubCategoryAsync(EthnicitySubCategory ethnicitySubCategory)
        //{
        //    try
        //    {
        //        var existingEthnicitySubCategory = await _context.EthnicitySubCategories.FirstOrDefaultAsync(p => p.Id == ethnicitySubCategory.Id);

        //        if (existingEthnicitySubCategory != null)
        //        {
        //            _context.EthnicitySubCategories.Update(ethnicitySubCategory);
        //        }
        //        else
        //        {
        //            _context.EthnicitySubCategories.Add(ethnicitySubCategory);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<EthnicitySubCategory> GetEthnicitySubCategoryByIdAsync(int id)
        //{
        //    return await _context.EthnicitySubCategories.SingleAsync(p => p.Id == id);
        //}
        //public async Task<EthnicitySubCategory> GetEthnicitySubCategoryByDescriptionAsync(string description)
        //{
        //    return await _context.EthnicitySubCategories.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<EthnicitySubCategory>> GetEthnicitySubCategoriesAsync()
        //{
        //    return await _context.EthnicitySubCategories.ToListAsync();
        //}

        //#endregion

        //#region ProcedureType
        //public async Task<Tuple<bool, string>> SaveProcedureTypeAsync(ProcedureType procedureType)
        //{
        //    try
        //    {
        //        var existingProcedureType = await _context.ProcedureTypes.FirstOrDefaultAsync(p => p.Id == procedureType.Id);

        //        if (existingProcedureType != null)
        //        {
        //            _context.ProcedureTypes.Update(procedureType);
        //        }
        //        else
        //        {
        //            _context.ProcedureTypes.Add(procedureType);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<ProcedureType> GetProcedureTypeByIdAsync(int id)
        //{
        //    return await _context.ProcedureTypes.SingleAsync(p => p.Id == id);
        //}
        //public async Task<ProcedureType> GetProcedureTypeByDescriptionAsync(string description)
        //{
        //    return await _context.ProcedureTypes.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<ProcedureType>> GetProcedureTypesAsync()
        //{
        //    return await _context.ProcedureTypes.ToListAsync();
        //}

        //public async Task<List<ProcedureType>> GetLegacyProcedureTypesAsync()
        //{
        //    var sb = new StringBuilder();
        //    sb.Append("SELECT DISTINCT RTRIM(ProcedureType) as ProcedureType FROM [TissueSamplesView] ");

        //    return await _legacyDbContext.TissueSamples.FromSql(string.Format(sb.ToString())).Where(a => !string.IsNullOrWhiteSpace(a.ProcedureType)).OrderBy(a => a.ProcedureType).Select(a => new ProcedureType()
        //    {
        //        Description = a.ProcedureType
        //    }).OrderBy(a => a.Description)
        //        .ToListAsync();
        //}

        //#endregion

        #region AgeModifier
        public async Task<Tuple<bool, string>> SaveAgeModifierAsync(AgeModifier ageModifier)
        {
            try
            {
                var existingAgeModifier = await _context.AgeModifiers.FirstOrDefaultAsync(p => p.Id == ageModifier.Id);

                if (existingAgeModifier != null)
                {
                    _context.AgeModifiers.Update(ageModifier);
                }
                else
                {
                    _context.AgeModifiers.Add(ageModifier);
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Tuple.Create(false, ex.Message);
            }
            return Tuple.Create(true, string.Empty);
        }
        public async Task<AgeModifier> GetAgeModifierByIdAsync(int id)
        {
            return await _context.AgeModifiers.SingleAsync(p => p.Id == id);
        }
        public async Task<AgeModifier> GetAgeModifierByDescriptionAsync(string description)
        {
            return await _context.AgeModifiers.SingleAsync(p => p.Description == description);
        }
        public async Task<List<AgeModifier>> GetAgeModifiersAsync()
        {
            return await _context.AgeModifiers.ToListAsync();
        }

        #endregion

        //#region AmountSizeType
        //public async Task<Tuple<bool, string>> SaveAmountSizeTypeAsync(AmountSizeType amountSizeType)
        //{
        //    try
        //    {
        //        var existingAmountSizeType = await _context.AmountSizeTypes.FirstOrDefaultAsync(p => p.Id == amountSizeType.Id);

        //        if (existingAmountSizeType != null)
        //        {
        //            _context.AmountSizeTypes.Update(amountSizeType);
        //        }
        //        else
        //        {
        //            _context.AmountSizeTypes.Add(amountSizeType);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<AmountSizeType> GetAmountSizeTypeByIdAsync(int id)
        //{
        //    return await _context.AmountSizeTypes.SingleAsync(p => p.Id == id);
        //}
        //public async Task<AmountSizeType> GetAmountSizeTypeByDescriptionAsync(string description)
        //{
        //    return await _context.AmountSizeTypes.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<AmountSizeType>> GetAmountSizeTypesAsync()
        //{
        //    return await _context.AmountSizeTypes.ToListAsync();
        //}

        //#endregion

        //#region TissueArea
        //public async Task<Tuple<bool, string>> SaveTissueAreaAsync(TissueArea tissueArea)
        //{
        //    try
        //    {
        //        var existingTissueArea = await _context.TissueAreas.FirstOrDefaultAsync(p => p.Id == tissueArea.Id);

        //        if (existingTissueArea != null)
        //        {
        //            _context.TissueAreas.Update(tissueArea);
        //        }
        //        else
        //        {
        //            _context.TissueAreas.Add(tissueArea);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<TissueArea> GetTissueAreaByIdAsync(int id)
        //{
        //    return await _context.TissueAreas.SingleAsync(p => p.Id == id);
        //}
        //public async Task<TissueArea> GetTissueAreaByDescriptionAsync(string description)
        //{
        //    return await _context.TissueAreas.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<TissueArea>> GetTissueAreasAsync()
        //{
        //    return await _context.TissueAreas.ToListAsync();
        //}

        //#endregion

        //#region ShipmentStatus
        //public async Task<Tuple<bool, string>> SaveShipmentStatusAsync(ShipmentStatus shipmentStatus)
        //{
        //    try
        //    {
        //        var existingShipmentStatus = await _context.ShipmentStatuses.FirstOrDefaultAsync(p => p.Id == shipmentStatus.Id);

        //        if (existingShipmentStatus != null)
        //        {
        //            _context.ShipmentStatuses.Update(shipmentStatus);
        //        }
        //        else
        //        {
        //            _context.ShipmentStatuses.Add(shipmentStatus);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<ShipmentStatus> GetShipmentStatusByIdAsync(int id)
        //{
        //    return await _context.ShipmentStatuses.SingleAsync(p => p.Id == id);
        //}
        //public async Task<ShipmentStatus> GetShipmentStatusByDescriptionAsync(string description)
        //{
        //    return await _context.ShipmentStatuses.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<ShipmentStatus>> GetShipmentStatusesAsync()
        //{
        //    return await _context.ShipmentStatuses.ToListAsync();
        //}

        //#endregion

        //#region Preparation
        //public async Task<Tuple<bool, string>> SavePreparationAsync(Preparation preparation)
        //{
        //    try
        //    {

        //        var sql = new StringBuilder();
        //        var parameters = new List<SqlParameter>
        //        {
        //            new SqlParameter("@description", preparation.Description),
        //            new SqlParameter("@enabled", preparation.Enabled)
        //        };

        //        if (preparation.Id > 0)
        //        {
        //            var i = 0;
        //            sql.Append("UPDATE [Preparation] SET Description = @description, Enabled=@enabled WHERE id = @preparationId;");
        //            parameters.Add(new SqlParameter("@preparationId", preparation.Id));
        //            foreach (var request in preparation.PreparationDetails)
        //            {
        //                if (request.Id > 0)
        //                {
        //                    sql.Append(string.Format("UPDATE [PreparationDetail] SET Description = @description{0}, Enabled = @enabled{0}, PreparationId = @preparationId WHERE id = @requestId{0};", i));
        //                    parameters.Add(new SqlParameter(string.Format("@requestId{0}", i), request.Id));
        //                }
        //                else
        //                {
        //                    sql.Append(string.Format("INSERT INTO [PreparationDetail](Description, Enabled, PreparationId)Values(@description{0}, @enabled{0}, @preparationId);", i));
        //                }
        //                parameters.Add(new SqlParameter(string.Format("@description{0}", i), request.Description));
        //                parameters.Add(new SqlParameter(string.Format("@enabled{0}", i), request.Enabled));

        //                i++;
        //            }

        //            await _context.Database.ExecuteSqlCommandAsync(sql.ToString(), parameters);
        //        }
        //        else
        //        {
        //            _context.Preparations.Add(preparation);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Preparation> GetPreparationByIdAsync(int id)
        //{
        //    return await _context.Preparations
        //        .Include(p => p.PreparationDetails).AsNoTracking()
        //        .SingleAsync(p => p.Id == id);
        //}
        //public async Task<Preparation> GetPreparationByDescriptionAsync(string description)
        //{
        //    return await _context.Preparations
        //        .Include(p => p.PreparationDetails).AsNoTracking()
        //        .SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Preparation>> GetPreparationsAsync()
        //{
        //    return await _context.Preparations
        //        .Include(p => p.PreparationDetails).AsNoTracking()
        //        .ToListAsync();
        //}

        //#endregion

        //#region PreparationDetail
        //public async Task<Tuple<bool, string>> SavePreparationDetailAsync(PreparationDetail preparationDetail)
        //{
        //    try
        //    {
        //        var existingPreparationDetail = await _context.PreparationDetails.FirstOrDefaultAsync(p => p.Id == preparationDetail.Id);

        //        if (existingPreparationDetail != null)
        //        {
        //            _context.PreparationDetails.Update(preparationDetail);
        //        }
        //        else
        //        {
        //            _context.PreparationDetails.Add(preparationDetail);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<PreparationDetail> GetPreparationDetailByIdAsync(int id)
        //{
        //    return await _context.PreparationDetails.SingleAsync(p => p.Id == id);
        //}
        //public async Task<PreparationDetail> GetPreparationDetailByDescriptionAsync(string description)
        //{
        //    return await _context.PreparationDetails.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<PreparationDetail>> GetPreparationDetailsAsync()
        //{
        //    return await _context.PreparationDetails.ToListAsync();
        //}

        //#endregion

        //#region Investigator
        //public async Task<Tuple<bool, string>> SaveInvestigatorAsync(Investigator investigator)
        //{
        //    try
        //    {

        //        var sql = new StringBuilder();
        //        var parameters = new List<SqlParameter>
        //        {
        //            new SqlParameter("@firstName", investigator.FirstName),
        //            new SqlParameter("@lastName", investigator.LastName),
        //            new SqlParameter("@investigatorCode", investigator.InvestigatorCode),
        //            new SqlParameter("@investigatorName", investigator.InvestigatorName),
        //            new SqlParameter("@enabled", investigator.Enabled)
        //        };

        //        if (investigator.Id > 0)
        //        {
        //            var i = 0;
        //            sql.Append("UPDATE [Investigator] SET FirstName = @firstName, LastName = @lastName, investigatorCode = @investigatorCode, investigatorName = @investigatorName, Enabled=@enabled WHERE id = @investigatorId;");
        //            parameters.Add(new SqlParameter("@investigatorId", investigator.Id));
        //            foreach (var request in investigator.InvestigatorRequests)
        //            {
        //                if (request.Id > 0)
        //                {
        //                    sql.Append(string.Format("UPDATE [InvestigatorRequest] SET Description = @description{0}, Enabled = @enabled{0}, InvestigatorId = @investigatorId WHERE id = @requestId{0};", i));
        //                    parameters.Add(new SqlParameter(string.Format("@requestId{0}", i), request.Id));
        //                }
        //                else
        //                {
        //                    sql.Append(string.Format("INSERT INTO [InvestigatorRequest](Description, Enabled, InvestigatorId)Values(@description{0}, @enabled{0}, @investigatorId);", i));
        //                }
        //                parameters.Add(new SqlParameter(string.Format("@description{0}", i), request.Description));
        //                parameters.Add(new SqlParameter(string.Format("@enabled{0}", i), request.Enabled));

        //                i++;
        //            }

        //            await _context.Database.ExecuteSqlCommandAsync(sql.ToString(), parameters);
        //        }
        //        else
        //        {
        //            _context.Investigators.Add(investigator);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Investigator> GetInvestigatorByIdAsync(int id)
        //{
        //    return await _context.Investigators
        //        .Include(i => i.InvestigatorRequests).AsNoTracking()
        //        .SingleAsync(p => p.Id == id);
        //}
        //public async Task<Investigator> GetInvestigatorByInvestigatorNameAsync(string investigatorName)
        //{
        //    return await _context.Investigators
        //        .Include(i => i.InvestigatorRequests).AsNoTracking()
        //        .SingleAsync(p => p.InvestigatorName == investigatorName);
        //}
        //public async Task<List<Investigator>> GetInvestigatorsAsync()
        //{
        //    return await _context.Investigators.OrderBy(a => a.InvestigatorName)
        //        .Include(i => i.InvestigatorRequests).AsNoTracking()
        //        .ToListAsync();
        //}

        //public async Task<List<Investigator>> GetLegacyInvestigatorsAsync()
        //{
        //    var sb = new StringBuilder();
        //    sb.Append("SELECT DISTINCT RTRIM(Investigator) as Investigator FROM [TissueSamplesView] ");

        //    return await _legacyDbContext.TissueSamples.FromSql(string.Format(sb.ToString())).Where(a => !string.IsNullOrWhiteSpace(a.Investigator)).OrderBy(a => a.Investigator).Select(a => new Investigator()
        //    {
        //        InvestigatorName = a.Investigator
        //    }).OrderBy(a => a.InvestigatorName)
        //        .ToListAsync();
        //}

        //#endregion

        //#region InvestigatorRequest
        //public async Task<Tuple<bool, string>> SaveInvestigatorRequestAsync(InvestigatorRequest investigatorRequest)
        //{
        //    try
        //    {
        //        var existingInvestigatorNumber = await _context.InvestigatorRequests.FirstOrDefaultAsync(p => p.Id == investigatorRequest.Id);

        //        if (existingInvestigatorNumber != null)
        //        {
        //            _context.InvestigatorRequests.Update(investigatorRequest);
        //        }
        //        else
        //        {
        //            _context.InvestigatorRequests.Add(investigatorRequest);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<InvestigatorRequest> GetInvestigatorRequestByIdAsync(int id)
        //{
        //    return await _context.InvestigatorRequests.SingleAsync(p => p.Id == id);
        //}
        //public async Task<InvestigatorRequest> GetInvestigatorRequestByDescriptionAsync(string description)
        //{
        //    return await _context.InvestigatorRequests.SingleAsync(i => i.Description == description);
        //}
        //public async Task<List<InvestigatorRequest>> GetInvestigatorRequestsAsync()
        //{
        //    return await _context.InvestigatorRequests.ToListAsync();
        //}

        //#endregion

        //#region SampleSequencePartOne
        //public async Task<Tuple<bool, string>> SaveSampleSequencePartOneAsync(SampleSequencePartOne sampleSequencePartOne)
        //{
        //    try
        //    {
        //        var existingSampleSequencePartOne = await _context.SampleSequencePartOnes.FirstOrDefaultAsync(p => p.Id == sampleSequencePartOne.Id);

        //        if (existingSampleSequencePartOne != null)
        //        {
        //            _context.SampleSequencePartOnes.Update(sampleSequencePartOne);
        //        }
        //        else
        //        {
        //            _context.SampleSequencePartOnes.Add(sampleSequencePartOne);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<SampleSequencePartOne> GetSampleSequencePartOneByIdAsync(int id)
        //{
        //    return await _context.SampleSequencePartOnes.SingleAsync(p => p.Id == id);
        //}
        //public async Task<SampleSequencePartOne> GetSampleSequencePartOneByDescriptionAsync(string description)
        //{
        //    return await _context.SampleSequencePartOnes.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<SampleSequencePartOne>> GetSampleSequencePartOnesAsync()
        //{
        //    return await _context.SampleSequencePartOnes.ToListAsync();
        //}

        //#endregion

        //#region SampleSequencePartTwo
        //public async Task<Tuple<bool, string>> SaveSampleSequencePartTwoAsync(SampleSequencePartTwo sampleSequencePartTwo)
        //{
        //    try
        //    {
        //        var existingSampleSequencePartTwo = await _context.SampleSequencePartTwos.FirstOrDefaultAsync(p => p.Id == sampleSequencePartTwo.Id);

        //        if (existingSampleSequencePartTwo != null)
        //        {
        //            _context.SampleSequencePartTwos.Update(sampleSequencePartTwo);
        //        }
        //        else
        //        {
        //            _context.SampleSequencePartTwos.Add(sampleSequencePartTwo);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<SampleSequencePartTwo> GetSampleSequencePartTwoByIdAsync(int id)
        //{
        //    return await _context.SampleSequencePartTwos.SingleAsync(p => p.Id == id);
        //}
        //public async Task<SampleSequencePartTwo> GetSampleSequencePartTwoByDescriptionAsync(string description)
        //{
        //    return await _context.SampleSequencePartTwos.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<SampleSequencePartTwo>> GetSampleSequencePartTwosAsync()
        //{
        //    return await _context.SampleSequencePartTwos.ToListAsync();
        //}

        //#endregion

        //#region Protocol
        //public async Task<Tuple<bool, string>> SaveProtocolAsync(Protocol protocol)
        //{
        //    try
        //    {
        //        var existingProtocol = await _context.Protocols.FirstOrDefaultAsync(p => p.Id == protocol.Id);

        //        if (existingProtocol != null)
        //        {
        //            _context.Protocols.Update(protocol);
        //        }
        //        else
        //        {
        //            _context.Protocols.Add(protocol);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Protocol> GetProtocolByIdAsync(int id)
        //{
        //    return await _context.Protocols.SingleAsync(p => p.Id == id);
        //}
        //public async Task<Protocol> GetProtocolByDescriptionAsync(string description)
        //{
        //    return await _context.Protocols.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Protocol>> GetProtocolsAsync()
        //{
        //    return await _context.Protocols.ToListAsync();
        //}

        //#endregion

        //#region Freezer
        //public async Task<Tuple<bool, string>> SaveFreezerAsync(Freezer freezer)
        //{
        //    try
        //    {
        //        var existingFreezer = await _context.Freezers.FirstOrDefaultAsync(p => p.Id == freezer.Id);

        //        if (existingFreezer != null)
        //        {
        //            _context.Freezers.Update(freezer);
        //        }
        //        else
        //        {
        //            _context.Freezers.Add(freezer);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Freezer> GetFreezerByIdAsync(int id)
        //{
        //    return await _context.Freezers.SingleAsync(p => p.Id == id);
        //}
        //public async Task<Freezer> GetFreezerByDescriptionAsync(string description)
        //{
        //    return await _context.Freezers.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Freezer>> GetFreezersAsync()
        //{
        //    return await _context.Freezers.ToListAsync();
        //}

        //#endregion

        //#region Rack
        //public async Task<Tuple<bool, string>> SaveRackAsync(Rack rack)
        //{
        //    try
        //    {
        //        var existingRack = await _context.Racks.FirstOrDefaultAsync(p => p.Id == rack.Id);

        //        if (existingRack != null)
        //        {
        //            _context.Racks.Update(rack);
        //        }
        //        else
        //        {
        //            _context.Racks.Add(rack);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Rack> GetRackByIdAsync(int id)
        //{
        //    return await _context.Racks.SingleAsync(p => p.Id == id);
        //}
        //public async Task<Rack> GetRackByDescriptionAsync(string description)
        //{
        //    return await _context.Racks.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Rack>> GetRacksAsync()
        //{
        //    return await _context.Racks.ToListAsync();
        //}

        //#endregion

        //#region Level
        //public async Task<Tuple<bool, string>> SaveLevelAsync(Level level)
        //{
        //    try
        //    {
        //        var existingLevel = await _context.Levels.FirstOrDefaultAsync(p => p.Id == level.Id);

        //        if (existingLevel != null)
        //        {
        //            _context.Levels.Update(level);
        //        }
        //        else
        //        {
        //            _context.Levels.Add(level);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<Level> GetLevelByIdAsync(int id)
        //{
        //    return await _context.Levels.SingleAsync(p => p.Id == id);
        //}
        //public async Task<Level> GetLevelByDescriptionAsync(string description)
        //{
        //    return await _context.Levels.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<Level>> GetLevelsAsync()
        //{
        //    return await _context.Levels.ToListAsync();
        //}

        //#endregion

        //#region SpecimenContainer
        //public async Task<Tuple<bool, string>> SaveSpecimenContainerAsync(SpecimenContainer specimenContainer)
        //{
        //    try
        //    {
        //        var existingSpecimenContainer = await _context.SpecimenContainers.FirstOrDefaultAsync(p => p.Id == specimenContainer.Id);

        //        if (existingSpecimenContainer != null)
        //        {
        //            _context.SpecimenContainers.Update(specimenContainer);
        //        }
        //        else
        //        {
        //            _context.SpecimenContainers.Add(specimenContainer);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<SpecimenContainer> GetSpecimenContainerByIdAsync(int id)
        //{
        //    return await _context.SpecimenContainers.SingleAsync(p => p.Id == id);
        //}
        //public async Task<SpecimenContainer> GetSpecimenContainerByDescriptionAsync(string description)
        //{
        //    return await _context.SpecimenContainers.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<SpecimenContainer>> GetSpecimenContainersAsync()
        //{
        //    return await _context.SpecimenContainers.ToListAsync();
        //}

        //#endregion

        //#region ConsVersion
        //public async Task<Tuple<bool, string>> SaveConsVersionAsync(ConsVersion consVersion)
        //{
        //    try
        //    {
        //        var existingConsVersion = await _context.ConsVersions.FirstOrDefaultAsync(p => p.Id == consVersion.Id);

        //        if (existingConsVersion != null)
        //        {
        //            _context.ConsVersions.Update(consVersion);
        //        }
        //        else
        //        {
        //            _context.ConsVersions.Add(consVersion);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<ConsVersion> GetConsVersionByIdAsync(int id)
        //{
        //    return await _context.ConsVersions.SingleAsync(p => p.Id == id);
        //}
        //public async Task<ConsVersion> GetConsVersionByDescriptionAsync(string description)
        //{
        //    return await _context.ConsVersions.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<ConsVersion>> GetConsVersionsAsync()
        //{
        //    return await _context.ConsVersions.ToListAsync();
        //}

        //#endregion

        //#region ConsDenyReason
        //public async Task<Tuple<bool, string>> SaveConsDenyReasonAsync(ConsDenyReason consDenyReason)
        //{
        //    try
        //    {
        //        var existingConsDenyReason = await _context.ConsDenyReasons.FirstOrDefaultAsync(p => p.Id == consDenyReason.Id);

        //        if (existingConsDenyReason != null)
        //        {
        //            _context.ConsDenyReasons.Update(consDenyReason);
        //        }
        //        else
        //        {
        //            _context.ConsDenyReasons.Add(consDenyReason);
        //        }
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //public async Task<ConsDenyReason> GetConsDenyReasonByIdAsync(int id)
        //{
        //    return await _context.ConsDenyReasons.SingleAsync(p => p.Id == id);
        //}
        //public async Task<ConsDenyReason> GetConsDenyReasonByDescriptionAsync(string description)
        //{
        //    return await _context.ConsDenyReasons.SingleAsync(p => p.Description == description);
        //}
        //public async Task<List<ConsDenyReason>> GetConsDenyReasonsAsync()
        //{
        //    return await _context.ConsDenyReasons.ToListAsync();
        //}

        //#endregion

        //#region Diagnosis

        //public async Task<Tuple<bool, string>> SaveDiagnosisAsync(SaveDiagnosisModel saveDiagnosis)
        //{
        //    try
        //    {
        //        // AnatomicSite
        //        var anatomicSite = await _context.AnatomicSites.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.AnatomicSite && p.Malignant == saveDiagnosis.Malignant);
        //        if (anatomicSite == null)
        //        {
        //            var newAnatomicSite = new AnatomicSite() { Description = saveDiagnosis.AnatomicSite, Enabled = true, Malignant = saveDiagnosis.Malignant };
        //            _context.AnatomicSites.Add(newAnatomicSite);
        //            await _context.SaveChangesAsync();
        //            anatomicSite = await _context.AnatomicSites.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.AnatomicSite && p.Malignant == saveDiagnosis.Malignant);
        //        }
        //        var anatomicSiteId = anatomicSite.Id;

        //        if (saveDiagnosis.Malignant)
        //        {
        //            saveDiagnosis.TissueType = "Malignant";
        //        }

        //        //TissueType
        //        var tissueType = await _context.TissueTypes.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.TissueType && p.AnatomicSiteId == anatomicSiteId);
        //        if (tissueType == null)
        //        {
        //            var newTissueType = new TissueType() { Description = saveDiagnosis.TissueType, Enabled = true, AnatomicSiteId = anatomicSiteId };
        //            _context.TissueTypes.Add(newTissueType);
        //            await _context.SaveChangesAsync();
        //            tissueType = await _context.TissueTypes.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.TissueType && p.AnatomicSiteId == anatomicSiteId);
        //        }
        //        var tissueTypeId = tissueType.Id;

        //        //Diagnosis
        //        var diagnosis = await _context.Diagnosises.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.Diagnosis && p.TissueTypeId == tissueTypeId);
        //        if (diagnosis == null)
        //        {
        //            var newDiagnosis = new Diagnosis() { Description = saveDiagnosis.Diagnosis, Enabled = true, TissueTypeId = tissueTypeId };
        //            _context.Diagnosises.Add(newDiagnosis);
        //            await _context.SaveChangesAsync();
        //            diagnosis = await _context.Diagnosises.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.Diagnosis && p.TissueTypeId == tissueTypeId);
        //        }
        //        var diagnosisId = diagnosis.Id;

        //        //DiagnosisSubClass
        //        var diagnosisSubClass = await _context.DiagnosisSubClasses.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.DiagnosisSubClass && p.DiagnosisId == diagnosisId);
        //        if (diagnosisSubClass == null)
        //        {
        //            var newDiagnosisSubClass = new DiagnosisSubClass() { Description = saveDiagnosis.DiagnosisSubClass, Enabled = true, DiagnosisId = diagnosisId };
        //            _context.DiagnosisSubClasses.Add(newDiagnosisSubClass);
        //            await _context.SaveChangesAsync();
        //            diagnosisSubClass = await _context.DiagnosisSubClasses.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.DiagnosisSubClass && p.DiagnosisId == diagnosisId);
        //        }
        //        var diagnosisSubClassId = diagnosisSubClass.Id;

        //        //DiagnosisModifier
        //        var diagnosisModifier = await _context.DiagnosisModifiers.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.DiagnosisModifier && p.DiagnosisSubClassId == diagnosisSubClassId);
        //        if (diagnosisModifier == null)
        //        {
        //            var newDiagnosisModifier = new DiagnosisModifier() { Description = saveDiagnosis.DiagnosisModifier, Enabled = true, DiagnosisSubClassId = diagnosisSubClassId };
        //            _context.DiagnosisModifiers.Add(newDiagnosisModifier);
        //            await _context.SaveChangesAsync();
        //            diagnosisModifier = await _context.DiagnosisModifiers.FirstOrDefaultAsync(p => p.Description == saveDiagnosis.DiagnosisModifier && p.DiagnosisSubClassId == diagnosisSubClassId);
        //        }
        //        var diagnosisModifierId = diagnosisModifier.Id;
        //    }
        //    catch (Exception ex)
        //    {
        //        return Tuple.Create(false, ex.Message);
        //    }
        //    return Tuple.Create(true, string.Empty);
        //}
        //#endregion
    }
}
