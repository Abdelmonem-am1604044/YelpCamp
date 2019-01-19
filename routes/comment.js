var express = require('express'),
    router = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleWare = require('../middleWare/index');

// GET - New Comment For A Specific Campground
router.get("/new", middleWare.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        res.render("comment/new", {campground: foundCamp});

    })
});

// POST - New Comment For A Specific Campground
router.post("/", middleWare.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        Comment.create(req.body.comment, function (err, newComment) {
            newComment.author.id = req.user._id;
            newComment.author.username = req.user.username;
            newComment.save();
            foundCamp.comments.push(newComment);
            foundCamp.save();
            res.redirect("/campgrounds/" + req.params.id);
            console.log(newComment);
        });
    });
});

// GET - Edit Comment Form
router.get('/:comment_id/edit', middleWare.checkCommentAuthorization,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err)
            res.redirect('back');
        else {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err)
                    res.redirect('back');
                else {
                    res.render('comment/edit', {foundComment: foundComment, campground: foundCamp});
                }
            })
        }
    })
});

// PUT - Perform Edit Operation
router.put('/:comment_id', middleWare.checkCommentAuthorization,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err)
            res.redirect('back');
        else {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
                if (err) {
                    res.redirect('back');
                } else {
                    req.flash('success', 'Comment Successfully Updated');
                    res.redirect('/campgrounds/' + req.params.id);
                }
            })
        }
    })
});

// Delete - Delete A Comment
router.delete('/:comment_id', middleWare.checkCommentAuthorization,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        if (err)
            res.redirect('back');
        else {
            Comment.findByIdAndRemove(req.params.comment_id, function (err, deletedComment) {
                if (err) {
                    res.redirect('back');
                } else {
                    req.flash('success', 'Comment Successfully Deleted');
                    res.redirect('/campgrounds/' + req.params.id);
                }
            })
        }
    })
});

module.exports = router;