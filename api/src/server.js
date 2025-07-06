import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// app.get("/api/notes", (req, res)=> {
//     res.status(200).send("Lorem ipsum")
// })

if (process.env.NODE_ENV !== "production") {
    app.use(cors());
}

app.use(express.json()); // Middleware to get the req parameters

// Custom middleware
// app.use((req, res, next) => {
//     console.log(`The request method is ${req.method} & the URL is ${req.url}`);
//     next();
// })

app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    })
});