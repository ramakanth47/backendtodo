const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model')
const cors = require('cors')

const app = express();

mongoose.connect('mongodb+srv://srikanth:srikanth123@cluster0.mi5vtf4.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
      ()=>console.log('DB Connected')
)

app.use(express.json())
app.use(cors({
    orgin: '*'
}))


app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
         const newData = new TaskSchema({
            todo : todo
         }) 
         await newData.save();
         return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})


app.get('/gettask',async(req,res) => {
    try{
       return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err)
    }

  app.delete('delete/:id',async(req,res) => {
    try {
       await TaskSchema.findByIdAndDelete(req.params.id)
       return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
  })  

})
app.listen(5000,()=> console.log('server running...'));