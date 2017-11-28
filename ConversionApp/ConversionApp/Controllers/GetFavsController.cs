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
    public class GetFavsController : ApiController
    {
        MongoDatabase mongoDb = MongoConnect.GetMongoDb();

        [HttpPost]
        public IEnumerable<BsonArray> GetAllFavs(Favorites fav)
        {
            var collection = mongoDb.GetCollection<Users>("Users");
            IMongoQuery query = Query.EQ("UserName", fav.User);
            var cursor = collection.FindOne(query);

            var res = cursor.Favorites.Select(c => c.AsBsonArray);

            return res.ToList();
        }
    }
}
