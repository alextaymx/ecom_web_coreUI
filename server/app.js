const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const productVarRoutes = require("./routes/productVarRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const supplierRoutes = require("./routes/supplierRoute");
const userRoutes = require("./routes/userRoute");
const constantRoutes = require("./routes/constantRoute");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// middleware
if (process.env.NODE_ENV !== "local") {
  // join the frontend path with server when deploy to cloud in production env
  const buildPath = path.join(__dirname, "..", "build");
  app.use(express.static(buildPath));
} else {
  app.use(cors()); //allow all origin requset, cors pre-flight
}
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", authRoutes);
app.use("/api/products", productRoutes, productVarRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/users", userRoutes);
app.use("/api/constants", constantRoutes);
// app.use("/api/products", productVarRoutes);

// listen to port
app.listen(PORT, () => {
  console.info(`server started at http://localhost:${PORT}`);
});
