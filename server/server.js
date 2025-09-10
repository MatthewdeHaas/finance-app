require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 5001;
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const categoryRoutes = require("./routes/category");
const transactionRoutes = require("./routes/transaction");
const cookieParser = require('cookie-parser');


// Establish middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transaction", transactionRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
