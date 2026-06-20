import { motion } from "framer-motion";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        min-h-screen
        bg-gray-100
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div className="
        bg-white
        rounded-3xl
        shadow-2xl
        p-10
        w-full
        max-w-md
        text-center
      ">

        <img
          src="https://i.pravatar.cc/150"
          alt="profile"
          className="
            w-32
            h-32
            rounded-full
            mx-auto
            mb-6
          "
        />

        <h1 className="
          text-4xl
          font-bold
          mb-2
        ">
          {user?.name || "User"}
        </h1>

        <p className="
          text-gray-500
          mb-8
        ">
          {user?.email || "No Email"}
        </p>

        <div className="
          grid
          grid-cols-2
          gap-4
        ">

          <div className="
            bg-blue-100
            rounded-2xl
            p-5
          ">

            <h2 className="
              text-2xl
              font-bold
              text-blue-600
            ">
              24
            </h2>

            <p className="text-gray-600">
              Posts
            </p>

          </div>

          <div className="
            bg-green-100
            rounded-2xl
            p-5
          ">

            <h2 className="
              text-2xl
              font-bold
              text-green-600
            ">
              18
            </h2>

            <p className="text-gray-600">
              Published
            </p>

          </div>

        </div>

      </div>

    </motion.div>

  );

}

export default Profile;