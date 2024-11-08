namespace Barcoding.Core.Infrastructure
{
    public interface IDatabaseSeeder
    {
        Task SeedAsync(string? defaultUserRole);
    }
}
