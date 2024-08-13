import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversations = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 px-4 w-[450px]">
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

        <button className="btn btn-primary">New Conversation</button>
      </div>

      <div></div>
    </div>
  );
};

export default Conversations;
