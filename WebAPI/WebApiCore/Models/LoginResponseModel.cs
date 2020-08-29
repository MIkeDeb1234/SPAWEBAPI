using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models
{
    public class LoginResponseModel
    {
        public string Token { get; set; }
        public DateTime LastClock { get; set; }
    }
}
