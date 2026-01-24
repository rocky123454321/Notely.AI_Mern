import mongoose from "mongoose";

const noteScehema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {type: String,required: true,},
    content: { type: String, required: true },
},{timestamps: true})

const Note = mongoose.model("Note", noteScehema);
export default Note