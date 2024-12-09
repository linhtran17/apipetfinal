require('dotenv').config();  // Nạp biến môi trường từ file .env

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoute = require("./routers/auth.route");
const productRoute = require("./routers/product.route");
const newsRoute = require("./routers/news.route");
const publicRoute = require("./routers/public.route");
const mediaRoute = require("./routers/media.route");
const catPetRoute = require("./routers/category-pet.route");
const catProRoute = require("./routers/category-product.route");
const usersRoute = require("./routers/users.route");
const contactRoute = require("./routers/contact.route");
const dashboardRoute = require("./routers/dashboard.route");
const orderRoute = require("./routers/user-order.route");
const payRoute = require('./routers/pay.route');
const verifyToken = require('./middleware/auth.mw');
const checkRole = require('./middleware/role.mw');

const { TZ } = require('./config');
const hanlderError = require('./middleware/hanlder-error');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/files", express.static(path.join(__dirname, 'public')));

// Định nghĩa các route
app.use("/api/products", productRoute);
app.use("/api/news", newsRoute);
app.use("/api/auth", authRoute);
app.use("/api/category-pet", catPetRoute);
app.use("/api/category-product", catProRoute);
app.use("/api/public", publicRoute);
app.use("/api/media", mediaRoute);
app.use("/api/users", usersRoute);
app.use("/api/contact", contactRoute);
app.use("/api/order",orderRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/pay", payRoute)
app.use(hanlderError)

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});
