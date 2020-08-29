using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Enums;

namespace WebApiCore.Models
{
    public class ReturnClock
    {
        public string Started { get; set; }
        public string Ended { get; set; }
        public bool Done { get; set; }
    }
    public class GetClockResponseModel
    {
        public List<Clock> Clocks { get; set; } = new List<Clock>();
        public List<ReturnClock> StrClocks
        {
            get
            {
                List<ReturnClock> clocks = new List<ReturnClock>();
                foreach (var c in Clocks)
                {
                    clocks.Add(
                        new ReturnClock
                        {
                            Started = c.Started.ToString("dd/MM/yyy HH:mm:ss"),
                            Ended = c.Ended.ToString("dd/MM/yyy HH:mm:ss"),
                            Done = c.IsOver
                        }) ;
                }
                return clocks;
            }
        }
        public GetClockResponse GetClockResponse { get; set; }
    }
}
