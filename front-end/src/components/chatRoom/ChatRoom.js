import React, { useEffect, useState } from "react";
import useChatRoom from "./useChatRoom";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
  MessageSeparator,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  AvatarGroup,
  SendButton,
  AttachmentButton,
} from "@chatscope/chat-ui-kit-react";
import useTyping from "./useTyping";
import { useAuth } from "../../firebase/firebaseProvider";

const ChatRoom = ({
  chatRoom,
  handleConversationClick,
  chatContainerStyle,
}) => {
  const { user } = useAuth();
  const {
    messages,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChatRoom(chatRoom.id, user);
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  const [newMessage, setNewMessage] = useState("");
  const [typingUsersNames, setTypingUsersNames] = useState("");

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  useEffect(() => {
    const names = typingUsers.map((tUser) => {
      return tUser.name;
    });

    setTypingUsersNames(names.join(","));
  }, [typingUsers]);

  return (
    <ChatContainer style={chatContainerStyle}>
      <ConversationHeader>
        <ConversationHeader.Back onClick={handleConversationClick} />
        <AvatarGroup hoverToFront={true} size="sm">
          {users
            ? users.map((rommUser, index) => (
                <Avatar
                  src={rommUser.avatarUrl}
                  name={rommUser.firstName}
                  key={index}
                />
              ))
            : null}
        </AvatarGroup>
        <ConversationHeader.Content
          userName={chatRoom.name}
          info={chatRoom.info}
        />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
        typingIndicator={
          typingUsers.length > 0 ? (
            <TypingIndicator content={typingUsersNames + " typing"} />
          ) : null
        }
      >
        <MessageSeparator content="Saturday, 30 November 2019" />
        {messages.length > 0
          ? messages.map((message, index) => {
              return (
                <Message
                  key={index}
                  model={{
                    message: message.messageText,
                    sentTime: "15 mins ago",
                    sender: message.senderEmail,
                    direction:
                      message.senderEmail === user.email
                        ? "outgoing"
                        : "incoming",
                    position: "normal",
                  }}
                  avatarPosition="bl"
                >
                  {message.senderEmail !== user.email ? (
                    <Avatar src={message.senderAvatar} />
                  ) : null}
                </Message>
              );
            })
          : null}
      </MessageList>

      <div
        as={MessageInput}
        style={{
          display: "flex",
          flexDirection: "row",
          borderTop: "1px dashed #d1dbe4",
        }}
      >
        <TextField
          id="standard-full-width"
          multiline
          style={{ margin: 8 }}
          placeholder="write a message..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={() => startTyping()}
          onKeyUp={() => stopTyping()}
        />
        <SendButton
          onClick={() => {
            sendMessage(newMessage, user.email, user.avatarUrl);
            cancelTyping();
            setNewMessage("");
          }}
          disabled={newMessage.length === 0}
          style={{
            fontSize: "1.2em",
            marginLeft: 0,
            paddingLeft: "0.2em",
            paddingRight: "0.2em",
          }}
        />
        <AttachmentButton
          style={{
            fontSize: "1.2em",
            paddingLeft: "0.2em",
            paddingRight: "0.2em",
          }}
        />
        <InfoButton
          onClick={() => alert("Important message!")}
          style={{
            fontSize: "1.2em",
            paddingLeft: "0.2em",
            paddingRight: "0.2em",
          }}
        />
      </div>
    </ChatContainer>
  );
};

export default ChatRoom;
