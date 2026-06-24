import { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Analytics from "../components/Analytics";
import SchedulerCalendar from "../components/SchedulerCalendar";
import { useDropzone } from "react-dropzone";

import { toast } from "react-toastify";


function Dashboard() {

    const [notifications, setNotifications] = useState([]);
    const [activities, setActivities] = useState([]);

    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [posts, setPosts] = useState([]);

  const [uploading, setUploading] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [editingPost, setEditingPost] = useState(null);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [searchTerm, setSearchTerm] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [formData, setFormData] = useState({

  caption: "",

  image: "",

  scheduledTime: "",

  platform: "Instagram"

});

  const [editData, setEditData] = useState({
    caption: "",
    image: "",
    scheduledTime: ""
  });

  const token = localStorage.getItem("token");

  // ================= FILTER POSTS =================

  const filteredPosts = posts.filter((post) => {

    const matchesSearch =
      post.caption
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all"
        ? true
        : post.status === filterStatus;

    return matchesSearch && matchesFilter;

  });

  // ================= FETCH POSTS =================

  const fetchPosts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPosts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const addNotification = (message) => {

  const newNotification = {

    id: Date.now(),

    message

  };

  setNotifications((prev) => [

    newNotification,

    ...prev

  ]);

};

const addActivity = (message) => {

  const newActivity = {

    id: Date.now(),

    message,

    time: new Date().toLocaleTimeString()

  };

  setActivities((prev) => [

    newActivity,

    ...prev

  ]);

};

  // ================= CREATE POST =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

     toast.success("Post Created Successfully 🚀"); 
     addActivity("New Post Created 📸");
      addNotification("Post Created Successfully 🚀");

      fetchPosts();

      setFormData({
        caption: "",
        image: "",
        scheduledTime: "",
        platform: "Instagram"
      });

    } catch (error) {

      console.log(error);

      toast.error(error.response.data.message);

    }

  };

  // ================= DELETE POST =================

  const deletePost = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.error("Post Deleted");
      addActivity("Post Deleted ❌");
      addNotification("Post Deleted ❌");

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= EDIT POST =================

  const handleEdit = (post) => {

    setEditingPost(post._id);

    setEditData({
      caption: post.caption,
      image: post.image,
      scheduledTime: post.scheduledTime.slice(0, 16)
    });

  };

  // ================= HANDLE EDIT INPUT =================

  const handleEditChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });

  };

  // ================= UPDATE POST =================

  const updatePost = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.info("Post Updated");
      addActivity("Post Updated ✏️");
      addNotification("Post Updated ✏️");

      setEditingPost(null);

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ================= AI CAPTION GENERATOR =================

 const generateCaption = async () => {

  try {

    toast.info("Generating AI Caption...");

    const response = await axios.post(

      "http://localhost:5000/api/ai/generate-caption",

      {
        prompt:
          formData.caption ||
          "social media post"
      }

    );

    console.log(response.data);

    setFormData((prev) => ({

      ...prev,

      caption: response.data.caption

    }));

    toast.success("AI Caption Generated 🤖");
    addActivity("AI Caption Generated 🤖");
  } catch (error) {

    console.log(error);

    toast.error("AI Caption Failed");

  }

};

  // ================= IMAGE UPLOAD =================

  const uploadImage = async (e) => {

    const file = e.target.files[0];

    const data = new FormData();

    data.append("image", file);

    try {

      setUploading(true);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        data
      );

      setFormData({
        ...formData,
        image: response.data.imageUrl
      });

      setUploading(false);

      toast.success("Image Uploaded 📸");

    } catch (error) {

      console.log(error);

      setUploading(false);

      toast.error("Image Upload Failed");

    }

  };

  const onDrop = async (acceptedFiles) => {

  const file = acceptedFiles[0];

  const data = new FormData();

  data.append("image", file);

  try {

    setUploading(true);

    const response = await axios.post(

      "http://localhost:5000/api/upload",

      data

    );

    setFormData({

      ...formData,

      image: response.data.imageUrl

    });

    setUploading(false);

    toast.success("Image Uploaded 📸");

  } catch (error) {

    console.log(error);

    setUploading(false);

    toast.error("Upload Failed");

  }

};

const {
  getRootProps,
  getInputProps,
  isDragActive
} = useDropzone({

  onDrop,

  accept: {
    "image/*": []
  }

});

  // ================= LOAD POSTS =================

  useEffect(() => {

    fetchPosts();

  }, []);

  return (

    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gray-100 text-black"
      }
    >

      {/* SIDEBAR */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* MAIN */}

      <motion.div
        className={`transition-all duration-500 ${sidebarCollapsed ? "md:ml-20" : "md:ml-72"} ml-0`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >

        <Navbar
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          notificationCount={notifications.length}
          userName={JSON.parse(localStorage.getItem("user"))?.name || "Manager"}
        />

        <div
  className={`
    max-w-7xl
    mx-auto
    px-6
    py-8
    min-h-screen
    transition-all
    duration-500

    ${
      darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
    }
  `}
>

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">

            <div>

              <h1 className="text-5xl font-bold mb-3">
                Dashboard 🚀
              </h1>

              <p className={
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }>
                Manage your scheduled social media posts
              </p>

            </div>

            {/* NOTIFICATION BELL */}

<div className="relative mb-6 lg:mb-0">

  <button
    className="
      bg-white
      p-4
      rounded-full
      shadow-xl
      text-2xl
      text-black
    "
  >
    🔔
  </button>

  {
    notifications.length > 0 && (

      <span
        className="
          absolute
          -top-2
          -right-2
          bg-red-500
          text-white
          text-xs
          px-2
          py-1
          rounded-full
        "
      >
        {notifications.length}
      </span>

    )
  }

</div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-5 mt-8 lg:mt-0">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className={
                  darkMode
                    ? "bg-gray-800 p-5 rounded-2xl shadow-xl"
                    : "bg-white p-5 rounded-2xl shadow-xl"
                }
              >

                <h2 className="text-lg font-semibold">
                  Total Posts
                </h2>

                <p className="text-4xl font-bold text-blue-500 mt-3">
                  {posts.length}
                </p>

              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className={
                  darkMode
                    ? "bg-gray-800 p-5 rounded-2xl shadow-xl"
                    : "bg-white p-5 rounded-2xl shadow-xl"
                }
              >

                <h2 className="text-lg font-semibold">
                  Published
                </h2>

                <p className="text-4xl font-bold text-green-500 mt-3">
                  {
                    posts.filter(
                      (post) => post.status === "published"
                    ).length
                  }
                </p>

              </motion.div>

            </div>

          </div>

          {/* NOTIFICATIONS */}

<div className={`
  rounded-3xl
  p-6
  mb-10
  backdrop-blur-xl
  border
  border-white/20
  shadow-2xl

  ${
    darkMode
      ? "bg-white/10 text-white"
      : "bg-white/60 text-slate-950"
  }
`}>

  <h2 className={`
    text-2xl
    font-bold
    mb-5
    ${darkMode ? "text-white" : "text-slate-950"}
  `}>
    Notifications 🔔
  </h2>

  <div className="space-y-4">

    {
      notifications.length === 0 ? (

        <p className="text-gray-500">
          No Notifications Yet
        </p>

      ) : (

        notifications.map((notification) => (

          <div
            key={notification.id}
            className="
             bg-linear-to-br from-blue-200 via-purple-200 to-pink-200
              p-4
              rounded-2xl
              text-black
            "
          >
            {notification.message}
          </div>

        ))

      )
    }

  </div>

</div>

{/* ACTIVITY TIMELINE */}

<div
  className={`
    rounded-3xl
    p-8
    mb-10
    backdrop-blur-xl
    border
    border-white/20
    shadow-2xl

    ${
      darkMode
        ? "bg-white/10 text-white"
        : "bg-white/60 text-black"
    }
  `}
>

  <h2 className="
    text-3xl
    font-bold
    mb-8
  ">
    Activity Timeline 📈
  </h2>

  <div className="space-y-5">

    {
      activities.length === 0 ? (

        <p className="text-gray-500">
          No Activity Yet
        </p>

      ) : (

        activities.map((activity) => (

          <div
            key={activity.id}
            className={`
              p-5
              rounded-2xl
              flex
              items-center
              justify-between

              ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-white"
              }
            `}
          >

            <p className="font-medium">
              {activity.message}
            </p>

            <span className="text-sm opacity-70">
              {activity.time}
            </span>

          </div>

        ))

      )
    }

  </div>

</div>

          {/* CREATE POST */}

{
  activeSection === "create" && (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-3xl
        shadow-2xl
        p-8
        mb-12
        backdrop-blur-xl
        border
        border-white/20

        ${
          darkMode
            ? "bg-white/10 text-white"
            : "bg-white/60 text-black"
        }
      `}
    >

      <h2 className="text-3xl font-bold mb-8">
        Create New Post
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* CAPTION INPUT */}

        <input
          type="text"
          name="caption"
          placeholder="Write your caption..."
          value={formData.caption}
          onChange={handleChange}
          className={`
            w-full
            border
            rounded-2xl
            px-5
            py-4
            outline-none
            transition

            ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }
          `}
        />

                  {/* AI BUTTON */}

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  type="button"
  onClick={generateCaption}
  className="
    bg-purple-500
    hover:bg-purple-600
    text-white
    px-6
    py-3
    rounded-2xl
    font-semibold
  "
>
  Generate AI Caption 🤖
</motion.button>

{/* FILE INPUT */}

<div
  {...getRootProps()}
  className={`
    border-2
    border-dashed
    rounded-3xl
    p-10
    text-center
    cursor-pointer
    transition
    ${
      isDragActive
        ? "border-blue-500 bg-blue-50"
        : "border-gray-300 bg-white"
    }
  `}
>

  <input {...getInputProps()} />

  {
    isDragActive ? (

      <p className="text-blue-500 text-lg">
        Drop image here 📸
      </p>

    ) : (

      <p className="text-gray-500 text-lg">
        Drag & Drop Image Here
        <br />
        or Click to Upload 🚀
      </p>

    )
  }

</div>

{/* IMAGE UPLOADING */}

{
  uploading && (
    <p className="text-blue-500">
      Uploading Image...
    </p>
  )
}

{/* IMAGE PREVIEW */}

{
  formData.image && (
    <img
      src={formData.image}
      alt="preview"
      className="
        w-full
        md:w-96
        rounded-2xl
      "
    />
  )
}
<select
  name="platform"
  value={formData.platform}
  onChange={handleChange}
  className="
    w-full
    border
    border-gray-300
    rounded-2xl
    px-5
    py-4
    text-black
  "
>

  <option>
    Instagram
  </option>

  <option>
    LinkedIn
  </option>

  <option>
    Facebook
  </option>

</select>

{/* DATE TIME */}

<input
  type="datetime-local"
  name="scheduledTime"
  value={formData.scheduledTime}
  onChange={handleChange}
  className="
    w-full
    border
    border-gray-300
    rounded-2xl
    px-5
    py-4
    text-black
  "
/>

{/* CREATE BUTTON */}

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="
    bg-blue-500
    hover:bg-blue-600
    text-white
    px-8
    py-4
    rounded-2xl
  "
>
  Create Post
</motion.button>
                </form>
              </motion.div>
            )
          }
          {/* ANALYTICS */}

          {
            activeSection === "analytics" && (
              <Analytics posts={posts} />
            )
          }

          {/* CALENDAR */}

          {
            activeSection === "calendar" && (
              <SchedulerCalendar posts={posts} />
            )
          }

          {/* DASHBOARD */}

          {
            activeSection === "dashboard" && (

              <>

                {/* SEARCH + FILTER */}

                <div className="
                  flex
                  flex-col
                  md:flex-row
                  gap-4
                  mb-8
                ">

                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    className="
                      flex-1
                      border
                      border-gray-300
                      rounded-2xl
                      px-5
                      py-4
                      text-black
                    "
                  />

                  <select
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value)
                    }
                    className="
                      border
                      border-gray-300
                      rounded-2xl
                      px-5
                      py-4
                      text-black
                    "
                  >

                    <option value="all">
                      All
                    </option>

                    <option value="published">
                      Published
                    </option>

                    <option value="scheduled">
                      Scheduled
                    </option>

                  </select>

                </div>

                {/* POSTS GRID */}

                {
                  filteredPosts.length === 0 ? (

                    <div className="
                      flex
                      items-center
                      justify-center
                      h-60
                      rounded-3xl
                      bg-linear-to-r
                      from-blue-500
                      to-purple-600
                      text-white
                      text-3xl
                      font-bold
                    ">
                      No Posts Found 🚀
                    </div>

                  ) : (

                    <div className="
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      xl:grid-cols-3
                      gap-8
                    ">

                      {filteredPosts.map((post) => (

                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          whileHover={{ scale: 1.03 }}
                          className={
                            darkMode
                              ? `
                                bg-gray-800
                                rounded-3xl
                                overflow-hidden
                                shadow-2xl
                              `
                              : `
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                shadow-2xl
                              `
                          }
                        >

                          <img
                            src={post.image}
                            alt="post"
                            className="
                              w-full
                              h-72
                              object-cover
                            "
                          />

                          <div className="p-6">

                            <div className="
                              flex
                              justify-between
                              items-start
                              mb-4
                            ">

                              <h2 className="text-2xl font-bold">
                                {post.caption}
                              </h2>
                              <p className="
  mt-3
  text-sm
  font-semibold
  text-blue-500
">
  Scheduled for:
  {post.platform} 🚀
</p>

                              <span
                                className={`
                                  px-4
                                  py-1
                                  rounded-full
                                  text-white
                                  text-sm
                                  ${
                                    post.status === "published"
                                      ? "bg-green-500"
                                      : "bg-yellow-500"
                                  }
                                `}
                              >
                                {post.status}
                              </span>

                            </div>

                            <p className={
                              darkMode
                                ? "text-gray-300 mb-6"
                                : "text-gray-500 mb-6"
                            }>
                              {new Date(
                                post.scheduledTime
                              ).toLocaleString()}
                            </p>

                            <div className="flex gap-4">

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(post)}
                                className="
                                  flex-1
                                  bg-yellow-500
                                  hover:bg-yellow-600
                                  text-white
                                  py-3
                                  rounded-2xl
                                "
                              >
                                Edit
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => deletePost(post._id)}
                                className="
                                  flex-1
                                  bg-red-500
                                  hover:bg-red-600
                                  text-white
                                  py-3
                                  rounded-2xl
                                "
                              >
                                Delete
                              </motion.button>

                            </div>

                          </div>

                        </motion.div>

                      ))}

                    </div>

                  )
                }

              </>

            )
          }

        </div>

      </motion.div>

      {/* EDIT MODAL */}

      {
        editingPost && (

          <div className="
            fixed
            inset-0
            bg-black/60
            flex
            items-center
            justify-center
            z-50
            p-4
          ">

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="
                bg-white
                w-full
                max-w-md
                rounded-3xl
                p-8
              "
            >

              <h2 className="
                text-3xl
                font-bold
                mb-6
                text-black
              ">
                Edit Post
              </h2>

              <div className="space-y-5">

                <input
                  type="text"
                  name="caption"
                  value={editData.caption}
                  onChange={handleEditChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    text-black
                  "
                />

                <input
                  type="text"
                  name="image"
                  value={editData.image}
                  onChange={handleEditChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    text-black
                  "
                />

                <input
                  type="datetime-local"
                  name="scheduledTime"
                  value={editData.scheduledTime}
                  onChange={handleEditChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    text-black
                  "
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updatePost(editingPost)}
                  className="
                    w-full
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    py-4
                    rounded-2xl
                  "
                >
                  Update Post
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingPost(null)}
                  className="
                    w-full
                    bg-gray-400
                    hover:bg-gray-500
                    text-white
                    py-4
                    rounded-2xl
                  "
                >
                  Cancel
                </motion.button>

              </div>

            </motion.div>

          </div>

        )
      }

    </div>

  );

}

export default Dashboard;