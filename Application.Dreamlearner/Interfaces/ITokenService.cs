using Domain.Dreamlearner.Entities;

namespace Infrastructure.Dreamlearner.Identity
{
    public interface ITokenService
    {
        string GenerateToken(AppUser user);
    }
}
