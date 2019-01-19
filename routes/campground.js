var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    middleWare = require('../middleWare/index');

// Index - CampGrounds
router.get("/", function (req, res) {
    Campground.find({}, function (err, campGrounds) {
        res.render("campground/Index", {camps: campGrounds, currentUser: req.user})
    });
});

// Post - New Campground
router.post("/", middleWare.isLoggedIn, function (req, res) {
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, function (err, newCamp) {
        res.redirect("/campgrounds");
    });
});

// GET - New Campground
router.get("/new", middleWare.isLoggedIn, function (req, res) {
    res.render("campground/new");
});

// SHOW - Specific Campground
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp) {
        if (err) {
            res.redirect('back');
        } else {
            res.render("campground/show", {foundCamp: foundCamp})
        }
    });
});

// GET - Show Edit Form
router.get('/:id/edit', middleWare.checkCampgroundAuthorization, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        res.render('campground/edit', {foundCamp: foundCamp});
    });
});

// PUT - Perform Edit
router.put("/:id", middleWare.checkCampgroundAuthorization, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function (err, updatedCampground) {
        //redirect somewhere(show page)
        req.flash('success', 'Campground Successfully Updated');
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// Delete - Perform Delete Operation
router.delete('/:id', middleWare.checkCampgroundAuthorization, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err, deletedCamp) {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success', 'Campground Successfully Deleted');
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;