using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Enums;
using WebApiCore.Models;

namespace WebApiCore.Services
{
    public class UserService : IUserService
    {
        private static MongoClient client = new MongoClient("mongodb://localhost:27017/admin");
        private static IMongoDatabase database = client.GetDatabase("test");
        private static IMongoCollection<User> collection = database.GetCollection<User>("user");
        public LoginResponseModel Login(LoginModel loginModel)
        {
            User user = collection.Find(x => x.Username.ToLower() == loginModel.Username.ToLower()).ToList().FirstOrDefault();
            if (user != null)
            {
                if (user.Password.ToLower() == loginModel.Password.ToLower())
                {
                    var token = TokenManager.CreateToken(user._id.ToString(), user.Username);
                    TokenManager.AddNewUser(token, user);
                    Clock c = GetLastClock(user);
                    if (c != null && !c.IsOver)
                    {
                        return new LoginResponseModel { Token = token, LastClock = c.Started };
                    }
                    else
                    {
                        return new LoginResponseModel { Token = token };
                    }
                }
                else
                {
                    return null;
                }
            }
            else
                return null;
        }
        public ClockActionResponse AddNewClock(string token)
        {
            User user = TokenManager.GetUser(token);
            if (user != null)
            {
                if (user.Clocks == null)
                    user.Clocks = new List<Clock>();
                Clock lastClock = GetLastClock(user);
                if (lastClock != null && !lastClock.IsOver)
                {
                    return ClockActionResponse.AlreadyHasClock;
                }
                user.Clocks.Add(new Clock { Started = DateTime.Now });
                UpdateUser(user);
                TokenManager.ReplaceUser(token, user);
                return ClockActionResponse.ClockStarted;
            }
            else
            {
                return ClockActionResponse.NotLoggedIn;
            }
        }

        private static void UpdateUser(User user)
        {
            var filter = Builders<User>.Filter.Eq("_id", user._id);
            collection.ReplaceOne(filter, user);
        }

        public ClockActionResponse StopClock(string token)
        {
            User user = TokenManager.GetUser(token);
            if (user != null)
            {
                if (user.Clocks == null)
                    return ClockActionResponse.NoLastClock;
                Clock clock = GetLastClock(user);
                if (clock == null || clock.IsOver)
                    return ClockActionResponse.NoLastClock;

                clock.IsOver = true;
                clock.Ended = DateTime.Now;
                UpdateUser(user);
                TokenManager.ReplaceUser(token, user);
                return ClockActionResponse.ClockStopped;
            }
            else
            {
                return ClockActionResponse.NotLoggedIn;
            }
        }

        private static Clock GetLastClock(User user)
        {
            Clock c = null;
            if (user.Clocks.Count != 0)
            {
                c = user.Clocks?.Last();
            }
            return c;
        }

        public RegisterResponse AddNewUser(RegisterModel model)
        {
            User user = GetUser(model.Username);
            if (user != null)
                return RegisterResponse.AlreadyExist;
            collection.InsertOne(new User { Username = model.Username, Password = model.Password });
            return RegisterResponse.Created;
        }

        private User GetUser(string username)
        {
           return collection.Find(x => x.Username.ToLower() == username.ToLower()).ToList().FirstOrDefault();
        }

        public string Logout(string token)
        {
            TokenManager.RemoveUser(token);
            return "Goodbye";
        }

        public ChangePasswordResponse ChangePassword(string token, string currentPassword, string newPassword)
        {
            User user = TokenManager.GetUser(token);
            if (user != null)
            {
                if (currentPassword.ToLower() != user.Password.ToLower())
                {
                    return ChangePasswordResponse.WrongCurrentPassword;
                }
                user.Password = newPassword;
                UpdateUser(user);
                return ChangePasswordResponse.Ok;
            }
            else
            {
                return ChangePasswordResponse.NotLoggedIn;
            }
        }

        public GetClockResponseModel GetClocks( GetClockModel model )
        {
            User user = TokenManager.GetUser(model.Token);
            GetClockResponseModel res = new GetClockResponseModel();
            res.GetClockResponse = GetClockResponse.NotLoggedIn;
            if (user != null)
            {
                List<Clock> clocks = user.Clocks.Where(x => x.Started > model.StartTime && x.Ended < model.EndTime).ToList();
                res.Clocks = clocks;
                return res;
            }
            else
            {
                return res;
            }
        }
    }
}
