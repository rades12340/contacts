const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// mongodb+srv://rades12340:<password>@contactkeeper-jlgjg.mongodb.net/test?retryWrites=true&w=majority
