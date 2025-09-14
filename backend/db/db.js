import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

function connect() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to database");
    }).catch((err) => {
        console.log(`error in connecting database ${err}`);
    })
}

export default connect;