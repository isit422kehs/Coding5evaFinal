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
    public class SignupTestController : ApiController
    {
        MongoDatabase mongoDb = MongoConnect.GetMongoDb();
        bool testing = false;
        List<Users> userList = new List<Users>();
        private List<Users> fakeList;
        public SignupTestController(List<Users> fakeList)
        {
            userList = fakeList;
            testing = true;
        }

        public IEnumerable<Users> GetAllUsers()

        {
            if (testing)
            {
                MongoDatabase mongoDb = MongoConnect.GetMongoDb();

                try
                {
                    var mongoList = mongoDb.GetCollection("TestCollection").FindAll().AsEnumerable();
                    userList = (from users in mongoList
                                select new Users
                                {
                                    Id = users["_id"].AsString,
                                    UserName = users["UserName"].AsString,
                                    Password = users["Password"].AsString,
                                    Email = users["Email"].AsString,

                                }).ToList();
                }
                catch (Exception)
                {
                    throw new ApplicationException("failed to get data from Mongo");
                }
            }
            return userList;
        }
    }
}
