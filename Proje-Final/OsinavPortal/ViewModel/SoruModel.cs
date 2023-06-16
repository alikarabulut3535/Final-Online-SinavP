using OsinavPortal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OsinavPortal.ViewModel
{
    public class SoruModel
    {
        public int soruId { get; set; }
        public string soruText { get; set; }
        public int soruSinavId { get; set; }

        public List<SecenekModel> secenekler { get; set; }
    }
}