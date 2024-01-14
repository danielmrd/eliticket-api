import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    first_name: {

    },
    last_name: {

    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.index({ uid: 1 })

const User = mongoose.model('User', userSchema, 'users')

export { 
    User,
    userSchema 
}