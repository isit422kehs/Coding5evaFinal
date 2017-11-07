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
        public ObjectId _id { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

    }
}