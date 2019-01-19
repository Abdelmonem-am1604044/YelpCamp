let middleWare = {},
    Campground = require('../models/campground'),
    Comment = require('../models/comment');


middleWare.checkCommentAuthorization = function checkCommentAuthorization(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCamp) {
            if (err)
                res.redirect('back');
            else {
                Comment.findById(req.params.comment_id, function (err, foundComment) {
                    if (foundComment.author.id.equals(req.user._id))
                        next();
                    else {
                        req.flash('error', 'You Do Not Have Permission To Do That');
                        res.redirect('back');
                    }
                })
            }
        })
    } else {
        req.flash('error', 'Please Login First In Order To Do That');
        res.redirect('/login')
    }
};

middleWare.checkCampgroundAuthorization = function checkCampgroundAuthorization(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCamp) {
            if (err) {
                req.flash('error', 'Campground Was Not Found');
                res.redirect('back');
            } else {
                if (foundCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You Do Not Have Permission To Do That');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please Login First In Order To Do That');
        res.redirect('back')
    }
};

middleWare.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('error', 'Please Login First In Order To Do That');
    res.redirect('/login');
};

module.exports = middleWare;