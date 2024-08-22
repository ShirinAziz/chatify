import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import ChatBubble from "./ChatBubble";
import img from "/shiba.png";
import { AuthContext } from "./AuthContext";

const Conversations = () => {
  const [conversationUuid, setConversationUuid] = useState(
    localStorage.getItem("conversationId" ?? "")
  );
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTriggered, setIsTriggered] = useState(false);
  const [token] = useState(localStorage.getItem("authToken") ?? "");
  const [fakeMessages, setFakeMessages] = useState([]);
  const { user } = useContext(AuthContext);

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
        console.error(error);
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
          userId: "shirin",
          conversationId: conversationUuid,
        },
        {
          id: 1000001,
          text: "are you there?",
          userId: "shirin",
          conversationId: conversationUuid,
        },
      ]);
    }
  }, [conversationUuid]);

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

  return (
    <div className="md:w-1/2 backdrop-blur-sm bg-white/20 mt-28">
      <div className="py-14 px-14">
        {fakeMessages.map((message) => {
          return (
            <ChatBubble
              key={message.id}
              text={message.text}
              sender={false}
              handleRemove={removeMessage}
              messageId={message.id}
              avatar={img}
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
              avatar={user.avatar}
            />
          );
        })}

        <div className="flex gap-2 justify-center mt-14">
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
