using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Volkswagen_asp.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home

        private Models.MyDatabaseEntities2 db = new Models.MyDatabaseEntities2();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Engine()
        {
            return View(db.Clients);
        }

        [HttpGet]
        public ActionResult Order()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Order(Models.Client client) 
        {
            db.Clients.Add(client);
            //db.Clients.SqlQuery("INSERT INTO [dbo].[Clients] ([Name], [Surname], [Email], [PhoneNumber]) VALUES (N'"+client.Name+"', N'"+client.Surname+"', N'"+client.Email+"', N'"+client.PhoneNumber+"')");
            //db.SaveChanges();
            //db.Clients.SqlQuery("SET IDENTITY_INSERT [dbo].[Clients] OFF");
            return View();
        }
    }
}