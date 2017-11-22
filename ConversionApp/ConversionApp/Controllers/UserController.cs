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
        public void SignUp(Users newUser)
        {
            var collection = mongoDb.GetCollection<Users>("Users");
            WriteConcernResult result;

            var count = collection.Find(Query.EQ("UserName", newUser.UserName)).Count();

            if (count > 0)
            {
                HttpResponseMessage httpResponse = new HttpResponseMessage(HttpStatusCode.BadRequest);
                throw new HttpResponseException(httpResponse);
            }
            else
            {
                newUser.Id = ObjectId.GenerateNewId().ToString();
                newUser.Favorites = new BsonArray();
                newUser.Recents = new BsonArray();
                BsonArray recent = new BsonArray(newUser.Recents);

                IMongoUpdate update = Update
                    .Set("UserName", newUser.UserName)
                    .Set("Password", newUser.Password)
                    .Set("Email", newUser.Email)
                    .Set("Favorites", newUser.Favorites)
                    .Set("Recents", recent);
                result = collection.Insert<Users>(newUser);
            }
        }
    }
}
