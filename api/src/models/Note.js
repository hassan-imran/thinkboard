import mongoose from "mongoose";

// 1- Schema
//  2- Model based on the schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Will add created at and updatedAt
});

const Note = mongoose.model("Note", noteSchema);

export default Note;