import mongoose from "mongoose";

(async()=>{
    const db = await mongoose
    .connect("mongodb+srv://0236887:FDw77SbKMurNQuHu@cluster0.j5t7ahh.mongodb.net/ingsoft?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.info(`[${new Date()}] - Connected to MongoDB Atlas`))
    .catch((error)=> console.error(`[${new Date()}] - ${error}`))
})()