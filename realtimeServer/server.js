const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

const db = require("./config/db");
const comments = require("./model/comment");
const subComments = require("./model/subComment");
const subComment = require("./model/subComment");

const app = express();
const port = 3005;
app.use(express.json());
app.use(express.urlencoded());

app.use(morgan("combined"));
db.connect();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.clientOrigin, process.env.serverOrigin],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connect: " + socket.id);
  //
  socket.on("leaveRoom", (animeId) => {
    socket.leave(animeId.id);
  });
  socket.on("joinRoom", (animeId) => {
    socket.join(animeId.id);
    console.log(io.sockets.adapter.rooms);
  });
  //
  socket.on("userSendCommnet", async (comment) => {
    const anime = await comments.findOne({ animeId: comment.animeId });
    const Id = mongoose.Types.ObjectId();
    const temp = {
      _id: Id,
      comment: comment.comment,
      userId: comment.profile._id,
      image: comment.image,
      createdAt: Date.now(),
    };
    if (anime) {
      await comments.updateOne(
        { _id: anime._id },
        {
          $push: {
            content: temp,
          },
        }
      );
    } else {
      const commentData = new comments({
        animeId: comment.animeId,
        content: [temp],
      });
      await commentData.save();
    }
    io.to(comment.animeId).emit("newComment", {
      comment: comment.comment,
      info: {
        name: comment.profile.info.name
          ? comment.profile.info.name
          : comment.profile.userName,
        avatar: comment.profile.info.avatar,
      },
      subComment: [],
      userId: comment.profile._id,
      _id: Id,
      image: temp.image,
      createdAt: temp.createdAt,
    });
  });
  //
  socket.on("userSendSubCommnet", async (comment) => {
    //console.log(comment);
    const Id = mongoose.Types.ObjectId();
    const subCommentData = new subComment({
      _id: Id,
      commentId: comment.commentId,
      userId: comment.profile._id,
      comment: comment.comment,
      createdAt: Date.now(),
    });
    await subCommentData.save();
    io.to(comment.animeId).emit("newSubComment", {
      comment: comment.comment,
      info: {
        name: comment.profile.info.name
          ? comment.profile.info.name
          : comment.profile.userName,
        avatar: comment.profile.info.avatar,
      },
      userId: comment.profile._id,
      _id: Id,
      commentId: comment.commentId,
      createdAt: subCommentData.createdAt,
    });
  });
  //
  socket.on("disconnect", (reason) => {
    console.log("user disconnect");
  });
});

server.listen(process.env.PORT || port);
