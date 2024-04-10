const mongoose = require("mongoose");

// const dbURL =
//   "mongodb+srv://swapnilwalhekar1999:obicqBA7ugw4A0nG@crudcluster.phoolmw.mongodb.net/?retryWrites=true&w=majority&appName=crudCluster";

const dbURL =
  "mongodb+srv://bhairavnathkcww:LTn6nXPKWtO6MAy6@democluster.zzxmzyn.mongodb.net/?retryWrites=true&w=majority&appName=democluster";

mongoose
  .connect(dbURL)
  .then(console.log("Database Connected Successfully..!!"));
