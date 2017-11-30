using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using ConversionApp.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ConversionApp.Controllers;
using System.Web.Http;
using System.Web.Http.Results;

namespace UnitTestProject1
{
    [TestClass]
    public class TestUsersController
    {
        public List<Users> GenerateFakeList()
        {

            List<Users> filledList = new List<Users>() {
                new Users() {
                    Id = "skafjaskfasdfsdfasdf",
                    UserName = "Meh",
                    Password = "hey",
                    Email = "slkdfj@sdsdf.com",
                    Favorites = {},
                    Recents = {}
                }
            };

            return filledList;
        }

        [TestMethod]
        public void RetrieveFakeUser()
        {
            //Test fake(local) data that retrieves a particular user
            // Will be searching for "Meh"
            List<Users> fakeList = GenerateFakeList();
            var controller = new LoginController(fakeList);

            Users one = new Users();
            one.UserName = "Meh";
            IHttpActionResult result = controller.UserLogin(one);
            var returnedResult = result as OkNegotiatedContentResult<Users>;

            Assert.AreEqual(fakeList[0].UserName, returnedResult.Content.UserName);
        }

        [TestMethod]
        // test local logic, using fake data
        // fails to return a user that doesn't exist
        public void GetFakeUser_ShouldReturnNotFound()
        {
            List<Users> testUser = GenerateFakeList();
            var controller = new LoginController(testUser); // use 1 of 2 constructors

            Users one = new Users
            {
                UserName = "silvia"
            };
            IHttpActionResult result = controller.UserLogin(one);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void RetrieveAllFakeUsers()
        {
            List<Users> fakeList = GenerateFakeList();
            var controller = new SignupTestController(fakeList);

            var result = controller.GetAllUsers() as List<Users>;
            Assert.AreEqual(fakeList.Count, result.Count);
        }
    }
   
}
