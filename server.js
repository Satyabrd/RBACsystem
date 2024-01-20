const express = require("express")
const connectMongo = require("connect-mongo");
const session = require("express-session");
const mongoose = require("mongoose");
const {connection} = require("./models")
const app = express()

const MongoStore = new connectMongo(session);

app.use(
    session({
      store: new MongoStore({ mongooseConnection: connection }),
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * SERVER.SESSION_MAX_AGE,
      },
    }),
  );
mongoose.connect("mongodb://localhost:27017/test", { useFindAndModify: false }).then(
    () => {
      console.log("successfully Connected to mongoose");
    },
    err => {
      console.error("Error occurred connecting to mongoose:");
      console.dir(err);
    },
);

const connection = mongoose.connection;
connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
connection.once('open', () => {
    console.log('Connected to MongoDB');
});

//Use the movies router
const moviesRouter = require('./API/rbac');
app.use('/api/rbac/movies', moviesRouter);

const PORT = process.env.port || 3000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})