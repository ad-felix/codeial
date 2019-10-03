const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err, post){
        if(err){ console.log('Error in creating a post :',err); return; }

        return res.redirect('back');
    });
};

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // .id means we're converting the id to String(mongoose gives us this facility)
        if( post.user == req.user.id ){
            
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
};