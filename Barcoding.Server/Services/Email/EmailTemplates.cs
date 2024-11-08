using System.Text.Encodings.Web;

namespace Barcoding.Server.Services.Email
{
    public static class EmailTemplates
    {
        private static IWebHostEnvironment? _hostingEnvironment;
        private static string? testEmailTemplate;
        private static string? plainTextTestEmailTemplate;
        private static string? confirmAccountEmailTemplate;
        private static string? resetPasswordEmailTemplate;

        public static void Initialize(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public static string GetTestEmail(string recipientName, DateTime testDate)
        {
            testEmailTemplate ??= ReadPhysicalFile("Services/Email/Templates/TestEmail.template");

            var emailMessage = testEmailTemplate
                .Replace("{user}", recipientName)
                .Replace("{testDate}", testDate.ToString());

            return emailMessage;
        }

        public static string GetPlainTextTestEmail(DateTime date)
        {
            plainTextTestEmailTemplate ??= ReadPhysicalFile("Services/Email/Templates/PlainTextTestEmail.template");

            var emailMessage = plainTextTestEmailTemplate
                .Replace("{date}", date.ToString());

            return emailMessage;
        }

        public static string GetConfirmAccountEmailMessage(
            string baseUrl, string recipientName, string userId, string emailConfirmationToken)
        {
            return GetConfirmEmailMessage(recipientName,
                GetConfirmEmailCallbackUrl(baseUrl, userId, emailConfirmationToken));
        }

        public static string GetConfirmEmailMessage(string recipientName, string callbackUrl)
        {
            confirmAccountEmailTemplate ??= ReadPhysicalFile("Services/Email/Templates/ConfirmAccountEmail.template");

            var emailMessage = confirmAccountEmailTemplate
                 .Replace("{user}", recipientName)
                 .Replace("{url}", HtmlEncoder.Default.Encode(callbackUrl));

            return emailMessage;
        }

        public static string GetConfirmEmailCallbackUrl(string baseUrl, string userId, string emailConfirmationToken)
        {
            return $"{baseUrl.TrimEnd('/')}/ConfirmEmail?userId={userId}&code={emailConfirmationToken}";
        }

        public static string GetResetPasswordEmailMessage(string recipientName, string callbackUrl)
        {
            resetPasswordEmailTemplate ??= ReadPhysicalFile("Services/Email/Templates/ResetPasswordEmail.template");

            var emailMessage = resetPasswordEmailTemplate
                 .Replace("{user}", recipientName)
                 .Replace("{url}", HtmlEncoder.Default.Encode(callbackUrl));

            return emailMessage;
        }

        public static string GetResetPasswordCallbackUrl(string baseUrl, string passwordResetToken)
        {
            return $"{baseUrl.TrimEnd('/')}/ResetPassword?code={passwordResetToken}";
        }

        private static string ReadPhysicalFile(string path)
        {
            if (_hostingEnvironment == null)
                throw new InvalidOperationException($"{nameof(EmailTemplates)} is not initialized");

            var fileInfo = _hostingEnvironment.ContentRootFileProvider.GetFileInfo(path);

            if (!fileInfo.Exists)
                throw new FileNotFoundException($"Template file located at \"{path}\" was not found");

            using var fs = fileInfo.CreateReadStream();
            using var sr = new StreamReader(fs);
            return sr.ReadToEnd();
        }
    }
}
