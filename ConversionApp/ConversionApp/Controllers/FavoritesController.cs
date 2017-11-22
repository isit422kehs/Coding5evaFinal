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
            BsonArray test = new BsonArray
            {
                fav.From,
                fav.To
            };
            IMongoUpdate update = Update
                .Push("Favorites", test);
            result = collection.Update(query, update);

            return Ok(fav.From + ' ' + fav.To);
        }
    }
}
