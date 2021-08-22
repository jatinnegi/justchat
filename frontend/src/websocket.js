class WebSocketService {
  static instance = null;
  messages = [];

  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(chat_id) {
    if (this.socketRef) this.disconnect();
    const path = `ws://127.0.0.1:8000/ws/chat/${chat_id}/`;
    this.socketRef = new WebSocket(path);

    this.socketRef.onopen = () => {
      console.log("websocket open");
    };

    this.socketRef.onmessage = (e) => {
      // sending a message
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = (e) => {
      console.log("websocket closed");
      // this.connect();
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const { command } = parsedData;

    if (Object.keys(this.callbacks).length === 0) return;

    if (command === "fetch_messages") {
      this.messages = parsedData.messages;
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command]([...this.messages, parsedData.message]);
      this.messages.push(parsedData.message);
    }
  }

  fetchMessages() {
    this.sendMessage({ command: "fetch_messages" });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      message: message.content,
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks["fetch_messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (error) {
      console.log(error.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
