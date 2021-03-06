const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); 
// To convert SCSS to CSS
const sassMiddleware =  require('node-sass-middleware');

// We need to convert the SCSS files to CSS before the server boots up
app.use(sassMiddleware({
    src: './assets/scss', // where the scss files are stored
    dest: './assets/css', // where the css files would get stored after its been converted from scss
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',  // to change the prefix value of the href in the link tags

}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Creating Session
// MongoStore is used to store the session cookie in the database 
app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment in the production mode  
    secret : 'blahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) 
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    ),    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
