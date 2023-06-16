using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OsinavPortal.ViewModel
{
    public class SinavModel
    {
        public int sinavId { get; set; }
        public string sinavAdi { get; set; }
        public int sinavSuresi { get; set; }
        public int sinavDersId { get; set; }
        public int soruSayisi { get; set; }
    }
}