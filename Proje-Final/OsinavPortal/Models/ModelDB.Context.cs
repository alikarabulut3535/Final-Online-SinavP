﻿

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace OsinavPortal.Models
{

using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;


public partial class Database1Entities : DbContext
{
    public Database1Entities()
        : base("name=Database1Entities")
    {

    }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        throw new UnintentionalCodeFirstException();
    }


    public virtual DbSet<Ders> Ders { get; set; }

    public virtual DbSet<Secenek> Secenek { get; set; }

    public virtual DbSet<Sinav> Sinav { get; set; }

    public virtual DbSet<Soru> Soru { get; set; }

    public virtual DbSet<Uye> Uye { get; set; }

    public virtual DbSet<UyeCevap> UyeCevap { get; set; }

    public virtual DbSet<UyeDers> UyeDers { get; set; }

}

}

