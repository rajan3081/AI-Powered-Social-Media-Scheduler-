import { motion } from "framer-motion";

function Admin() {

  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-8
    ">

      <h1 className="
        text-5xl
        font-bold
        mb-10
      ">
        Admin Dashboard 👑
      </h1>

      {/* STATS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-8
      ">

        {/* USERS */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            bg-white
            p-8
            rounded-3xl
            shadow-2xl
          "
        >

          <h2 className="
            text-2xl
            font-bold
            mb-4
          ">
            Total Users
          </h2>

          <p className="
            text-5xl
            font-bold
            text-blue-500
          ">
            124
          </p>

        </motion.div>

        {/* POSTS */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            bg-white
            p-8
            rounded-3xl
            shadow-2xl
          "
        >

          <h2 className="
            text-2xl
            font-bold
            mb-4
          ">
            Total Posts
          </h2>

          <p className="
            text-5xl
            font-bold
            text-purple-500
          ">
            542
          </p>

        </motion.div>

        {/* PUBLISHED */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            bg-white
            p-8
            rounded-3xl
            shadow-2xl
          "
        >

          <h2 className="
            text-2xl
            font-bold
            mb-4
          ">
            Published
          </h2>

          <p className="
            text-5xl
            font-bold
            text-green-500
          ">
            410
          </p>

        </motion.div>

        {/* SCHEDULED */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            bg-white
            p-8
            rounded-3xl
            shadow-2xl
          "
        >

          <h2 className="
            text-2xl
            font-bold
            mb-4
          ">
            Scheduled
          </h2>

          <p className="
            text-5xl
            font-bold
            text-yellow-500
          ">
            132
          </p>

        </motion.div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="
        bg-white
        mt-12
        p-8
        rounded-3xl
        shadow-2xl
      ">

        <h2 className="
          text-3xl
          font-bold
          mb-6
        ">
          Recent Activity 🚀
        </h2>

        <div className="space-y-4">

          <div className="
            bg-gray-100
            p-4
            rounded-2xl
          ">
            User created a new post 📸
          </div>

          <div className="
            bg-gray-100
            p-4
            rounded-2xl
          ">
            New user registered 🔥
          </div>

          <div className="
            bg-gray-100
            p-4
            rounded-2xl
          ">
            Post scheduled successfully ⏰
          </div>

        </div>

      </div>

    </div>

  );

}

export default Admin;