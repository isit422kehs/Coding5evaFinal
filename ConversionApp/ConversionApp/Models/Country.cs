using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConversionApp.Models
{
    public class Country
    {
        [BsonId]
        public string Name { get; set; }

    }

    public class Details
    {
        [BsonId]
        public string Id { get; set; }
        public string Country { get; set; }
        public string Volts { get; set; }
        public string PlugType { get; set; }
    }
}