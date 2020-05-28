import mongoose from "mongoose";

const url = `mongodb://${process.env.MONGODB_ADDRESS}/cracker-app-db`;
mongoose.connect(url, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongo at ${url}`));
