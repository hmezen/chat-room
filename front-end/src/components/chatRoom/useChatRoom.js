import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
const SOCKET_SERVER_URL = "http://localhost:3001";

const useChatRoom = (roomId, user) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    if (roomId) {
      const fetchUsers = async () => {
        const response = await fetch(
          `${SOCKET_SERVER_URL}/rooms/${roomId}/users`
        )
          .then((res) => res.json())
          .then((result) => {
            return result;
          });
        setUsers(response.users);
      };

      fetchUsers();
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      const fetchMessages = async () => {
        const response = await fetch(
          `${SOCKET_SERVER_URL}/rooms/${roomId}/messages`
        )
          .then((res) => {
            if (res.ok) return res.json();
            return res;
          })
          .then((result) => {
            return result;
          })
          .catch((err) => {
            console.log(err);
          });
        setMessages(response.messages);
      };

      fetchMessages();
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: {
          roomId,
          name: user.firstName,
          avatarUrl: user.avatarUrl,
          email: user.email,
        },
      });

      socketRef.current.on("connect", () => {});

      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socketRef.current.on(USER_JOIN_CHAT_EVENT, (user) => {
        const existionUser = users.find(
          (user) =>
            user.socketId === socketRef.current.id && user.roomId === roomId
        );
        if (existionUser !== null || existionUser !== undefined)
          setUsers((users) => [...users, user]);
      });

      socketRef.current.on(USER_LEAVE_CHAT_EVENT, (socketId) => {
        setUsers((users) =>
          users.filter((userObject) => userObject.socketId !== socketId)
        );
      });

      socketRef.current.on(START_TYPING_MESSAGE_EVENT, (typingInfo) => {
        if (typingInfo.senderId !== socketRef.current.id) {
          const user = typingInfo.user;
          setTypingUsers((users) => [...users, user]);
        }
      });

      socketRef.current.on(STOP_TYPING_MESSAGE_EVENT, (typingInfo) => {
        if (typingInfo.senderId !== socketRef.current.id) {
          const user = typingInfo.user;
          setTypingUsers((users) => users.filter((u) => u.name !== user.name));
        }
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [roomId, user]);

  const sendMessage = (messageText, senderEmail, senderAvatar) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      messageText,
      senderEmail,
      senderAvatar,
      roomId,
    });
  };

  const startTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(START_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user: {
        socketId: socketRef.current.id,
        room: roomId,
        name: user.firstName,
        avatarUrl: user.avatarUrl,
        email: user.email,
      },
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(STOP_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user: {
        socketId: socketRef.current.id,
        room: roomId,
        name: user.firstName,
        avatarUrl: user.avatarUrl,
        email: user.email,
      },
    });
  };

  return {
    messages,
    users,
    typingUsers,
    sendMessage,
    stopTypingMessage,
    startTypingMessage,
  };
};

export default useChatRoom;
