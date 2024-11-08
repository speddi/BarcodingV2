﻿using System.Diagnostics.CodeAnalysis;

namespace Barcoding.Core.Models.Account
{
    public class ApplicationPermission(string name, string value, string groupName, string? description = null)
    {
        public string Name { get; set; } = name;
        public string Value { get; set; } = value;
        public string GroupName { get; set; } = groupName;
        public string? Description { get; set; } = description;

        public override string ToString() => Value;

        [return: NotNullIfNotNull(nameof(permission))]
        public static implicit operator string?(ApplicationPermission? permission)
        {
            return permission?.Value;
        }
    }
}
