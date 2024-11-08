using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Barcoding.Core.Interfaces;
using Barcoding.Core.Models;
using Barcoding.Server.Controllers;
using Barcoding.Server.ViewModels.Maintenance;


//using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barcoding.Server.Controllers.Maintenance
{
    //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Authorize]
    [Route("api/[controller]")]
    public class AgeModifierController : BaseApiController
    {
        private readonly IMaintenanceManager _maintenanceManager;
        private const string GetAgeModifierByIdActionName = "GetAgeModifierById";

        public AgeModifierController(IMaintenanceManager maintenanceManager, IMapper mapper, ILogger<AgeModifierController> logger)
             : base(logger, mapper)
        {
            _maintenanceManager = maintenanceManager;
        }

        [HttpGet("{id}", Name = GetAgeModifierByIdActionName)]
        [Produces(typeof(AgeModifierViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            var ageModifier = await _maintenanceManager.GetAgeModifierByIdAsync(id);
            if (ageModifier == null)
                return NotFound(id);

            var ageModifierViewModel = _mapper.Map<AgeModifierViewModel>(ageModifier);
            return Ok(ageModifierViewModel);
        }

        [HttpGet]
        [Produces(typeof(List<AgeModifierViewModel>))]
        public async Task<IActionResult> Get()
        {
            var ageModifiers = await _maintenanceManager.GetAgeModifiersAsync();
            return Ok(_mapper.Map<List<AgeModifierViewModel>>(ageModifiers));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AgeModifierViewModel ageModifier)
        {
            if (ModelState.IsValid)
            {
                if (ageModifier == null)
                    return BadRequest($"{nameof(ageModifier)} cannot be null");

                if (id != ageModifier.Id)
                    return BadRequest("Conflicting ageModifier id in parameter and model data");

                var existingAgeModifier = await _maintenanceManager.GetAgeModifierByIdAsync(id);

                if (existingAgeModifier == null)
                    return NotFound(id);

                _mapper.Map(ageModifier, existingAgeModifier);

                var result = await _maintenanceManager.SaveAgeModifierAsync(existingAgeModifier);
                if (result.Item1)
                    return NoContent();

                ModelState.AddModelError(string.Empty, result.Item2);
            }
            return BadRequest(ModelState);
        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] AgeModifierViewModel ageModifier)
        {
            if (ModelState.IsValid)
            {
                if (ageModifier == null)
                    return BadRequest($"{nameof(ageModifier)} cannot be null");

                var appAgeModifier = _mapper.Map<AgeModifier>(ageModifier);

                var result = await _maintenanceManager.SaveAgeModifierAsync(appAgeModifier);
                if (result.Item1)
                {
                    appAgeModifier = await _maintenanceManager.GetAgeModifierByDescriptionAsync(ageModifier.Description);
                    if (appAgeModifier != null)
                    {
                        var ageModifierViewModel = _mapper.Map<AgeModifierViewModel>(appAgeModifier);
                        return CreatedAtAction(nameof(Get), new { id = ageModifierViewModel.Id }, ageModifierViewModel);
                    }
                }
                ModelState.AddModelError(string.Empty, result.Item2);
            }
            return BadRequest(ModelState);
        }
    }
}
