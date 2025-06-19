// 1) Importing Dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 2) Importing Configs
const connectToDB = require("./configs/databaseConnect");
const productsRouter = require("./routes/productRouter");
const usersRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

// 3) Initializing
const app = express();
dotenv.config();

// 4) Database Connection
connectToDB();

// 5) Middlewares
app.use(cors());
app.use(express.json());

// 6) Routes
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// 7) Server Connection
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
