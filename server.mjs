import express from "express"; 
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

dotenv.config();
const PORT = process.env.PORT || 3001;


app.use("/", (req, res, next) => {
    res.json("TEST");
})


app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
});