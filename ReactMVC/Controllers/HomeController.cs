using ReactMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactMVC.Controllers
{
    public class HomeController : Controller
    {
        private static readonly IList<Comment> _comments;

        static HomeController()
        {
            _comments = new List<Comment>
            {
                new Comment
                {
                    Id = 1,
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.NET World!"
                },
                new Comment
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new Comment
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
            };
        }

        public ActionResult Index()
        {
            return View(_comments);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Comments()
        {
            return Json(_comments, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddComment(Comment comment)
        {
            // Create a fake ID for this comment
            comment.Id = _comments.Count + 1;
            _comments.Add(comment);
            return Content("Success :)");
        }
    }
}