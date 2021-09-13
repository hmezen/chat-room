let messages = [];

const addMessage = (newMessage) => {
  console.log(newMessage);
  return new Promise((resolve, reject) => {
    if (
      !newMessage.messageText ||
      !newMessage.roomId ||
      !newMessage.senderEmail
    )
      reject("messageText, senderEmail and roomId are required.");

    messages.push(newMessage);
    resolve(newMessage);
  });
};

const getMessages = (roomId) =>
  messages.filter((message) => message.roomId === roomId);

module.exports = { getMessages, addMessage };
