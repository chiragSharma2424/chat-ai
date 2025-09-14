import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, trim: true, unique: true, lowercase: true,
        minLength: [6, 'Email must be at least 6 character long'],
        maxLength: [50, 'Email must not be loner than 50 characters']
    },
    password: {type: String, required: true,
        minLength: [6, 'Password must be at least 6 character long'],
        maxLength: [50, 'Password must not be loner than 50 characters']
    }
}, { timestamps: true });

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.is