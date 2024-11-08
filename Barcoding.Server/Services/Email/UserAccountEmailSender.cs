using Barcoding.Server.Configuration;
using Microsoft.Extensions.Options;

namespace Barcoding.Server.Services.Email
{
    public class UserAccountEmailSender(IOptions<AppSettings> config, ILogger<EmailSender> logger) :
        EmailSender(config, logger)
    {
        public async Task<(bool success, string? errorMsg)> SendEmailConfirmationEmailAsync(string baseURL,
            string emailConfirmationToken, string recipientUserId, string recipientName, string recipientEmail)
        {
            var callbackUrl = EmailTemplates.GetConfirmEmailCallbackUrl(baseURL, recipientUserId,
                emailConfirmationToken);
            var message = EmailTemplates.GetConfirmEmailMessage(recipientName, callbackUrl);

            return await SendEmailAsync(recipientName, recipientEmail, "Confirm your email", message);
        }

        public async Task<(bool success, string? errorMsg)> SendPasswordResetEmailAsync(string baseURL,
            string passwordResetToken, string recipientName, string recipientEmail)
        {
            var callbackUrl = EmailTemplates.GetResetPasswordCallbackUrl(baseURL, passwordResetToken);
            var message = EmailTemplates.GetResetPasswordEmailMessage(recipientName, callbackUrl);

            return await SendEmailAsync(recipientName, recipientEmail, "Reset Password", message);
        }
    }
}
