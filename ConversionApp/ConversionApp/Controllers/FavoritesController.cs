using ConversionApp.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ConversionApp.Controllers
{
    public class FavoritesController : ApiController
    {
        MongoDatabase mongoDb = MongoConnect.GetMongoDb();
        WriteConcernResult result;

        [HttpPost]
        public IHttpActionResult UpdateUser(Favorites fav)
        {
            var collection = mongoDb.GetCollection<Users>("Users");

            IMongoQuery query = Query.EQ("UserName", fav.User);

            var cursor = collection.FindOne(query);
            var res = cursor.Favorites.Select(p => p.AsBsonArray);
            var favCount = res.Count();
            fav.Id = favCount + 1;
            fav.Category = fav.Category.First().ToString().ToUpper() + fav.Category.Substring(1);
            BsonArray test = new BsonArray
            {
                fav.Id,
                fav.Category,
                fav.From,
                fav.To
            };

            IMongoUpdate update = Update
                    .Push("Favorites", test);
            result = collection.Update(query, update);

            return Ok(fav.Id + ' ' + fav.User + ' ' + fav.Category + ' ' + fav.From + ' ' + fav.To);
        }
    }
}
