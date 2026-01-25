using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dreamlearner.DTOs.Requests
{
    public record RegisterRequest(string FullName, string Email, string Password);
}
