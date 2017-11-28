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
    public class RecentsController : ApiController
    {

        MongoDatabase mongoDb = MongoConnect.GetMongoDb();

        [HttpPost]
        public IHttpActionResult updateRecents(Recents rec)
        {
            var collection = mongoDb.GetCollection<Users>("Users");
            WriteConcernResult result;

            IMongoQuery query = Query.EQ("UserName", rec.user);

            BsonArray test = new BsonArray();
            test.Add(rec.From);
            test.Add(rec.To);
            IMongoUpdate update = Update
                .Push("Recents", test);

            result = collection.Update(query, update);

            return Ok(rec.From);
        }
        
       
    }
}

