using ConversionApp.Models;
using MongoDB.Driver;
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
        MongoDatabase mongoDb = MongoConnect.GetMongoDb();

        List<Users> userList = new List<Users>();

        //[HttpPost]
        //[AllowAnonymous]
        //[Route("login")]
        public IHttpActionResult UserLogin(List<string> user)  // make sure its string
        {
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
    }
}
