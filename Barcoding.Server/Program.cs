using Barcoding.Core;
using Barcoding.Core.Infrastructure;
using Barcoding.Core.Interfaces;
using Barcoding.Core.Models.Account;
using Barcoding.Core.Services;
using Barcoding.Core.Services.Account;
using Barcoding.Core.Services.Account.Interfaces;
using Barcoding.Server.Authorization;
using Barcoding.Server.Authorization.Requirements;
using Barcoding.Server.Configuration;
using Barcoding.Server.OIDC;
using Barcoding.Server.OIDC.TokenValidators;
using Barcoding.Server.Services;
using Barcoding.Server.Services.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Microsoft.OpenApi.Models;
using OpenIddict.Validation.AspNetCore;
using Quartz;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using static OpenIddict.Abstractions.OpenIddictConstants;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        /************* ADD SERVICES *************/

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                        throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        var migrationsAssembly = typeof(Program).GetTypeInfo().Assembly.GetName().Name;

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly(migrationsAssembly));
            options.UseOpenIddict();
        });

        // Add Identity
        builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        // Configure Identity options and password complexity here
        builder.Services.Configure<IdentityOptions>(options =>
        {
            // User settings
            options.User.RequireUniqueEmail = true;

            // Password settings
            /*
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 8;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = false;

            // Lockout settings
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
            options.Lockout.MaxFailedAccessAttempts = 10;
            */

            // Configure Identity to use the same JWT claims as OpenIddict
            options.ClaimsIdentity.UserNameClaimType = Claims.Name;
            options.ClaimsIdentity.UserIdClaimType = Claims.Subject;
            options.ClaimsIdentity.RoleClaimType = Claims.Role;
            options.ClaimsIdentity.EmailClaimType = Claims.Email;
        });

        // Configure OpenIddict periodic pruning of orphaned authorizations/tokens from the database.
        builder.Services.AddQuartz(options =>
        {
            options.UseSimpleTypeLoader();
            options.UseInMemoryStore();
        });

        // Register the Quartz.NET service and configure it to block shutdown until jobs are complete.
        builder.Services.AddQuartzHostedService(options => options.WaitForJobsToComplete = true);

        builder.Services.AddOpenIddict()
            .AddCore(options =>
            {
                options.UseEntityFrameworkCore()
                       .UseDbContext<ApplicationDbContext>();

                options.UseQuartz();
            })
            .AddServer(options =>
            {
                options.SetTokenEndpointUris("connect/token");

                options.AllowPasswordFlow()
                       .AllowCustomFlow(OidcServerManager.ExtensionGrantType)
                       .AllowRefreshTokenFlow();

                options.RegisterScopes(
                    Scopes.Profile,
                    Scopes.Email,
                    Scopes.Address,
                    Scopes.Phone,
                    Scopes.Roles);

                if (builder.Environment.IsDevelopment())
                {
                    options.AddDevelopmentEncryptionCertificate()
                           .AddDevelopmentSigningCertificate();
                }
                else
                {
                    var oidcCertFileName = builder.Configuration["OIDC:Certificates:Path"];
                    var oidcCertFilePassword = builder.Configuration["OIDC:Certificates:Password"];

                    if (string.IsNullOrWhiteSpace(oidcCertFileName))
                    {
                        // You must configure persisted keys for Encryption and Signing.
                        // See https://documentation.openiddict.com/configuration/encryption-and-signing-credentials.html
                        options.AddEphemeralEncryptionKey()
                               .AddEphemeralSigningKey();
                    }
                    else
                    {
                        var oidcCertificate = new X509Certificate2(oidcCertFileName, oidcCertFilePassword);

                        options.AddEncryptionCertificate(oidcCertificate)
                               .AddSigningCertificate(oidcCertificate);
                    }
                }

                options.UseAspNetCore()
                       .EnableTokenEndpointPassthrough();
            })
            .AddValidation(options =>
            {
                options.UseLocalServer();
                options.UseAspNetCore();
            });

        // Add external authentication providers
        builder.Services.AddExternalLoginValidators(options =>
        {
            options.AddValidator<GoogleTokenValidator>("google");
            options.AddValidator<FacebookTokenValidator>("facebook");
            options.AddValidator<TwitterTokenValidator>("twitter");
            options.AddValidator<MicrosoftTokenValidator>("microsoft");
        });

        builder.Services.AddAuthentication(o =>
        {
            o.DefaultScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
            o.DefaultAuthenticateScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
            o.DefaultChallengeScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
        });

        builder.Services.AddAuthorizationBuilder()
            .AddPolicy(AuthPolicies.ViewAllUsersPolicy,
                policy => policy.RequireClaim(CustomClaims.Permission, ApplicationPermissions.ViewUsers))
            .AddPolicy(AuthPolicies.ManageAllUsersPolicy,
                policy => policy.RequireClaim(CustomClaims.Permission, ApplicationPermissions.ManageUsers))
            .AddPolicy(AuthPolicies.ViewAllRolesPolicy,
                policy => policy.RequireClaim(CustomClaims.Permission, ApplicationPermissions.ViewRoles))
            .AddPolicy(AuthPolicies.ViewRoleByRoleNamePolicy,
                policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()))
            .AddPolicy(AuthPolicies.ManageAllRolesPolicy,
                policy => policy.RequireClaim(CustomClaims.Permission, ApplicationPermissions.ManageRoles))
            .AddPolicy(AuthPolicies.AssignAllowedRolesPolicy,
                policy => policy.Requirements.Add(new AssignRolesAuthorizationRequirement()));

        // Add cors
        builder.Services.AddCors();

        builder.Services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = OidcServerManager.ServerName, Version = "v1" });
            c.OperationFilter<SwaggerAuthorizeOperationFilter>();
            c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    Password = new OpenApiOAuthFlow
                    {
                        TokenUrl = new Uri("/connect/token", UriKind.Relative)
                    }
                }
            });
        });

        builder.Services.AddAutoMapper(typeof(Program));

        // Configurations
        builder.Services.Configure<AppSettings>(builder.Configuration);

        // Business Services
        builder.Services.AddScoped<IUserAccountService, UserAccountService>();
        builder.Services.AddScoped<IUserRoleService, UserRoleService>();
        
        //Managers
        builder.Services.AddScoped<IMaintenanceManager, MaintenanceManager>();

        // Other Services
        builder.Services.AddScoped<IEmailSender, EmailSender>();
        builder.Services.AddScoped<UserAccountEmailSender>();
        builder.Services.AddScoped<IUserIdAccessor, UserIdAccessor>();

        // Auth Handlers
        builder.Services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
        builder.Services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
        builder.Services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
        builder.Services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();

        // DB Creation and Seeding
        builder.Services.AddTransient<IDatabaseSeeder, DatabaseSeeder>();

        //File Logger
        builder.Logging.AddFile(builder.Configuration.GetSection("Logging"));

        //Email Templates
        EmailTemplates.Initialize(builder.Environment);

        var app = builder.Build();

        /************* CONFIGURE REQUEST PIPELINE *************/

        app.UseDefaultFiles();
        app.UseStaticFiles();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.DocumentTitle = "Swagger UI - Barcoding";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{OidcServerManager.ServerName} V1");
                c.OAuthClientId(OidcServerManager.SwaggerClientID);
            });

            IdentityModelEventSource.ShowPII = true;
        }
        else
        {
            // The default HSTS value is 30 days.
            // You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.MapFallbackToFile("/index.html");

        /************* SEED DATABASE *************/

        using var scope = app.Services.CreateScope();
        try
        {
            var dbSeeder = scope.ServiceProvider.GetRequiredService<IDatabaseSeeder>();
            var appSettings = scope.ServiceProvider.GetRequiredService<IOptions<AppSettings>>();

            await dbSeeder.SeedAsync(appSettings.Value.DefaultUserRole);

            await OidcServerManager.RegisterClientApplicationsAsync(scope.ServiceProvider);
        }
        catch (Exception ex)
        {
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            logger.LogCritical(ex, "An error occured whilst creating/seeding database");

            throw;
        }

        /************* RUN APP *************/

        app.Run();
    }
}