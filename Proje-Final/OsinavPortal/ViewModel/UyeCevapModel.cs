using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OsinavPortal.ViewModel
{
    public class UyeCevapModel
    {
        public int uyeCevapId { get; set; }
        public int uId { get; set; }
        public int secId { get; set; }
        public UyeModel uyeBilgi { get; set; }       
        public SecenekModel secenekBilgi { get; set; }
        public SoruModel soruBilgi { get; set; }
        public SinavModel sinavBilgi { get; set; }
        public DersModel dersBilgi { get; set;}
    }
}