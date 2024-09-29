import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jsdom from "jsdom";
import fetch from "node-fetch"
import cors from 'cors'

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors())

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
  let arr = []
  app.get("/fetch", (req, res) => {
    const fetchFun = async (key) => {
      const res = await fetch(key);
      const text = await res.text();
      const dom = new jsdom.JSDOM(text);
      const document = dom.window.document;
      arr = Array.from(
        document.getElementsByClassName("symbol-info")
      ).map((item, index) => {
        return {
          stockname: item.getElementsByClassName("instrCode")[0].innerHTML,
          stockvalue:
            item.getElementsByClassName("price")[0] != null
              ? item.getElementsByClassName("price")[0].innerHTML
              : "",
        };
      });

      console.log(arr);

      // return document;
    };
    
    fetchFun("https://www.naftemporiki.gr/chrimatistirio/real-time/?tab=stock");
    res.json(arr)

  });
}

app.use(notFound);
app.use(errorHandler);

process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
});


app.listen(port, () => console.log(`Server started on port ${port}`));
