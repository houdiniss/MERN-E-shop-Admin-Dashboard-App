import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


// DATA IMPORTS
import User from "./models/User.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import ProductStat from "./models/ProductStat.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat
} from "./data/index.js";


/*  CONFIGURATION  */ 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/*  ROUTES  */
app.use("/client" , clientRoutes);
app.use("/general" , generalRoutes);
app.use("/management" , managementRoutes);
app.use("/sales" , salesRoutes);


/*  MONGOOSE SETUP  */
const PORT = 5001 || 9000 ;

mongoose.connect(/* Add your connection string  here */).then(() => {
  app.listen(PORT , () => console.log(`Server Connected to Port ${PORT}`));


  /* ONLY ADD DATA ONE TIME */
  /* ONCE THE SERVER IS CONNECTED WITH MONGODB FOR THE FIRST TIME,YOU NEED TO COMMENT OUT THE CODE BELOW */
  /* IF FOR SOME REASON YOU RESTARTED THE SERVER WITHOUT COMMENTING OUT THE CODE BELOW,YOU WILL HAVE TO  */
  /* DROP THE DATABASE AND RESTART THE SERVER ONCE AGAIN */

  User.insertMany(dataUser);   //comment out
  Product.insertMany(dataProduct);    //comment out
  ProductStat.insertMany(dataProductStat);    //comment out
  Transaction.insertMany(dataTransaction);    //comment out
  OverallStat.insertMany(dataOverallStat);    //comment out
  AffiliateStat.insertMany(dataAffiliateStat);    //comment out
}).catch(
    (err) => console.log(`${err} Server did not Connect`)
  );