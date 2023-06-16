using OsinavPortal.Models;
using OsinavPortal.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OsinavPortal.Auth
{
    public class UyeService
    {
        Database1Entities db = new Database1Entities();

        public UyeModel UyeOturumAc(string mail, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.mail == mail && s.parola == parola).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                adsoyad = x.adsoyad,
                mail = x.mail,  
                parola = x.parola,
                admin = x.admin
            }).SingleOrDefault();
            return uye;

        }
    }
}