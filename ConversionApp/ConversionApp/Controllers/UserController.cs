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
        public void AddUsers(Users newUser, Exception ex)
        {
            mongoDb = GetMongoDb();
            var collection = mongoDb.GetCollection<Users>("Users");
            WriteConcernResult result;

            var count = collection.Find(Query.EQ("UserName", newUser.UserName)).Count();

           
            try
            {
                newUser.Id = ObjectId.GenerateNewId().ToString();
                IMongoUpdate update = Update
                    .Set("UserName", newUser.UserName)
                    .Set("Password", newUser.Password)
                    .Set("Email", newUser.Email);
                result = collection.Insert<Users>(newUser);
            }
            catch
            {
                if (count > 0)
                    throw new System.ApplicationException("alert('This username already exists. Try a different one');");
            }
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
