
//external imports
const bcrypt = require("bcrypt");


//Internal imports
const User = require("../models/People");

//get signup page

function getsignup(req,res,next)  {
    res.render("signup");
}



// add person
async function addUser(req,res,next){

    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if(req.files && req.files.length > 0){
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    }
    else{
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
    }
   
    //save person or send error
    try{
        const result = await  newUser.save();
        res.status(200).json({
            message: "Sign up successfull!",
        });
        
    }
    catch(err){
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occured!",
                }
            }
        })
    }
}

module.exports= {
    getsignup,
    addUser,
}