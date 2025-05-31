import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import courseProgessRoute from "./routes/CourseProgressRoute.js";
import courseRoute from "./routes/CourseRoute.js";
import mediaRoute from "./routes/MediaRoute.js";
import purchaseRoute from "./routes/PurchaseCourseRoute.js";
import userRoute from "./routes/UserRoute.js";
dotenv.config({});
connectDB();
const app = express()

const PORT = process.env.PORT;
app.use("/api/v1/purchase/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use((req, res, next) => {
    next();
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase",purchaseRoute);
app.use("/api/v1/progress",courseProgessRoute)
app.listen(PORT,()=>{
    console.log(`listening on Port ${PORT}`);
})