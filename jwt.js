const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
app.get('/',(req,res)=>{
    res.json("hii");
});
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(400);
        }
        else{
            res.json({
                msg:"post created",
                authData,
            });
        }
    });
    
});
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization']
    if(typeof bearerHeader!=='undefined'){
        const bearerToken =bearerHeader.split('')[1]
        req.token=bearerToken
        next()
    }else{
        res.sendStatus(400)
    }
}
app.post('/api/login',(req,res)=>{
    const user={
        id:1,
        username:"keerthi",
        email:"keer"

};
jwt.sign({user:user} ,'secretkey',(err,token)=>{
    res.json({
        token,
    });
});
});
app.listen(8000,()=>console.log("server running"))