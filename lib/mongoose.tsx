import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("⚠️ MongoDB connection string is missing in environment variables");
}

export const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGO_URI, {
      dbName: "humctrack",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};