using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OsinavPortal.ViewModel
{
    public class UyeDersModel
    {
        public int uyedersId { get; set; }
        public int dId { get; set; }
        public int uId { get; set; }
        public UyeModel uyeBilgi { get; set; }
        public DersModel dersBilgi { get; set; }

    }
}