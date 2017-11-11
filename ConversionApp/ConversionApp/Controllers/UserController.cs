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
        public string ErrorMessage { get; private set; }

        [HttpPost]
        public void AddUsers(Users newUser)
        {
            mongoDb = GetMongoDb();
            var collection = mongoDb.GetCollection<Users>("Users");
            WriteConcernResult result;

            var count = collection.Find(Query.EQ("UserName", newUser.UserName)).Count();
            if (count > 0)
            {

                ErrorMessage = "This username already exists. Try a different one";
                throw new ApplicationException(ErrorMessage);
            }
            else
            {
                newUser.Id = ObjectId.GenerateNewId().ToString();
                IMongoUpdate update = Update
                    .Set("UserName", newUser.UserName)
                    .Set("Password", newUser.Password)
                    .Set("Email", newUser.Email);
                result = collection.Insert<Users>(newUser);
                       

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
