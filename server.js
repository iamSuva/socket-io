const http=require("http");
const express=require("express");

// const os=require("os");
// console.log(os.cpus().length)
const app=express();
const path=require("path");

const {Server}=require("socket.io");
const server=http.createServer(app);

const io=new Server(server);

//this will maintain the server
//socket.io

io.on("connection",(socket)=>{
    console.log("A new user is connected ",socket.id);
    //getting msg from client 

    
   
    socket.on("user_message",(message)=>{
        console.log("a new user message",message);
        //now server will emit msg to all client users
        io.emit("msg_send",message);//sending msg to frontend
    })
});

app.use(express.static("./public"));

app.get("/",(req,res)=>{
    res.sendFile("./public/index.html");
})



server.listen(3000,(err)=>{
    console.log("listening on port 3000");
})