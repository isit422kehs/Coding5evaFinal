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
    public class DetailsController : ApiController
    {
        MongoDatabase mongoDb = MongoConnect.GetMongoDb();

        [HttpPost]
        public Details GetCountry(Country name) //country
        {
            List<Details> tempList = new List<Details>();
            var adjustName = name.Name.Trim().ToUpper();
            try {
                var mongoList = mongoDb.GetCollection("Details").FindAll().AsEnumerable();
                tempList = (from doc in mongoList
                            select new Details
                            {
                                Id = doc["_id"].ToString(),
                                Country = doc["Country"].AsString,
                                Volts = doc["Volts"].AsString,
                                PlugType = doc["PlugType"].AsString
                            }).ToList();

                var detail = tempList.FirstOrDefault((d) => d.Country.Trim().ToUpper().Contains(adjustName));

                return detail;
            } catch (Exception ex){
                throw ex;
            }
            
        }
    }
}
