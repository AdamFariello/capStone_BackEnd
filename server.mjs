import express from "express"; 
import dotenv from "dotenv";
import cors from "cors";

import error from "./middleware/errors.mjs";
import initDatabase from "./initDatabase.mjs"; //TODO: make temp

import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs"

// Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
initDatabase();

dotenv.config();
const PORT = process.env.PORT || 3001;


// Pages used
app.get("/", (req, res, next) => {
    res.json({"TEST": "Successful"});
})
app.use("/users", userRoutes);
app.use("/api/auth/", authRoutes);



//Middleware Error Handling
app.use((req, res, next) => {
    next(error(505, "Resource not found"));
});
app.use((err, req, res, next) => {
    res.status(err.status || 404);
    res.json({error: err.message});
});


// Server loop
app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
});