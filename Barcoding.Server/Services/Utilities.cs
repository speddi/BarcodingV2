﻿using System.Security.Claims;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Barcoding.Server.Services
{
    public static class Utilities
    {
        public static void QuickLog(string text, string logPath)
        {
            var dirPath = Path.GetDirectoryName(logPath);

            if (string.IsNullOrWhiteSpace(dirPath))
                throw new ArgumentException($"Specified path \"{logPath}\" is invalid", nameof(logPath));

            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            using var writer = File.AppendText(logPath);
            writer.WriteLine($"{DateTime.Now} - {text}");
        }

        public static string? GetUserId(ClaimsPrincipal user)
        {
            return user.FindFirstValue(Claims.Subject)?.Trim();
        }

        public static string[] GetRoles(ClaimsPrincipal user)
        {
            return user.Claims
                .Where(c => c.Type == Claims.Role)
                .Select(c => c.Value)
                .ToArray();
        }

        public static string GetBaseUrl(HttpRequest httpRequest)
        {
            return $"{httpRequest.Scheme}://{httpRequest.Host}";
        }
    }
}
