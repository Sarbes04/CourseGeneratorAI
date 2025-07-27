import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import generateCourseRoutes from './routes/contentRoutes.js';
import generateCourseLayoutRoutes from './routes/courseLayoutRoutes.js';
import enrollRoutes from './routes/enrollRoutes.js';
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

const corsOptions = {
    //allows the end domain to access the server's resources
    origin:true,
    credentials:true
}

//database connection
mongoose.set('strictQuery',false)
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            /* useNewUrlParser:true,
            useUnifiedTopology: true, */
        })
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}
//  Middlewares
app.use(cookieParser());
app.use(express.json()); // For large base64 images
app.use(bodyParser.urlencoded({extended:true}));
//app.use(urlencoded({extended:true}));
app.use(cors(corsOptions));

app.use(express.static(path.join(_dirname,"/frontend/dist")));

app.use("/api/auth", authRoutes); // /signup, /login
app.use("/api/courses", courseRoutes); // GET all courses, single course
app.use("/api/enroll", enrollRoutes); // enroll course, get enrolled, update progress
app.use("/api/generate-course", generateCourseRoutes); // AI course generation
app.use("/api/generate-course-layout", generateCourseLayoutRoutes); // AI layout + video generation

// Default Route
//console.log("edhenj",_dirname,"eskjhfjshkjfhnvkmubesrnj");


//console.log("edhenj",_dirname,"eskjhfjshkjfhnvkmubesrnj");

app.get('/',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
  connectDB();  
});
