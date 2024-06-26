const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth.js");

// Display main page with search functionality
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
    // Fetch posts or perform any necessary logic to display main page
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get and render the profile page for the logged in user
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["title", "post_content"],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// Render the signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Render the about page
// router.get("/about", (req, res) => {
//   res.render("about");
// });


// Get all posts
router.get("/post", withAuth, async (req, res) => {
  const postdata = await Post.findAll({
    attributes: ["id", "title", "post_content", "user_id"],

    //MAY NEED TO ADD THROUGH COMMENT

    include: [
        { 
            model: User, 
            attributes: ["username"] 
        },
        {
            model: Comment,
            include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
        }
    ],
    where: {
      user_id: req.session.user_id,
    },
  });
  const posts = postdata.map((post) => post.get({ plain: true }));
  // how will handlebars know to reference the comment object?
  // it will be passed in as a property of the post object
    //In the post.handlebars file, we can access the comments array by using the post.comments syntax.
    // on homepage handlebars, how do we access the comments?
    // we can't, because we're not passing the comments array to the homepage handlebars file
    // we need to pass the comments array to the homepage handlebars file
    // we can do this by updating the object we're passing to the render method in the / route
    //

  res.render("post", {
    posts,
    logged_in: req.session.logged_in,
  });
});

// Get a single post
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "post_content", "user_id"],
      include: [
        { 
            model: User,
            // through: Comment,
            attributes: ["username"] 
        },
        {
            model: Comment,
            include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]}
        
    
    ],
    });
    const post = postData.get({ plain: true });
    res.render("profile", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
});


module.exports = router;
