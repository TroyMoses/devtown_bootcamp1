const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connect = require("./config/db");
const { register, login } = require("./controllers/user.controller");
// Import your router
const router = require("./controllers/user.controller");
const bcrypt = require("bcrypt");
const  User = require("./models/user.models")

// let password = "troybags";
// const hash = bcrypt.hashSync(password, 10);
// const compare = bcrypt.compareSync(password, hash);
// console.log(compare);

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/home", (req, res)=>{
    res.send("You are looking at home now");
});

const auth = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
    next();
}

app.post("/login", async(req, res) => {
    try {
        let user = await User.findOne({email:req.body.email});

        if (!user) {
            res.send("User is not registered!")
        }
        console.log(user, "user");
        console.log(user.password, "password");
        const compare = bcrypt.compareSync(req.body.password, user.password);

        if (!compare) {
            res.send("Password is incorrect..");
        }

        console.log("compare", compare)
        return res.send("Logged in Successfully!");

    } catch (error) {
        return res.status(400).send({error:error.message});
    }
});
app.post("/register",auth, router.register);


app.listen(8080, async()=>{
try {
    await connect()
    console.log("Listening on port 8080...");
} catch (error) {
    console.log({error:error.message});
}
    
})

