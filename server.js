require('dotenv').config();
const express=require("express");
const job =require("./cron/cron.js")
const app=express();
const path=require('path')
const cors = require('cors');

job.start();
// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}


app.use(cors(corsOptions))
 
const PORT=process.env.PORT || 3000

app.use(express.json());
app.use(express.static('public'))
const connectDB=require('./config/db')
connectDB();

app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))

app.use("/", express.static("public/frontend"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "public", "frontend", "index.html"))
);

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})

