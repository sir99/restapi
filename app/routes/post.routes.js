module.exports = app => {
    const posts = require("../controllers/post.controller");
    let router = require("express").Router();

    // create new post
    router.post("/", posts.create);

    // all post
    router.get("/", posts.findAll);

    // get post
    router.get("/:id", posts.findOne);

    // update post
    router.put("/:id", posts.update);

    // delete post
    router.delete("/:id", posts.delete);

    // delete all
    router.delete("/", posts.deleteAll);

    // filter
    router.get("/published", posts.findAllPublished);

    app.use("/api/posts", router);
}