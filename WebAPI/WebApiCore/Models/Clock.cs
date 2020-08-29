using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models
{
    public class Clock
    {
        public ObjectId _id { get; set; }
        public DateTime Started { get; set; }
        public DateTime Ended { get; set; } 
        public bool IsOver { get; set; } = false;
    }
}
