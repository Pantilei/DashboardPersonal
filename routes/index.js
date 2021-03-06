var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");
const fs = require("fs");
let Parser = require("rss-parser");

const config = require("../config");
const authToken = require("../middleware/authToken");

router.route("/api").get(authToken, function(req, res, next) {
  console.log("before verify");
  console.log(req.token);

  jwt.verify(req.token, config.sekretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        userId: authData.userId,
        username: authData.username,
        token: req.token
      });
    }
  });
});

router.route("/api/signup").post(function(req, res, next) {
  console.log(req.body);
  User.find({ email: req.body.email }).then(user => {
    if (user.length >= 1) {
      return res.status(200).json({
        message: "Mail exists"
      });
    } else {
      const file = req.files.image;
      file.mv(`${__dirname}/../uploads/${req.body.username}` + ".jpg");
      fs.mkdirSync(`${__dirname}/../uploads/${req.body.username}`);

      var user = new User();
      user.name = req.body.username;
      user.email = req.body.email;
      user.image = `/uploads/${req.body.username}` + ".jpg";
      user.setPassword(req.body.password);

      //const token =
      jwt.sign(
        {
          userId: user._id,
          username: user.name
        },
        config.sekretKey,
        {
          expiresIn: "7d"
        },
        function(err, token) {
          user.save(function(err) {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json({
                userId: user._id,
                username: user.name,
                token: token
              });
            }
          });
        }
      );
    }
  });
});

router.route("/api/login").post(function(req, res, next) {
  console.log(req.body);
  User.find({ email: req.body.email }).then(user => {
    //console.log(user[0].validPassword(req.body.password));
    if (user.length < 1) {
      return res.status(200).json({
        message: "No User with this email."
      });
    } else {
      if (user[0].validPassword(req.body.password)) {
        console.log("I am here");
        //const token =
        jwt.sign(
          {
            userId: user[0]._doc._id,
            username: user[0]._doc.name
          },
          config.sekretKey,
          {
            expiresIn: "7d"
          },
          (err, token) => {
            console.log(token);
            return res.status(200).json({
              token: token,
              userId: user[0]._doc._id,
              username: user[0]._doc.name
            });
          }
        );
      } else {
        return res.status(200).json({
          message: "Wrong Password"
        });
      }
    }
  });
});

router.route("/api/photos").post(authToken, function(req, res, next) {
  jwt.verify(req.token, config.sekretKey, function(err, authData) {
    /* console.log(authData); */

    const file = req.files.image;
    file.mv(`${__dirname}/../uploads/${authData.username}/${file.name}`);

    User.update(
      { _id: authData.userId },
      {
        $push: {
          uploadedImages: `${authData.username}/${file.name}`
        }
      }
    ).then(result => {
      console.log("------------------------------");
      console.log(result);
      User.find({ _id: authData.userId }).then(user => {
        return res.status(200).json({
          userId: user[0]._doc._id,
          username: user[0]._doc.name,
          uploadedImages: user[0]._doc.uploadedImages
        });
      });
    });
  });
});

router.route("/api/photos").get(authToken, function(req, res, next) {
  console.log("========");
  jwt.verify(req.token, config.sekretKey, function(err, authData) {
    if (err) {
      return res.status(401).json({ error: "No user!!!" });
    }
    User.find({ _id: authData.userId }).then(user => {
      return res.json({
        userId: authData.userId,
        username: authData.username,
        uploadedImages: user[0]._doc.uploadedImages
      });
    });
  });
});

router.route("/api/photos").delete(authToken, function(req, res, next) {
  //console.log("BEFORE");
  jwt.verify(req.token, config.sekretKey, function(err, authData) {
    //console.log(authData);
    if (err) {
      return res.status(401).json({ err: "Not allowed to delete!" });
    }
    User.findOne({ _id: authData.userId }).then(user => {
      let newImageArray = user.uploadedImages.filter(
        imagePath => req.body.image !== imagePath
      );

      User.update(
        { _id: authData.userId },
        {
          $set: {
            uploadedImages: newImageArray
          }
        }
      ).then(result => {
        //console.log("Deleted");
        fs.unlinkSync(`${__dirname}/../uploads/${req.body.image}`);
        return res.status(200).json({ result });
      });
    });
  });
});

router.route("/api/tasks").post(authToken, function(req, res, next) {
  jwt.verify(req.token, config.sekretKey, function(err, authData) {
    if (err) {
      return res.status(401).json({ error: "No user!!! Go to login page!" });
    }
    User.update(
      { _id: authData.userId },
      {
        $set: {
          [`tasks.${req.body.taskId}`]: {
            task: req.body.task,
            status: req.body.status
          }
        }
      }
    ).then(result => {
      console.log(result);
      User.findOne({ _id: authData.userId }).then(user => {
        return res.json({ tasks: user.tasks });
      });
    });
  });
});
router.route("/api/tasks").get(authToken, function(req, res, next) {
  jwt.verify(req.token, config.sekretKey, function(err, authData) {
    if (err) {
      return res.status(401).json({ error: "No user!!! Go to login page!" });
    }
    User.findOne({ _id: authData.userId }).then(user => {
      return res.json({
        userId: authData.userId,
        username: authData.username,
        tasks: user.tasks
      });
    });
  });
});
router.route("/api/tasks").delete(authToken, function(req, res, next) {
  jwt.verify(req.token, config.sekretKey, function(err, authData) {
    if (err) {
      return res.status(401).json({ error: "No user!!! Go to login page!" });
    }
    User.findOne({ _id: authData.userId }).then(user => {
      console.log(req.body.index);
      const newTaskArray = user.tasks;
      newTaskArray.splice(req.body.index, 1);

      console.log(">>>>>>>>>>>");
      //console.log(newTaskArray);
      User.update(
        { _id: authData.userId },
        {
          $set: {
            tasks: newTaskArray
          }
        }
      ).then(result => {
        console.log("This is result:", result);
        return res.status(200).json({
          userId: authData.userId,
          username: authData.username,
          tasks: newTaskArray
        });
      });
    });
  });
});

router.route("/api/news").get(function(req, res, next) {
  let parser = new Parser();
  parser.parseURL("http://feeds.bbci.co.uk/news/rss.xml").then(feed => {
    console.log(feed);
    return res.status(200).json({
      title: feed.items[0].title,
      content: feed.items[0].content,
      pic:
        "https://ichef.bbci.co.uk/news/660/cpsprodpb/7D27/production/_110193023_mediaitem110193022.jpg"
    });
  });
});

module.exports = router;
