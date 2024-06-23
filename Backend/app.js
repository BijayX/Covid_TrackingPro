import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import dbConnection from "./config/config.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3003;

// Connect to the database
dbConnection();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(mongoSanitize());

app.use(router);

// app.use(errorMiddleware)

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am alive",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
