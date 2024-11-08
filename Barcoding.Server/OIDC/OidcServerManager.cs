using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Barcoding.Server.OIDC
{
    public static class OidcServerManager
    {
        public const string ServerName = "Barcode API";
        public const string BarcodeClientID = "barcode_spa";
        public const string SwaggerClientID = "swagger_ui";
        public const string ExtensionGrantType = "assertion";

        public static async Task RegisterClientApplicationsAsync(IServiceProvider provider)
        {
            var manager = provider.GetRequiredService<IOpenIddictApplicationManager>();

            // Angular SPA Client
            if (await manager.FindByClientIdAsync(BarcodeClientID) is null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = BarcodeClientID,
                    ClientType = ClientTypes.Public,
                    DisplayName = "Barcode SPA",
                    Permissions =
                    {
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.Password,
                        Permissions.GrantTypes.RefreshToken,
                        Permissions.Prefixes.GrantType + ExtensionGrantType,
                        Permissions.Scopes.Profile,
                        Permissions.Scopes.Email,
                        Permissions.Scopes.Phone,
                        Permissions.Scopes.Address,
                        Permissions.Scopes.Roles
                    }
                });
            }

            // Swagger UI Client
            if (await manager.FindByClientIdAsync(SwaggerClientID) is null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = SwaggerClientID,
                    ClientType = ClientTypes.Public,
                    DisplayName = "Swagger UI",
                    Permissions =
                    {
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.Password
                    }
                });
            }
        }
    }
}
