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
            bool hasError = false;

            if (string.IsNullOrEmpty(newUser.Id))
            {
                newUser.Id = ObjectId.GenerateNewId().ToString();
                result = collection.Insert<Users>(newUser);
                hasError = result.HasLastErrorMessage;

            }
            else
            {
                ErrorMessage = "This username already exists, please try a different one";
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
