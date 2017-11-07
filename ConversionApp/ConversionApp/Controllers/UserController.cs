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

        List<Users> userList = new List<Users>();

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public IHttpActionResult UserLogin(string user)  // make sure its string
        {
            mongoDb = GetMongoDb();

            var mongoList = mongoDb.GetCollection("Users").FindAll().AsEnumerable();
            userList = (from nextUser in mongoList
                        select new Users
                        {
                            Id = nextUser["_id"].ToString(), //((ObjectId)nextNote["_id"]).ToString(), 
                            UserName = nextUser["UserName"].AsString,
                            Password = nextUser["Password"].AsString,
                            Email = nextUser["Email"].AsString
                        }).ToList();

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

            //var collection = mongoDb.GetCollection<Users>("Users");
            //user = new List<Users>();
            //var id = user._id;
            //IMongoQuery query = Query.EQ("_id", id);
            //var userFound = collection.FindOne(query);

            //if (query == null)
            //{
            //    return NotFound();
            //}
            //return RedirectToRoute("index", "Home");
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
