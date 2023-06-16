using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OsinavPortal.ViewModel
{
    public class SecenekModel
    {
        public int secenekId { get; set; }
        public string secenekText { get; set; }
        public int cevap { get; set; }
        public int secSoruId { get; set; }
    }
}