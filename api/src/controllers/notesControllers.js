import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
    // res.status(200).send("Here are all your notes: xyz!");
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller", error)
        res.status(500).json({ message: "Internal server error" });
    }
}
// wrapper function for try & catch

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found!" });

        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById controller", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createNote = async (req, res) => {
    // res.status(201).json({message: "Note created successfully!"});

    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });

        const savedNote = await note.save();
        res.status(201).json(savedNote)
    } catch (error) {
        console.log("Error in createNote controller", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateNote = async (req, res) => {
    // res.status(200).json({message: "Note updated successfully!"});

    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) return res.status(404).json({ message: "Note not found!" });

        res.status(201).json(updatedNote);
    } catch (error) {
        console.log("Error in updateNote controller", error)
        res.status(500).json({ message: "Internal server error" });

    }
}

export const deleteNote = async (req, res) => {
    // res.status(200).json({ message: "Note deleted successfully!" });

    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found!" });

        res.status(200).json(deletedNote);
    } catch (error) {
        console.log("Error in deleteNote controller", error)
        res.status(500).json({ message: "Internal server error" });
    }
}


