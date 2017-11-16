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
                //throw new Exception(String.Format("That username is already taken. Try a different one"));
                HttpResponseMessage httpResponse = new HttpResponseMessage(HttpStatusCode.BadRequest);
                throw new HttpResponseException(httpResponse);
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

    }
}
