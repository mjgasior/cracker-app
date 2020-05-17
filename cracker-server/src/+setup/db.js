import mongoose from "mongoose";

console.log(process.env);
console.log(process.env.MONGODB_ADDRESS);

const url = `mongodb://${process.env.MONGODB_ADDRESS}/graphqldb`;
mongoose.connect(url, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongo at ${url}`));
