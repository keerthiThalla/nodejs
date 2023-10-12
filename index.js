const express =require('express');
const app =express();
const movies=require('./movies');
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/movies',(req,res)=>{
    res.json(movies);
});
app.post('/movies',(req,res)=>{
    const newmovie=req.body;
    movies.push(newmovie);
    res.json({
        msg:"movie registerde",
        movies,
    });
});
app.get('/movies/:id',(req,res)=>{
    const id=req.params.id;
    for(let m of movies){
        if(m.id===id){
            res.json(m);
            return;
        }
    }
    res.status(400).send("movie not found");
});
app.delete('/movies/:id',(req,res)=>{
    const id=req.params.id;
    for(let m of movies){
        if(m.id===id){
            res.json({
                msg:"movie deleted",
                m,
            });
            return;
        }
    }
    res.status(400).send("movie not found")
});
app.put('/movies/:id',(req,res)=>{
    const id=req.params.id;
    for(let m of movies){
        if(m.id===id){
            const newmovie=req.body;
            m.title=newmovie.title?newmovie.title:m.title
            m.release_date=newmovie.release_date?newmovie.release_date:m.release_date
            res.json({
                msg:"movie update",
                m,
            });


        }
    }
});
app.listen(8000,()=>console.log('server running'))