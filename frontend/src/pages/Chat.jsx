import { useState, useEffect } from "react";

import { io } from "socket.io-client";

import { motion } from "framer-motion";


// SOCKET CONNECTION

const socket = io(
"http://localhost:5000"
);

function Chat() {

const [message, setMessage] = useState("");

const [selectedFile, setSelectedFile]
  = useState(null);

const [onlineUsers, setOnlineUsers] = useState([]);

const [messages, setMessages] = useState([


{
  id: 1,
  text: "Welcome to SocialFlow Chat 🚀",
  sender: "system"
}


]);

// RECEIVE MESSAGE

useEffect(() => {


socket.on(
  "receiveMessage",
  (message) => {

    setMessages((prev) => [

      ...prev,

      message

    ]);

  }
);
socket.on(
  "onlineUsers",
  (users) => {

    setOnlineUsers(users);

  }
);

return () => {

  socket.off("receiveMessage");

};


}, []);

// SEND MESSAGE

const sendMessage = () => {


if (!message.trim()) return;

const newMessage = {

  id: Date.now(),

  text: message,

  sender: "user",

  file: selectedFile
    ? URL.createObjectURL(selectedFile)
    : null

};

socket.emit(
  "sendMessage",
  newMessage
);

setMessage("");

};

return (

<div className="
  min-h-screen
  bg-linear-to-br
  from-blue-200
  via-purple-200
  to-pink-200
  p-8
">

  <div className="
    max-w-4xl
    mx-auto
    backdrop-blur-xl
    bg-white/20
    border
    border-white/20
    rounded-3xl
    shadow-2xl
    p-8
  ">

    <h1 className="
      text-4xl
      font-bold
      mb-8
    ">
        <p className="
  mb-6
  text-lg
  font-semibold
">
  🟢 Online Users:
  {onlineUsers.length}
</p>
      Live Chat 💬
    </h1>

    {/* CHAT AREA */}

    <div className="
      h-125
      overflow-y-auto
      space-y-4
      mb-6
      p-4
      rounded-2xl
      bg-white/20
    ">

      {
        messages.map((msg) => (

          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              max-w-xs
              px-5
              py-3
              rounded-2xl

              ${
                msg.sender === "user"

                  ? "bg-blue-500 text-white ml-auto"

                  : "bg-white text-black"
              }
            `}
          >

            {msg.text}
            {
  msg.file && (

    <img
      src={msg.file}
      alt="shared"
      className="
        mt-3
        rounded-2xl
        w-52
      "
    />

  )
}

          </motion.div>

        ))
      }

    </div>

    <input
  type="file"
  onChange={(e) =>
    setSelectedFile(
      e.target.files[0]
    )
  }
  className="
    mb-4
  "
/>

    {/* INPUT AREA */}

    <div className="
      flex
      gap-4
    ">

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        className="
          flex-1
          px-5
          py-4
          rounded-2xl
          outline-none
        "
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={sendMessage}
        className="
          bg-blue-500
          hover:bg-blue-600
          text-white
          px-8
          py-4
          rounded-2xl
        "
      >
        Send 🚀
      </motion.button>

    </div>

  </div>

</div>

);

}

export default Chat;
