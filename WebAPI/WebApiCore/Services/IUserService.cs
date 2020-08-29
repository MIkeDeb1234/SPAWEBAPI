using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Enums;
using WebApiCore.Models;

namespace WebApiCore.Services
{
    public interface IUserService
    {
        LoginResponseModel Login(LoginModel loginModel);
        ClockActionResponse AddNewClock(string token);
        ClockActionResponse StopClock(string token);
        RegisterResponse AddNewUser(RegisterModel model);
        string Logout(string token);
        ChangePasswordResponse ChangePassword(string token, string currentPassword, string newPassword);
        GetClockResponseModel GetClocks(GetClockModel model);
    }
}
