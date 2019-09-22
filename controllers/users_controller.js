const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res) {
    if(req.body.passwd != req.body.cnf_passwd){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err, user){
        if(err){  console.log('Error in Finding user In Sign-Up');  return; }
        
        if(!user){
            User.create(req.body,function(err, user){
                if(err){  console.log('Error in creating user In Sign-Up'); return; }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });


};


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}