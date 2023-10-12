const express=require('express')
const router =express.Router()
const uuid =require('uuid')
let users =require('../../users')
router.get('/',(req,res)=>{
    res.json(users);
});
router.get('/:id',(req,res)=>{
    const found=users.some(user =>user.id === parseInt(req.params.id))
    if(found){
        users=users.filter(user=>user.id===parseInt(req.params.id))
        res.json({
            msg:'User get',
            users,
        });

    }
    else{
        res.sendStatus(400)
    }
});
router.post('/',(req,res)=>{
    const newuser={
        id:req.body.id,
        name:req.body.name,
        email:req.body.email
    }
    if(!newuser.name||!newuser.email){
        return res.sendStatus(400)
    }
    users.push(newuser)
    res.json(users)
});
router.put('/:id',(req,res)=>
{
const found=users.some(user=>user.id===parseInt(req.params.id))
if(found){
    const updateuser=req.body;
    users.forEach(user=>{
    if(user.id===parseInt(req.params.id)){
        user.name=updateuser.name?updateuser.name:user.name
        user.email=updateuser.email?updateuser.email:user.email
        res.json({msg:'user registered',user})
    }
})
}

})
router.delete('/:id',(req,res)=>{
    const found=users.some(user =>user.id === parseInt(req.params.id))
    if(found){
        users=users.filter(user=>user.id===parseInt(req.params.id))
        res.json({
            msg:'User deleted',
            users,
        });

    }
    else{
        res.sendStatus(400)
    }
});

module.exports=router;