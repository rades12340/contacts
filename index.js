const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
// Init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
