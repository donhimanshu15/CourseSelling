import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"


const app  = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

//importing routes

import user from "./routes/userRoutes.js";
import course from "./routes/courseRoutes.js"
import teacher from "./routes/teacherRoutes.js"
import testSeries from "./routes/examRoutes.js"
import freeBees from "./routes/freeBeesRoutes.js"
import blog from "./routes/blogRouters.js"
import errorMiddleware from "./middleware/errorMiddleware.js";



app.use("/api/v1", user);
app.use("/api/v1",course);
app.use("/api/v1",teacher);
app.use("/api/v1",testSeries);
app.use("/api/v1",freeBees);
app.use("/api/v1",blog);

app.use(errorMiddleware); //this position is imp. use here only.
export default app;