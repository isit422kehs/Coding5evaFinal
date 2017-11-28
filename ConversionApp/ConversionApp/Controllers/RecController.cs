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

namespace ConversionApp.Controllers
{
    public class RecController : ApiController
    {
        MongoDatabase mongoDb = MongoConnect.GetMongoDb();
        [HttpPost]
        public IEnumerable<Recents> GetRecents(Users users)
        {
           
            try
            {
                var collection = mongoDb.GetCollection<Users>("Users");
                var user = collection.FindOne(Query.EQ("UserName", users.UserName));

                List<Recents> recentsList = new List<Recents>();
                foreach (BsonArray recentBson in user.Recents)
                {
                    var recents = new Recents();
                    recents.From = recentBson[0].ToString();
                    recents.To = recentBson[1].ToString();
                    recentsList.Add(recents);
                }

                return recentsList;
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.ToString());
            }
        }

    }
}
