using ConversionApp.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;
using System.Web.Security;

namespace ConversionApp.Controllers
{
    public class UserController : ApiController
    {
        MongoDatabase mongoDb = MongoConnect.GetMongoDb();

        [HttpPost]
        public void AddUsers(Users newUser)
        {
            mongoDb = GetMongoDb();
            var collection = mongoDb.GetCollection<Users>("Users");
            WriteConcernResult result;
            IMongoUpdate update = Update
                .Set("UserName", newUser.UserName)
                .Set("Password", newUser.Password)
                .Set("Email", newUser.Email);
            result = collection.Insert<Users>(newUser);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public IHttpActionResult userLogin(string username, string pw, string email)  // make sure its string
        {
            mongoDb = GetMongoDb();
            var collection = mongoDb.GetCollection<Users>("Users");
            var user = new Users { UserName = username, Password = pw, Email = email };
            var id = user._id;
            IMongoQuery query = Query.EQ("_id", id);
            var userFound = collection.FindOne(query);

            if (query == null)
            {
                return NotFound();
            }
            return RedirectToRoute("index", "Home");
        }

        [HttpPost]
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            // delete user from cache
            System.Web.HttpContext.Current.Cache.Remove(User.Identity.Name);
            // delete authentication ticket & sign out
            FormsAuthentication.SignOut();

            return RedirectToRoute("index", "Home");
        }

        public static MongoDatabase GetMongoDb()
        {
            MongoUrl url = new MongoUrl("mongodb://admin:gummy@ds243285.mlab.com:43285/travelconverter");
            MongoClient client = new MongoClient(url);
            MongoServer server = client.GetServer();

            return server.GetDatabase("travelconverter");
        }

    }
}
