const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ربط قاعدة البيانات
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/nursing-rounds", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("✅ MongoDB Connected")).catch(e=>console.error("❌ DB Error", e));

// تعريف المسارات
app.use("/api/auth", require("./routes/auth"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/rounds", require("./routes/rounds"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/settings", require("./routes/settings"));

// استضافة ملفات الواجهة
app.use(express.static("../frontend"));

// استضافة الصور والشعار
app.use("/static", express.static("../frontend/static"));

// بدء التشغيل
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`🚀 Server running on port ${PORT}`));