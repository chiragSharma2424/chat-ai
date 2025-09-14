import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, trim: true, unique: true, lowercase: true,
        minLength: [6, 'Email must be at least 6 character long'],
        maxLength: [50, 'Email must not be loner than 50 characters']
    },
    password: {type: String, required: true, select: false,
        minLength: [6, 'Password must be at least 6 character long'],
        maxLength: [50, 'Password must not be loner than 50 characters']
    }
}, { timestamps: true });

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJwt = async function () {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
}

const User = mongoose.model("user", userSchema);

export default User;