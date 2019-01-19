const mongoose = require("mongoose");
let Campground = require("./models/campground"),
    Comment = require("./models/comment");

let data = [
    {
        name: "Cloud's Rest",
        image: "https://source.unsplash.com/uY2UIyO5o5c",
        description: "Bacon ipsum dolor amet kevin shank fatback sirloin, ball tip kielbasa pork corned beef beef strip steak. Chicken tenderloin cow, flank shoulder swine beef pig ribeye leberkas sirloin t-bone alcatra andouille. T-bone capicola ham porchetta andouille ground round. Pork belly venison filet mignon shank. Strip steak corned beef tail cupim flank short loin tri-tip bresaola fatback sausage frankfurter pork chop tenderloin sirloin. Bacon doner ground round turkey sirloin short ribs filet mignon."
    },
    {
        name: "Cloud's Rest",
        image: "https://source.unsplash.com/V7uP-XzqX18",
        description: "Bacon ipsum dolor amet kevin shank fatback sirloin, ball tip kielbasa pork corned beef beef strip steak. Chicken tenderloin cow, flank shoulder swine beef pig ribeye leberkas sirloin t-bone alcatra andouille. T-bone capicola ham porchetta andouille ground round. Pork belly venison filet mignon shank. Strip steak corned beef tail cupim flank short loin tri-tip bresaola fatback sausage frankfurter pork chop tenderloin sirloin. Bacon doner ground round turkey sirloin short ribs filet mignon."
    },
    {
        name: "Cloud's Rest",
        image: "https://source.unsplash.com/pSaEMIiUO84",
        description: "Bacon ipsum dolor amet kevin shank fatback sirloin, ball tip kielbasa pork corned beef beef strip steak. Chicken tenderloin cow, flank shoulder swine beef pig ribeye leberkas sirloin t-bone alcatra andouille. T-bone capicola ham porchetta andouille ground round. Pork belly venison filet mignon shank. Strip steak corned beef tail cupim flank short loin tri-tip bresaola fatback sausage frankfurter pork chop tenderloin sirloin. Bacon doner ground round turkey sirloin short ribs filet mignon."
    }
];

function seedDB() {
    Campground.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed campgrounds");
        //     data.forEach(function (camp) {
        //         Campground.create(camp, function (err, campground) {
        //             console.log("camp Added");
        //             Comment.create({
        //                 text: "Diced, raw pudding is best blended with whole ketchup.",
        //                 author: "Monem"
        //             }, function (err, comment) {
        //                 campground.comments.push(comment);
        //                 campground.save();
        //                 console.log("comment added");
        //             })
        //         })
        //     })
        // }

    });
    //------------------------------------------------

}

module.exports = seedDB;