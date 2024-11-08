using Barcoding.Server.OIDC.TokenValidators;

namespace Barcoding.Server.OIDC
{
    public class TokenValidatorOptions
    {
        private readonly Dictionary<string, Type> validatorMap = new(StringComparer.OrdinalIgnoreCase);

        public void AddValidator<T>(string provider) where T : TokenValidator
        {
            ArgumentNullException.ThrowIfNull(provider);

            validatorMap[provider] = typeof(T);
        }

        public Type? GetValidator(string provider)
        {
            ArgumentNullException.ThrowIfNull(provider);

            return validatorMap.TryGetValue(provider, out var value) ? value : null;
        }
    }
}
