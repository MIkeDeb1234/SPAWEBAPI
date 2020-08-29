using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApiCore.Models;

namespace WebApiCore.Services
{
    public class TokenManager
    {

        private static Dictionary<string, User> Users = new Dictionary<string, User>();


        public const string TokenKey = "kgndutlekhptogf";
        public static string CreateToken(string id, string username)
        {
            //Claims
            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier,id),
                new Claim(ClaimTypes.Name,username),
            };
            //Key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey));
            //Creds
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Token Desc
            var tokenDesc = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(2),
                SigningCredentials = cred
            };
            //Token Hanlder
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDesc);
            return tokenHandler.WriteToken(token);
        }

        public static void AddNewUser(string token, User user)
        {
            Users.Add(token, user);
        }
        public static User GetUser(string token)
        {
            try
            {
                return Users[token];
            }
            catch
            {

                return null;
            }
        }
        public static void ReplaceUser(string token, User user)
        {
            if (GetUser(token) != null)
            {
                Users[token] = user;
            }

        }
        public static void RemoveUser(string token)
        {
            Users.Remove(token);
        }
    }
}
