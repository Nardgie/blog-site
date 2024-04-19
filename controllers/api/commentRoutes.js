const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
        });
        const comment = newComment.get({ plain: true });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

// router.get("/", async (req, res) => {???????
// might need to change this to get all comments for a specific post
router.get("/", async (req, res) => {
    try {
        const allComments = await Comment.findAll();
        res.status(200).json(allComments);
        
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });
        if (!deletedComment) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
        }
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;