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
        [Required(ErrorMessage = "Please enter your user name.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Please enter your password.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter your Email.")]
        public string Email { get; set; }

    }
}