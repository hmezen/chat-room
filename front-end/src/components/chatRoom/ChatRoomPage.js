import React, { useEffect, useState } from "react";
import { Paper, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MainContainer,
  Avatar,
  Search,
  Sidebar,
  ConversationList,
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import ChatRoom from "./ChatRoom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const OriginalChatRooms = [
  {
    id: "MyChatRoom",
    name: "My chat room",
    info: "first chat room",
    imageUrl:
      "https://avatars.dicebear.com/v2/gridy/669a52e703df431e854dd763483ccb30.svg",
  },
  {
    id: "SecondChatRoom",
    name: "Second chat room",
    info: "second",
    imageUrl:
      "https://avatars.dicebear.com/v2/identicon/669a52e703df431e854dd763483ccb30.svg",
  },
  {
    id: "NewChatRoom",
    name: "Hello Chat room",
    info: "Only say hello",
    imageUrl:
      "https://gravatar.com/avatar/669a52e703df431e854dd763483ccb30?s=400&d=identicon&r=x",
  },
  {
    id: "NeverSendRoom",
    name: "Type and never send room",
    info: "try typing messages but never send them",
    imageUrl:
      "https://gravatar.com/avatar/669a52e703df431e854dd763483ccb30?s=400&d=retro&r=x",
  },
  {
    id: "FootballRoom",
    name: "Premier League room",
    info: "Only Premier League topics",
    imageUrl:
      "https://avatars.dicebear.com/v2/avataaars/669a52e703df431e854dd763483ccb30.svg",
  },
  {
    id: "TennisRoom",
    name: "Tennis room",
    info: "Only tennis topics",
    imageUrl:
      "https://gravatar.com/avatar/669a52e703df431e854dd763483ccb30?s=400&d=wavatar&r=x",
  },
];

const ChatRooms = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [chatRoom, setChatRoom] = useState(null);
  const [searchSidebar, setSearchSidebar] = useState("");
  const [chatRooms, setChatRooms] = useState(OriginalChatRooms);
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});

  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isBigScreen) {
      setSidebarStyle({});
      setChatContainerStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
    } else {
      if (!chatRoom) {
        handleConversationClick();
      }
    }
  }, [isBigScreen]);

  const handleConversationClick = () => {
    setSidebarStyle({
      display: "flex",
      flexBasis: "auto",
      width: "100%",
      maxWidth: "100%",
    });
    setChatContainerStyle({
      display: "none",
    });
    setConversationContentStyle({
      display: "flex",
    });
    setConversationAvatarStyle({
      marginRight: "1em",
    });
  };

  useEffect(() => {
    if (searchSidebar !== "") {
      let newChatRoomslist = chatRooms.filter((ele) =>
        ele.name.toLowerCase().includes(searchSidebar.toLowerCase())
      );
      setChatRooms(newChatRoomslist);
    } else {
      setChatRooms(OriginalChatRooms);
    }
  }, [searchSidebar]);

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <div
            style={{
              height: "400px",
              position: "relative",
            }}
          >
            <MainContainer responsive>
              <Sidebar position="left" style={sidebarStyle}>
                <Search
                  placeholder="Search..."
                  value={searchSidebar}
                  onChange={(v) => setSearchSidebar(v)}
                  onClearClick={() => setSearchSidebar("")}
                />
                <ConversationList loading={false}>
                  {chatRooms.map((chatRoomElement, index) => (
                    <Conversation
                      active={
                        chatRoom
                          ? chatRoom.id === chatRoomElement.id
                            ? true
                            : false
                          : false
                      }
                      key={index}
                      onClick={() => {
                        setSidebarStyle({});
                        setChatContainerStyle({});
                        setConversationContentStyle({});
                        setConversationAvatarStyle({});
                        setChatRoom(chatRoomElement);
                      }}
                    >
                      <Avatar
                        src={chatRoomElement.imageUrl}
                        style={conversationAvatarStyle}
                      />
                      <Conversation.Content
                        name={chatRoomElement.name}
                        info={chatRoomElement.info}
                        style={conversationContentStyle}
                      />
                    </Conversation>
                  ))}
                </ConversationList>
              </Sidebar>
              {chatRoom ? (
                <ChatRoom
                  chatRoom={chatRoom}
                  chatContainerStyle={chatContainerStyle}
                  sidebarStyle={sidebarStyle}
                  handleConversationClick={() => handleConversationClick()}
                />
              ) : null}
            </MainContainer>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default ChatRooms;
