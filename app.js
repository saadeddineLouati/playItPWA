var express=require("express"),
            app=express(),
            bodyParser=require("body-parser"),
            mongoose=require("mongoose")

mongoose.connect("mongodb://localhost/playItsl26", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

var gameShema=new mongoose.Schema({
    title:String,
    kind:String,
    studioName:String,
    pervPublished:String,
    mode:String,
    rating:String,
    icon:String,
    trailer:String,
    grades:String
});

var gamerShema=new mongoose.Schema({
    number:String,
    fullName:String,
    gender:String,
    email:String,
    nationality:String,
    subsType:String,
    picture:String,
    pwd:String,
});

var game=mongoose.model("game", gameShema);
var gamer=mongoose.model("gamer", gamerShema);


// game.create(
//     {
//         title: "BizBuzz",
//         kind: "Adventure",
//         studioName: "SL26 Studio",
//         pervPublished: "Yes",
//         mode: "Single pleyer",
//         rating: "Red",
//         icon: "https://www.foxandsheep.com/wp-content/uploads/2017/12/Icon_LittleFireStation-300x300.png",
//         trailer: "https://www.youtube.com/watch?v=X4nePP4JmB8",
//         grades: "4"
//     }, function (err, game) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("New game created");
//             console.log(game);
//         }
//     }
// )

app.get("/", function(req,res){
    game.find({}, function(err, game){
        if(err){
            console.log(err);
        }else{
            res.render("index", {game:game});
        }
    })
    
});

app.get("/categories", function(req,res){
    res.render("categories");
});

app.get("/top", function(req,res){
    res.render("top");
});

app.get("/new", function(req,res){
    res.render("new");
});

app.get("/account", function(req,res){
    res.render("account");
});

app.get("/favourites", function(req,res){
    res.render("favourites");
});

app.get("/help", function(req,res){
    res.render("help");
});

app.get("/signIn", function(req,res){
    res.render("signIn");
});

app.get("/signUp", function(req,res){
    res.render("signUp");
});

app.post("/connect", function(req,res){
    var userName=req.body.userName;
    var pwd=req.body.pwd;
    res.send("You are connected as: "+userName+' with a password: '+pwd);
});

app.post("/subscription", function(req,res){
    var number=req.body.number;
    var fullName=req.body.fullName;
    var gender=req.body.gender;
    var email=req.body.email;
    var nationality=req.body.nationality;
    var subsType=req.body.subsType;
    var picture=req.body.picture;
    var pwd=req.body.pwd;

    var newGamer={number: number, fullName: fullName, gender:gender, email: email, nationality:nationality, subsType:subsType, picture:picture, pwd:pwd}
    gamer.create(newGamer, function(err, newGamer){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
    //res.send("You are connected as: "+number+' with a password: '+number);
});

app.get("/games/:id", function(req,res){
    game.findById(req.params.id, function(err, game){
        if(err){
            console.log(err);
        }else{
            res.render("game", {game:game});
        }
    });
});

app.listen(3001,'127.0.0.1', function(){
    console.log("conencted to http://127.0.0.1:3001");
});