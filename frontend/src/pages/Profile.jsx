import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

function Profile() {

// ================= STATES =================

const [profileImage, setProfileImage]
= useState("");

const [bio, setBio]
= useState("");

const [instagram, setInstagram]
= useState("");

const [linkedin, setLinkedin]
= useState("");

const [github, setGithub]
= useState("");

// ================= USER =================

const user = JSON.parse(
localStorage.getItem("user")
);

// ================= IMAGE UPLOAD =================

const uploadProfileImage =
async (e) => {

  const file =
    e.target.files[0];

  const data =
    new FormData();

  data.append(
    "image",
    file
  );

  try {

    const response =
      await axios.post(

        "http://localhost:5000/api/upload",

        data

      );

    setProfileImage(
      response.data.imageUrl
    );

  } catch (error) {

    console.log(error);

  }

};

return (

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    min-h-screen
    bg-gradient-to-br
    from-blue-100
    via-purple-100
    to-pink-100
    flex
    items-center
    justify-center
    p-6
  "
>

  <div className="
    bg-white/70
    backdrop-blur-xl
    rounded-3xl
    shadow-2xl
    p-10
    w-full
    max-w-xl
    text-center
  ">

    {/* PROFILE IMAGE */}

    <div className="relative">

      <img
        src={
          profileImage ||
          "https://i.pravatar.cc/300"
        }
        alt="profile"
        className="
          w-36
          h-36
          rounded-full
          mx-auto
          object-cover
          border-4
          border-purple-500
          shadow-xl
          mb-4
        "
      />

      <input
        type="file"
        onChange={uploadProfileImage}
        className="
          text-sm
          mt-2
        "
      />

    </div>

    {/* USER INFO */}

    <h1 className="
      text-4xl
      font-bold
      mb-2
      mt-6
    ">
      {user?.name || "User"}
    </h1>

    <p className="
      text-gray-500
      mb-6
    ">
      {user?.email || "No Email"}
    </p>

    {/* BIO */}

    <textarea
      placeholder="Write your bio..."
      value={bio}
      onChange={(e) =>
        setBio(e.target.value)
      }
      className="
        w-full
        border
        rounded-2xl
        p-4
        resize-none
        outline-none
        mb-6
      "
    />

    {/* SOCIAL LINKS */}

    <div className="
      space-y-4
      mb-8
    ">

      <input
        type="text"
        placeholder="Instagram Link"
        value={instagram}
        onChange={(e) =>
          setInstagram(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-2xl
          p-4
          outline-none
        "
      />

      <input
        type="text"
        placeholder="LinkedIn Link"
        value={linkedin}
        onChange={(e) =>
          setLinkedin(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-2xl
          p-4
          outline-none
        "
      />

      <input
        type="text"
        placeholder="GitHub Link"
        value={github}
        onChange={(e) =>
          setGithub(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-2xl
          p-4
          outline-none
        "
      />

    </div>

    {/* STATS */}

    <div className="
      grid
      grid-cols-2
      gap-4
    ">

      <div className="
        bg-blue-100
        rounded-2xl
        p-5
        shadow-md
      ">

        <h2 className="
          text-3xl
          font-bold
          text-blue-600
        ">
          24
        </h2>

        <p className="
          text-gray-600
          mt-2
        ">
          Posts
        </p>

      </div>

      <div className="
        bg-green-100
        rounded-2xl
        p-5
        shadow-md
      ">

        <h2 className="
          text-3xl
          font-bold
          text-green-600
        ">
          18
        </h2>

        <p className="
          text-gray-600
          mt-2
        ">
          Published
        </p>

      </div>

    </div>

    {/* SAVE BUTTON */}

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        mt-8
        bg-purple-600
        hover:bg-purple-700
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        shadow-lg
      "
    >
      Save Profile 🚀
    </motion.button>

  </div>

</motion.div>


);

}

export default Profile;
