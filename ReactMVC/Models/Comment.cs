﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactMVC.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
    }
}