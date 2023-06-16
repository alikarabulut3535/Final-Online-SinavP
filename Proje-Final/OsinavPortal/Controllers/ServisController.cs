using OsinavPortal.Models;
using OsinavPortal.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OsinavPortal.Controllers
{
    
    public class ServisController : ApiController
    {
        Database1Entities db = new Database1Entities();
        SonucModel sonuc = new SonucModel();

        #region Uye

        [HttpGet]
        [Route("api/uyelistele")]
        
        public List<UyeModel> UyeListele()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                adsoyad=x.adsoyad,
                mail=x.mail,
                parola=x.parola,
                admin=x.admin,
                uyeDersSayisi = x.UyeDers.Count()
            }).ToList();
            return liste;

        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.uyeId == uyeId).Select(x => new
            UyeModel()
            {
                uyeId = x.uyeId,
                adsoyad = x.adsoyad,
                mail = x.mail,
                parola = x.parola,
                admin = x.admin,
                uyeDersSayisi = x.UyeDers.Count()
            }).SingleOrDefault();
            return kayit;

        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.mail == model.mail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Mail Sistemde kayıtlıdır!";
                return sonuc;
            }

            

            Uye yeni = new Uye();
            yeni.mail = model.mail;
            yeni.adsoyad = model.adsoyad;
            yeni.admin = model.admin;
            yeni.parola = model.parola;

            db.Uye.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi.";

            return sonuc;

        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == model.uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bulunmamaktadır!";
                return sonuc;
            }

            else if (db.Uye.Count(s => s.mail == model.mail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Mail Sistemde kayıtlıdır!";
                return sonuc;
            }

            
            kayit.adsoyad = model.adsoyad;
            kayit.parola = model.parola;
            kayit.admin = model.admin;
            kayit.mail = model.mail;


            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi.";

            return sonuc;

            

        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bulunmamaktadır!";
                return sonuc;
            }
            if (db.UyeDers.Count(s => s.uId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Üzerinde Ders Kaydı Olduğu İçin Üye silinemez!";
                return sonuc;
            }
            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi!";
            return sonuc;
        }
        #endregion 

        #region Ders

        [HttpGet]
        [Route("api/derslistele")]
        public List<DersModel> DersListele()
        {
            List<DersModel> liste = db.Ders.Select(x => new DersModel()
            {
                dersAdi = x.dersAdi,
                dersId = x.dersId,
                dersKodu = x.dersKodu,
                dersKredi = x.dersKredi,
                dersOgrSayisi=x.UyeDers.Count()
            }).ToList();
            return liste;

        }

        [HttpGet]
        [Route("api/dersbyid/{dersId}")]
        public DersModel DersById(int dersId)
        {
            DersModel kayit = db.Ders.Where(s => s.dersId == dersId).Select(x => new
            DersModel()
            {
                dersAdi = x.dersAdi,
                dersId = x.dersId,
                dersKodu = x.dersKodu,
                dersKredi = x.dersKredi,
                dersOgrSayisi = x.UyeDers.Count()
            }).SingleOrDefault();
            return kayit;

        }

        [HttpPost]
        [Route("api/dersekle")]
        public SonucModel DersEkle(DersModel model)
        {
            if (db.Ders.Count(s => s.dersKodu == model.dersKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kodu kayıtlıdır!";
                return sonuc;
            }
            if (db.Ders.Count(s=>s.dersAdi==model.dersAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu İsimde bir ders zaten kayıtlıdır!";
                return sonuc;
            }

            Ders yeni = new Ders();
            yeni.dersKodu = model.dersKodu;
            yeni.dersAdi = model.dersAdi;
            yeni.dersKredi = model.dersKredi;

            db.Ders.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Eklendi.";

            return sonuc;

        }

        [HttpPut]
        [Route("api/dersduzenle")]
        public SonucModel DersDuzenle(DersModel model)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == model.dersId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunmamaktadır!";
                return sonuc;
            }
            if (db.Ders.Count(s => s.dersKodu == model.dersKodu && s.dersId != model.dersId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kodu kayıtlıdır!";
                return sonuc;
            }
            if (db.Ders.Count(s => s.dersAdi == model.dersAdi && s.dersAdi != model.dersAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu İsimde bir ders zaten kayıtlıdır!";
                return sonuc;
            }
            kayit.dersKodu = model.dersKodu;
            kayit.dersAdi = model.dersAdi;
            kayit.dersKredi = model.dersKredi;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Düzenlendi.";

            return sonuc;

        }
        
        [HttpDelete]
        [Route("api/derssil/{dersId}")]
        public SonucModel DersSil(int dersId)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == dersId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunmamaktadır!";
                return sonuc;
            }
            if (db.UyeDers.Count(s => s.dId == dersId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Derse kayıtlı üye olduğu için ders silinemez!";
                return sonuc;
            }

            db.Ders.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi!";
            return sonuc;
        }

        #endregion

        #region UyeDers

        [HttpGet]
        [Route("api/uyederslistele/{uyeId}")]
        public List<UyeDersModel> UyeDersListele(int uyeId)
        {
            List<UyeDersModel> liste = db.UyeDers.Where(s => s.uId == uyeId).Select(x => new UyeDersModel()
            {
                uyedersId = x.uyedersId,
                uId = x.uId,
                dId = x.dId

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.dersBilgi = DersById(kayit.dId);
                kayit.uyeBilgi = UyeById(kayit.uId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/dersuyelistele/{dersId}")]
        public List<UyeDersModel> DersUyeListele(int dersId)
        {
            List<UyeDersModel> liste = db.UyeDers.Where(s => s.dId == dersId).Select(x => new UyeDersModel()
            {
                uyedersId = x.uyedersId,
                dId = x.dId,
                uId = x.uId

            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.dersBilgi = DersById(kayit.dId);
                kayit.uyeBilgi = UyeById(kayit.uId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/uyedersekle")]
        public SonucModel UyeDersEkle(UyeDersModel model)
        {
            if (model == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Eklenecek Birşey bulunamadı";
                return sonuc;
            }
            if (db.UyeDers.Count(s => s.dId == model.dId && s.uId == model.uId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Üye Derse Zaten Kayıtlıdır!";
                return sonuc;
            }
            UyeDers yeni = new UyeDers();

            yeni.uId = model.uId;
            yeni.dId = model.dId;

            db.UyeDers.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Kayıdı Eklenmiştir.";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/UyeDerssil/{uyedersId}")]
        public SonucModel UyeDersSil(int uyedersId)
        {
            UyeDers kayit = db.UyeDers.Where(s => s.uyedersId == uyedersId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üyeye ait Ders Bulunamadı!";
                return sonuc;
            }


            db.UyeDers.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üyeye ait Ders Silindi";

            return sonuc;
        }

        #endregion

        #region Sinav

        [HttpGet]
        [Route("api/sinavlistele")] // tüm sınavlar listelenecek
        public List<SinavModel> SinavListele()
        {
            List<SinavModel> liste = db.Sinav.Select(x=>new SinavModel()
            {
                sinavId= x.sinavId,
                sinavAdi= x.sinavAdi,
                sinavSuresi= x.sinavSuresi,
                sinavDersId= x.sinavDersId,
                //soruSayisi = db.Soru.Count(s => s.soruSinavId == x.sinavId)
                soruSayisi = x.Soru.Count()
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/sinavderslistele/{dersId}")] //derse göre sinavlar listelenecek
        public List<SinavModel> SinavDersListele(int dersId)
        {
            List<SinavModel> liste = db.Sinav.Where(s=>s.sinavDersId == dersId).Select(x=>new SinavModel()
            {
                sinavId = x.sinavId,
                sinavAdi = x.sinavAdi,
                sinavSuresi = x.sinavSuresi,
                sinavDersId = x.sinavDersId,
                soruSayisi = db.Soru.Count(s=>s.soruSinavId==x.sinavId)

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/sinavbyid/{sinavId}")] // idye göre sınav listelenecek
        public SinavModel SinavById(int sinavId)
        {
            SinavModel kayit = db.Sinav.Where(s => s.sinavId == sinavId).Select(x => new SinavModel()
            {
                sinavId = x.sinavId,
                sinavAdi = x.sinavAdi,
                sinavSuresi = x.sinavSuresi,
                sinavDersId = x.sinavDersId,
                soruSayisi = db.Soru.Count(s => s.soruSinavId == x.sinavId)

            }).SingleOrDefault();

            return kayit;
        }

        [HttpGet]
        [Route("api/sinavsorulistele/{sinavId}")] // sınav soruları listelenecek
        public List<SoruModel> SinavSoruListele(int sinavId)
        {
            List<SoruModel> liste = SoruSinavListele(sinavId);

            return liste;
        }

        [HttpPost]
        [Route("api/sinavekle")]
        public SonucModel SinavEkle(SinavModel model)
        {
            if (db.Sinav.Count(s=>s.sinavAdi==model.sinavAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu İsme sahip bir sınav zaten mevcuttur!";
                return sonuc;
            }

            Sinav yeni = new Sinav();
            yeni.sinavAdi = model.sinavAdi;
            yeni.sinavSuresi=model.sinavSuresi;
            yeni.sinavDersId=model.sinavDersId;

            db.Sinav.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Sınav Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/sinavduzenle")]
        public SonucModel SinavDuzenle(SinavModel model)
        {
            Sinav kayit = db.Sinav.Where(s=>s.sinavId==model.sinavId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Düzenlenecek Sınav Bulunamadı!";
                return sonuc;
            }
            if(db.Sinav.Count(s=>s.sinavAdi==model.sinavAdi && s.sinavId != model.sinavId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aynı İsime Sahip Sınav Bulunmaktadır!";
                return sonuc;
            }
            
            kayit.sinavSuresi = model.sinavSuresi;
            kayit.sinavAdi = model.sinavAdi;
            kayit.sinavDersId = model.sinavDersId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Sınav Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/sinavsil/{sinavId}")]
        public SonucModel SinavSil(int sinavId)
        {
            Sinav kayit = db.Sinav.Where(s=>s.sinavId==sinavId).SingleOrDefault();

            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sınav Bulunamadı!";
                return sonuc;
            }

            if (db.Soru.Count(s => s.soruSinavId == sinavId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sınava kayıtlı Sorular vardır!";
                return sonuc;
            }

            db.Sinav.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Sınav Silindi";

            return sonuc;

        }
        #endregion

        #region Soru

        [HttpGet]
        [Route("api/sorulistele")]
        public List<SoruModel> SoruListele()
        {
            List<SoruModel> liste = db.Soru.Select(x=> new SoruModel()
            {
                soruId = x.soruId,
                soruSinavId = x.soruSinavId,
                soruText = x.soruText,
               
            }).ToList();

            foreach (var soru in liste)
            {
                soru.secenekler = SecenekSoruListele(soru.soruId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/sorusinavlistele/{sinavId}")]
        public List<SoruModel> SoruSinavListele(int sinavId)
        {
            List<SoruModel> liste = db.Soru.Where(s=>s.soruSinavId==sinavId).Select(x=>new SoruModel()
            {
                soruId=x.soruId,
                soruSinavId=x.soruSinavId,
                soruText=x.soruText
            }).ToList();
            foreach (var soru in liste)
            {
                soru.secenekler = SecenekSoruListele(soru.soruId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/sorubyid/{soruId}")]
        public SoruModel SoruById(int soruId)
        {
            SoruModel kayit = db.Soru.Where(s => s.soruId == soruId).Select(x=>new SoruModel()
            {
                soruId = x.soruId,
                soruSinavId = x.soruSinavId,
                soruText = x.soruText
            }).SingleOrDefault();
            
            
            kayit.secenekler = SecenekSoruListele(kayit.soruId);
            
            return kayit;
        }

        [HttpPost]
        [Route("api/soruekle")]
        public SonucModel SoruEkle(SoruModel model)
        {
            if (db.Soru.Count(s => s.soruText == model.soruText) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Soru Kayıtlıdır!";
                return sonuc;
            }

            Soru yeni = new Soru();

            yeni.soruText = model.soruText;
            yeni.soruSinavId = model.soruSinavId;

            db.Soru.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SoruModel model)
        {
            Soru kayit = db.Soru.Where(s => s.soruId == model.soruId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadı!";
                return sonuc;
            }
            if (db.Soru.Count(s => s.soruText == model.soruText ) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Soru Kayıtlıdır!";
                return sonuc;
            }
            kayit.soruText = model.soruText;
            kayit.soruSinavId = model.soruSinavId;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/sorusil/{soruId}")]
        public SonucModel SoruSil(int soruId)
        {
            Soru kayit = db.Soru.Where(s => s.soruId == soruId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadı!";
                return sonuc;
            }
            if (db.Secenek.Count(s => s.secSoruId == soruId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Seçenekleri Olan Bir soruyu Silemezsiniz!";
                return sonuc;
            }
            

            db.Soru.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Silindi";

            return sonuc;
        }

        #endregion

        #region Secenek

        [HttpGet]
        [Route("api/secenekbyid/{secenekId}")]
        public SecenekModel SecenekById(int secenekId) // id ye göre seçenek listele
        {
            SecenekModel kayit = db.Secenek.Where(s => s.secenekId == secenekId).Select(x => new
             SecenekModel()
            {
                secenekId = x.secenekId,
                secenekText = x.secenekText,
                secSoruId = x.secSoruId,
                cevap = x.cevap,
            }).SingleOrDefault();
            return kayit;
        }

        [HttpGet]
        [Route("api/seceneksorulistele/{soruId}")] // soruya göre seçenekler listelenecek
        public List<SecenekModel> SecenekSoruListele(int soruId)
        {
            List<SecenekModel> liste = db.Secenek.Where(s => s.secSoruId == soruId).Select(x => new SecenekModel()
            {
                secenekId = x.secenekId,
                secenekText = x.secenekText,
                secSoruId = x.secSoruId,
                cevap = x.cevap,
            }).ToList();

            return liste;
        }

        [HttpPost]
        [Route("api/secenekekle")] // soruya seçenek eklenecek
        public SonucModel SecenekEkle(SecenekModel model)
        {
            List<SecenekModel> liste = SecenekSoruListele(model.secSoruId);
            int dogruSay = 0;
            
            if (liste.Count()>4) // Bir soruda en fazla 5 şık olabilir için kontrol
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bir soruda en fazla 5 şık olabilir!";
                return sonuc;
            }
            if (liste.Count(s => s.secenekText == model.secenekText ) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Seçenek Zaten mevcuttur!";
                return sonuc;
            }
            foreach (var i in liste) // doğru cevap sayısının bir olması için kontrol
            {
                if (i.cevap == 1 )
                {
                    dogruSay ++;
                    break;
                }
            }
            if (dogruSay == 1 && model.cevap==1)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Birden fazla doğru seçenek olamaz!";
                return sonuc;
            }
            Secenek yeni = new Secenek();
            yeni.secenekText=model.secenekText;
            yeni.cevap = model.cevap;
            yeni.secSoruId = model.secSoruId;

            db.Secenek.Add(yeni);
            db.SaveChanges();

            sonuc.islem=true;
            sonuc.mesaj = "Seçenek eklendi.";
            return sonuc;
        }

        [HttpPut]
        [Route("api/secenekduzenle")] // sorunun seçeneğini düzenle
        public SonucModel SecenekDuzenle(SecenekModel model)
        {
            Secenek kayit = db.Secenek.Where(s=>s.secenekId==model.secenekId).SingleOrDefault();
            List<SecenekModel> liste = SecenekSoruListele(model.secSoruId);

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Secenek Bulunamadı!";
                return sonuc;
            }
            /*
            foreach (var i in liste) // doğru cevap sayısının bir olması için kontrol
            {
                if (i.cevap == 1 &&)
                {
                    sonuc.islem = false;
                    sonuc.mesaj = "Birden fazla doğru seçenek olamaz!";
                    return sonuc;
                }
            }*/
            if (liste.Count(s => s.secenekText == model.secenekText && s.secenekId != model.secenekId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Seçenek Zaten mevcuttur!";
                return sonuc;
            }

            kayit.cevap = model.cevap;
            kayit.secenekText = model.secenekText;
            kayit.secSoruId = model.secSoruId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Secenek Duzenlendi.";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/seceneksil/{secenekId}")]
        public SonucModel SecenekSil(int secenekId)
        {
            Secenek kayit = db.Secenek.Where(s=>s.secenekId==secenekId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Secenek Bulunamadı!";
                return sonuc;
            }
            // uyecevap kontrolü buraya yapılacak!!!
            if (db.UyeCevap.Count(s => s.secId == secenekId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üyelerin cevapları olduğu için seçenek silinemez!";
                return sonuc;
            }
            db.Secenek.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Seçenek Silindi";
            return sonuc;
        }

        #endregion

        #region UyeCevap

        [HttpGet]
        [Route("api/uyecevaplistele/{uyeId}")] //üyenin bütün cevaplarını listele
        public List<UyeCevapModel> UyeCevapListele(int uyeId)
        {
            List<UyeCevapModel> liste = db.UyeCevap.Where(s=>s.uId==uyeId).Select(x=>new UyeCevapModel()
            {
                uyeCevapId = x.uyeCevapId,
                uId=x.uId,
                secId=x.secId            
            }).ToList();
            foreach (var i in liste)
            {
                i.uyeBilgi = UyeById(i.uId);
                i.secenekBilgi=SecenekById(i.secId);
                i.soruBilgi = SoruById(i.secenekBilgi.secSoruId);
                i.sinavBilgi = SinavById(i.soruBilgi.soruSinavId);
                i.dersBilgi = DersById(i.sinavBilgi.sinavDersId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/uyecevaplistelebysinavid/{uyeId}/{sinavId}")] // Sınava göre cevapları listeleme
        public List<UyeCevapModel> UyeCevapListeleBySinavId(int uyeId, int sinavId)
        {
            List<UyeCevapModel> liste = UyeCevapListele(uyeId);

            List<UyeCevapModel> filtre = new List<UyeCevapModel>();

            foreach (var i in liste)
            {
                if (i.sinavBilgi.sinavId == sinavId)
                {
                    filtre.Add(i);
                }
            }

            return filtre;
        }

        [HttpPost]
        [Route("api/uyecevapekle")]
        public SonucModel UyeCevapEkle(UyeCevapModel model)
        {
            if (db.UyeCevap.Count(s=>s.uId==model.uId && s.secId==model.secId)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cevabınız zaten kayıtlıdır!";
                return sonuc;
            }

            UyeCevap yeni = new UyeCevap();
            yeni.secId = model.secId;
            yeni.uId = model.uId;

            db.UyeCevap.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Eklendi.";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyecevapduzenle")] // üye cevabını değiştirmek isterse (sadece sınav esnasında mümkün)
        public SonucModel UyeCevapDuzenle(UyeCevapModel model)
        {
            UyeCevap kayit = db.UyeCevap.Where(s=>s.uyeCevapId==model.uyeCevapId).SingleOrDefault();

            if (kayit==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Düzenlenecek Cevap Bulunamadı!";
                return sonuc;
            }

            kayit.secId = model.secId;

            db.SaveChanges ();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Güncellendi.";
            return sonuc;

        }

        [HttpDelete]
        [Route("api/uyecevapsil/{uyeCevapId}")]
        public SonucModel UyeCevapSil(int uyeCevapId)
        {
            UyeCevap kayit = db.UyeCevap.Where(s=>s.uyeCevapId== uyeCevapId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cevap Bulunamadı!";
                return sonuc;
            }

            db.UyeCevap.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cevap Silindi.";

            return sonuc;
        }
        #endregion
    }
}
