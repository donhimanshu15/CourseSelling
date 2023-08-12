import cookieParser from "cookie-parser";
import express from "express";



const app  = express();

app.use(express.json());
app.use(cookieParser());


//importing routes

import user from "./routes/userRoutes.js";
import course from "./routes/courseRoutes.js"
import teacher from "./routes/teacherRoutes.js"
import errorMiddleware from "./middleware/errorMiddleware.js";



app.use("/api/v1", user);
app.use("/api/v1",course);
app.use("/api/v1",teacher);

app.use(errorMiddleware); //this position is imp. use here only.
export default app;