using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApiCore.Models;
using WebApiCore.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiCore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        public IConfiguration Configuration { get; }
        public IUserService UserService { get; }

        public UserController(IConfiguration configuration, IUserService userService)
        {
            Configuration = configuration;
            UserService = userService;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login(LoginModel model)
        {
            var t = UserService.Login(model);
            if (t != null)
            {
                if (t.LastClock.Year == 1)
                {
                    return Ok(new { token = t.Token });
                }
                return Ok(new { token = t.Token, lastclock = t.LastClock.ToString("dd-MM-yyyy H:mm") });
            }
            return Ok(new { status = false, res = t });
        }

        [HttpPost("stopclock")]
        public ActionResult StopClock(ClockOutModel model)
        {
            var res = UserService.StopClock(model.Token);
            bool status = false;
            string resMsg = "";
            switch (res)
            {
                case Enums.ClockActionResponse.ClockStopped:
                    status = true;
                    resMsg = "Clock stopepd!";
                    break;
                case Enums.ClockActionResponse.NoLastClock:
                    resMsg = "You dont have last clock!";
                    break;
                case Enums.ClockActionResponse.NotLoggedIn:
                    resMsg = "You are not logged in!";
                    break;

            }
            return Ok(new { status = status, res = resMsg });
        }

        [HttpPost("changepassword")]
        public ActionResult ChangePassword(ChangePasswordModel model)
        {
            var res = UserService.ChangePassword(model.Token, model.CurrentPassword, model.NewPassword);
            bool status = false;
            string resMsg = "";
            switch (res)
            {
                case Enums.ChangePasswordResponse.Ok:
                    status = true;
                    resMsg = "Password changed successfully";
                    break;
                case Enums.ChangePasswordResponse.NotLoggedIn:
                    resMsg = "You are not logged in!";
                    break;
                case Enums.ChangePasswordResponse.WrongCurrentPassword:
                    resMsg = "Wrong current password!";
                    break;

            }
            return Ok(new { status = status, res = resMsg });


        }
        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult Register(RegisterModel model)
        {
            var res = UserService.AddNewUser(model);
            var resMsg = "";
            var status = false;
            switch (res)
            {
                case Enums.RegisterResponse.AlreadyExist:
                    resMsg = "User already exist!";
                    break;
                case Enums.RegisterResponse.Created:
                    status = true;
                    resMsg = "User created!";
                    break;
                
            }
            return Ok(new {status = status, res = resMsg });
        }
        [HttpPost("getclock")]
        public ActionResult GetClocks(GetClockModel model)
        {
            var res = UserService.GetClocks(model);
            return Ok(new { res = res.StrClocks });
        }
        [AllowAnonymous]
        [HttpPost("logout")]
        public ActionResult Logout(LogoutModel model)
        {
            var res = UserService.Logout(model.Token);
            return Ok(new { res = res });
        }
        [HttpPost("startclock")]
        public ActionResult StartClock(ClockOutModel model)
        {
            var res = UserService.AddNewClock(model.Token);
            bool status = false;
            string resMsg = "";
            switch (res)
            {
                case Enums.ClockActionResponse.ClockStarted:
                    status = true;
                    resMsg = "New clock added";
                    break;
                case Enums.ClockActionResponse.AlreadyHasClock:
                    resMsg = "You seem to already have an on going clock!";
                    break;
                case Enums.ClockActionResponse.NotLoggedIn:
                    resMsg = "You are not logged in!";
                    break;
              
            }
            return Ok(new { status = status, res = resMsg });
        }
        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
