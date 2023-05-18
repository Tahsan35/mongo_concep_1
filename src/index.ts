import express,{ Application } from "express";
const app:Application = express()
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";

const port = process.env.PORT || 5000;

//using cors
app.use(cors());

//parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//any type korbe r false kore dile sudu string and object k receive korto

const {URI} =process.env;
//console.log(URI)

const dbconnect= async() :Promise<void> => {
    if(!URI){
        throw new Error("URI is not defined");
    }
    await mongoose.connect(URI)
    .then( () => console.log("db connected successfully"))
    const db = mongoose.connection;
        //collection name
        const collection = db.collection('persons');
        app.get("/test",async (req, res) => {
            const data = await collection.find().toArray();
            res.send(data);
        })
};
dbconnect();

app.get("/",(req, res) => {
  res.send("hello world");
})

app.listen(port, () => console.log(`listening on port ${port}`));
