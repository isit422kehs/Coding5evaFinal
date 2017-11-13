using ConversionApp.Models;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ConversionApp.Controllers
{
    public class LoginController : ApiController
    {
        MongoDatabase mongoDb;
        List<Users> userList = new List<Users>();

        [AllowAnonymous]
        public IHttpActionResult UserLogin(Users user)  // make sure its string
        {
            mongoDb = MongoConnect.GetMongoDb();
            var collection = mongoDb.GetCollection<Users>("Users");

            var tempName = user.UserName;
            IMongoQuery query = Query.EQ("UserName", tempName);
            var userFound = collection.FindOne(query);
            var badlogin = "Username/password not found, please try again.";

            if (userFound == null)
            {
                return Content(HttpStatusCode.BadRequest, badlogin);
            }
            else if (userFound.Password == user.Password)
            {
                return Ok(userFound);
            }
            else
                return Content(HttpStatusCode.BadRequest, badlogin);
        }
    }
}
