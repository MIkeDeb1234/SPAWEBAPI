using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models
{
    public class User
    {
        public ObjectId _id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public List<Clock> Clocks { get; set; } = new List<Clock>();
    }
}
