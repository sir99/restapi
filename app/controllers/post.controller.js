const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// create
exports.create = (req, res) => {
    // validate request
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    // create post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    // save post in db
    Post.create(post)
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while createing the Post"
        })
    });
}

// getAll
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: {[Op.like]: `%${title}%`} } : null;

    Post.findAll({ where: condition })
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured occured"
        })
    });
}

// getOne
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error post with id = " + id
        })
    });
}

// update post
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    })
    .then((data) => {
        if(data == 1) {
            res.send({
                message: "Post was updated succesfully"
            });
        } else {
            res.send({
                message: `Cannot update post with id: ${id}`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error updating with id = " + id
        })
    });
}

// delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    })
    .then((data) => {
        if(data == 1) {
            res.send({
                message: "Post was deleted succesfully"
            });
        } else {
            res.send({
                message: `Cannot delete post with id: ${id}`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error delete with id = " + id
        })
    });
}

// deleteAll
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    })
    .then((data) => {
        res.send({
            message: `${data}Post was deleted succesfully`
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error delete"
        })
    });
}

// find all published
exports.findAllPublished = (req, res) => {
    Post.findAll({ 
        where: {
            published: true
        }
    }).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured occured"
        })
    });
}