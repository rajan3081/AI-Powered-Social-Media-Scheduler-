const cron = require("node-cron");

const Post = require("../models/Post");

const startScheduler = () => {

  cron.schedule("* * * * *", async () => {

    console.log("⏰ Checking scheduled posts...");

    try {

      const now = new Date();

      const posts = await Post.find({
        scheduledTime: { $lte: now },
        status: "pending"
      });

      for (const post of posts) {

        post.status = "published";

        await post.save();

        console.log(`✅ Post Published: ${post.caption}`);

      }

    } catch (error) {

      console.log(error.message);

    }

  });

};

module.exports = startScheduler;