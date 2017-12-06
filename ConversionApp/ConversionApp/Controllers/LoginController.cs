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
        bool testing = false;
        List<Users> userList = new List<Users>();

        [HttpPost]
        public IHttpActionResult UserLogin(Users user)  // make sure its string
        {
            
            if (testing) {
                var testFake = userList.FirstOrDefault((u) => u.UserName == user.UserName);

                if (testFake == null) {
                    return NotFound();
                }
                return Ok(testFake);

            } else {
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
                else { return Content(HttpStatusCode.BadRequest, badlogin); }
            }
        }

        public LoginController() {

        }

        public LoginController(List<Users> fakeUser)
        {
            userList = fakeUser;
            testing = true;
        }
    }
}
