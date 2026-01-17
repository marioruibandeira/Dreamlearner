
using Application.Dreamlearner.DTOs.Requests;
using Application.Dreamlearner.DTOs.Responses;
using Microsoft.AspNetCore.Identity;

namespace Application.Dreamlearner.Interfaces
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(RegisterRequest request);
        Task<AuthResponse?> LoginAsync(string email, string password);
    }
}
