using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OsinavPortal.ViewModel
{
    public class DersModel
    {
        public int dersId { get; set; }
        public string dersAdi { get; set; }
        public string dersKodu { get; set; }
        public int dersKredi { get; set; }
        public int dersOgrSayisi { get; set; }
    }
}