using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Enums
{
    public enum ClockActionResponse
    {
        ClockStopped,
        ClockStarted,
        AlreadyHasClock,
        NoLastClock,
        NotLoggedIn
    }
}
