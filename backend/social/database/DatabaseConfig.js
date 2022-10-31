const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.lswzhfo.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
},err=>{
    if(!err)
    {
        console.log("Database Created");
    }
    else
    {
        console.log("Error"+err);
    }
})

require('./Schema')