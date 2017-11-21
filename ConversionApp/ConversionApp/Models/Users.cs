using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ConversionApp.Models
{
    public class Users
    {
        [BsonId]
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }
        public BsonArray Recents { get; set; }
        public BsonArray Favorites { get; set; }
    }

    public class Favorites
    {
        [BsonId]
        public string From { get; set; }
        public string To { get; set; }
        public string user { get; set; }

    }

    public class Recents
    {
        [BsonId]
        public string From { get; set; }
        public string To { get; set; }
        public string user { get; set; }
    }
}