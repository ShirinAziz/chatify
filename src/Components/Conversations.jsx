import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import ChatBubble from "./ChatBubble";

const Conversations = () => {
  const [users, setUsers] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  //const [selectedUserId, setSelectedUserId] = useState("");
  const [conversationUuid, setConversationUuid] = useState(
    localStorage.getItem("conversationId" ?? "")
  );
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTriggered, setIsTriggered] = useState(false);

  const [token] = useState(localStorage.getItem("authToken") ?? "");
  const [fakeMessages, setFakeMessages] = useState([]);

  {
    /* useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("No auth token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://chatify-api.up.railway.app/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); */
  }

  useEffect(() => {
    if (!conversationUuid) {
      const convId = uuid();
      localStorage.setItem("conversationId", convId);
      setConversationUuid(convId);
    }
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `https://chatify-api.up.railway.app/messages?conversationId=${conversationUuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.err(error);
      }
    };
    if (conversationUuid || isTriggered) {
      setIsTriggered(false);
      getMessages();
    }
  }, [conversationUuid, isTriggered]);

  useEffect(() => {
    if (conversationUuid) {
      setFakeMessages([
        {
          id: 1000000,
          text: "Hello",
          createdAt: "2024-08-20T20:14:30.000Z",
          userId: "shirin",
          conversationId: conversationUuid,
        },
        {
          id: 1000001,
          text: "are you there?",
          createdAt: "2024-08-20T20:15:01.000Z",
          userId: "shirin",
          conversationId: conversationUuid,
        },
      ]);
    }
  }, [conversationUuid]);

  {
    /*const startNewChat = async () => {
    if (!selectedUserId) {
      setError("Please select a user.");
      return;
    }

    try {
      if (!token) {
        setError("No auth token found. Please log in.");
        return;
      }
      const convUuid = uuid();

      setConversationUuid(convUuid);

      const response = await axios.post(
        `https://chatify-api.up.railway.app/invite/${selectedUserId}`,
        { conversationId: convUuid }, // Använd den valda användarens ID för att starta en konversation
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Conversation started:", response.data);
    } catch (err) {
      console.error(
        "Error starting conversation:",
        err.response?.data || err.message
      );
      setError("Failed to start conversation");
    }
  }; */
  }

  const sendMessage = async () => {
    // Post call to send message
    await axios.post(
      `https://chatify-api.up.railway.app/messages`,
      {
        conversationId: conversationUuid,
        text,
      }, // Använd den valda användarens ID för att starta en konversation
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsTriggered(true);
    setText("");
  };
  const removeMessage = async (messageId) => {
    await axios.delete(
      `https://chatify-api.up.railway.app/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsTriggered(true);
  };

  {
    /*if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  } */
  }

  return (
    <div className="">
      {/* <div className="flex flex-col gap-4 px-4 w-[450px]">
        <div className="flex gap-2 mb-4">
          <select
            className="select select-primary w-full max-w-xs"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="" disabled>
              Users to chat with
            </option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={startNewChat}>
            New Chat
          </button>
        </div>
      </div> */}

      <div>
        {fakeMessages.map((message) => {
          return (
            <ChatBubble
              key={message.id}
              text={message.text}
              sender={false}
              handleRemove={removeMessage}
              messageId={message.id}
            />
          );
        })}
        {messages.map((message) => {
          return (
            <ChatBubble
              key={message.id}
              text={message.text}
              sender={true}
              handleRemove={removeMessage}
              messageId={message.id}
            />
          );
        })}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
