var express= require("express"),
bodyparser= require("body-parser"),
methodoverride=require("method-override"),
app=express(),
mongoose=require("mongoose");
mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true,useUnifiedTopology:true});
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodoverride("_method"));
var blogschema= new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type:Date, default: Date.now}
})


var blog=mongoose.model("blog",blogschema);


app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    blog.find({},function(err,b){
        if(err){
            console.log("Error");
        }
        else{
            res.render("index",{b:b});
        }
    })
});
//NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("new");
});


//CREATE ROUTE
app.post("/blogs",function(req,res){
    blog.create(req.body.blog,function(err,n){
        if(err){
            console.log("Error");
        }
        else{
            res.redirect("/blogs");
        }
    });
})
//SHOW ROUTE

app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id,function(err,f){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show",{f:f})
        }
    })
})
//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
    blog.findById(req.params.id,function(err,c){
        if(err){
            console.log("Error");
        }
        else{
            res.render("edit",{blog:c});
        }
    })
    
})

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
    blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,up){
        if(err){
            res.redirect("/blogs");
        }
        else
        {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs"); 
        }
        else{
            res.redirect("/blogs")
        }
    })
});

const port= process.env.PORT || 3000;

app.listen(port,process.env.IP);




 