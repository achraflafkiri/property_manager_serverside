const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 8080;

const PropertyRouter = require("./routers/propertyRouter");
const connectDB = require("./config/database");
const handleErrors = require("./middlewares/handleErrors");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/v1/properties", PropertyRouter);

app.use(handleErrors);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
