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
        public void AddFavorite(Users favData)
        {
            mongoDb = MongoConnect.GetMongoDb();
            var collection = mongoDb.GetCollection<Users>("Users");

            var tempName = favData.UserName;
            var tempFav = new BsonArray(favData.FavOptions);
            IMongoQuery query = Query.EQ("UserName", tempName);
            var userFound = collection.FindOne(query);

            IMongoUpdate update = Update
                .Push("Favorites", tempFav);
            result = collection.Update(query, update);
        }
    }
}
