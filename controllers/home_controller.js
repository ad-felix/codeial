const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = function(req, res){

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial - Home",
    //         posts: posts
    //     });
    // });


    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){console.log(err); return; }
        
        // to see the list of users
        User.find({}, function(err, users){
            
            return res.render('home', {
            title: "Codeial - Home",
            posts: posts,
            all_users: users
            });

        });

    });

};

//module.exports.actionName = function(req, res){}