﻿using ConversionApp.Models;
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
    }
}
