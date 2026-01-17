using Application.Dreamlearner.DTOs.Requests;
using Application.Dreamlearner.DTOs.Responses;
using Application.Dreamlearner.Interfaces;
using Domain.Dreamlearner.Entities;
using Infrastructure.Dreamlearner.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.Dreamlearner.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public AuthService(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<IdentityResult> RegisterAsync(RegisterRequest request)
        {
            var user = AppUser.Create(request.FullName, request.Email);

            var result = await _userManager.CreateAsync(user, request.Password);

            if(!result.Succeeded)
                return result;

            return result;
        }

        public async  Task<AuthResponse?> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return null;

            var isValid = await _userManager.CheckPasswordAsync(user, password);
            if (!isValid)
                return null;

            var token = _tokenService.GenerateToken(user);
            return new AuthResponse(token, user.Email, user.FullName);
        }

    }
}
