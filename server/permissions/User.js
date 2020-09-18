const {Permissions} = require("../constant");
const {createResponse} = require('../responseFormat')


const canCreateUser = (req,res,next)=>{
    const user = req.locals.user;
    if(Permissions.Create_User in user.permissions){
        console.log("allowed..");
        next()
    }
    else{
        res.status(400).json(createResponse(400,null,"Permission denied"))
    }
}