const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const dotenv = require('dotenv').config();
const URL = process.env.DB;
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET=process.env.SECRET;

app.use(express.json());
app.use(cors({
    orgin: "*"
}));

app.get("/", (req, res) =>
  res.send(`Server Active`)
);

app.listen(process.env.PORT || 5000)



app.post("/signup", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("blog-app");
        const oldUser = await db
        .collection("users")
        .findOne({ email: req.body.email });
      if (oldUser) {
        return res.json({ message: "User Already Exists!!" });
      }
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        req.body.password = hash;
        await db.collection("users").insertOne(req.body);
        await connection.close();
        res.json({
            message: "user registered added successfully"
        })
    } catch (error) {
        console.log(error);
    }
})

app.post("/login", async function (req, res) {
  try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("blog-app");
      const temp = await db.collection("users").findOne({ email: req.body.email })
      if (temp) {
          const match = await bcryptjs.compare(req.body.password, temp.password);
          if (match) {
              const token = jwt.sign({ _id: temp._id }, SECRET,{expiresIn:"90min"});
              console.log(token)
              res.json({ message: "successfully logged in", token ,id:temp._id,profile:temp.username})
          } else {
              res.json({ message: "incorrect password" })
          }
      } else { res.json({ message: "user not found,Kindly register before logging in" }) }
      await connection.close();

  } catch (error) {
      console.log(error);
  }
})

const authenticate = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let decodedToken = jwt.verify(req.headers.authorization, SECRET);
      if (decodedToken) {
        req.userid = decodedToken._id;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Invaild Token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
 

app.post("/portal/addPost",authenticate, async function (req, res) {
  try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("blog-app");
      req.body.user=new ObjectId(req.body.user)
      req.body.name=req.body.name
     const a= await db.collection("posts").insertOne(req.body);
     await db.collection('users').updateOne({_id:new ObjectId(req.body.user)},{$push:{blogs:a.insertedId}})
      await connection.close();
      res.json({
          message: "Post added successfully"
      })
  } catch (error) {
      console.log(error);
  }
})

app.get("/defaultPage", async function (req, res) {
  try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("blog-app");
      const result = await db.collection("posts").find({}).toArray();
      await connection.close();
      res.json(result);
      
  } catch (error) {
      console.log(error);
  }
})

app.get("/portal/allPosts",authenticate, async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("blog-app");
        const result = await db.collection("posts").find({}).toArray();
        await connection.close();
        res.json(result);
    } catch (error) {
        console.log(error);
    }
})

app.get("/portal/myPosts/:id",authenticate, async function (req, res) {
  try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("blog-app");
      const result = await db.collection("posts").find({user:new ObjectId(req.params.id)}).toArray();
      await connection.close();
      res.json(result);
  } catch (error) {
      console.log(error);
  }
})

// app.get("/portal/viewPost/:id",authenticate, async function (req, res) {
//   try {
//       const connection = await mongoClient.connect(URL);
//       const db = connection.db("blog-app");
//       const result = await db.collection("posts").findOne({_id:new ObjectId(req.params.id)}).toArray();
//       await connection.close();
//       res.json(result);
//   } catch (error) {
//       console.log(error);
//   }
// })
app.get("/portal/edit/:id",authenticate, async function (req, res) {
  try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("blog-app");
      const result = await db.collection("posts").findOne({_id:new ObjectId(req.params.id)});
      await connection.close();
      res.json(result);
  } catch (error) {
      console.log(error);
  }
})

app.put("/portal/edit/:id",authenticate, async function (req, res) {
 try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("blog-app");
      req.body.user=new ObjectId(req.body.user)
      const result = await db.collection("posts").updateOne({ _id:new ObjectId(req.params.id) }, { $set: req.body });
      await connection.close();
      res.json({ message: "updated successfully" });
  } catch (error) {
      console.log(error);
  }
})
app.delete("/portal/delete/:id",authenticate, async function (req, res) {

  try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("blog-app");
      const result = await db.collection("posts").deleteOne({ _id: new ObjectId(req.params.id) });
      await connection.close();
      res.json({ message: "updated successfully" });
  } catch (error) {
      console.log(error);
  }
})
