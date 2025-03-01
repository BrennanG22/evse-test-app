export default class webSocketHelper{
  private socketURL: string;
  private messages: string[] = [];
  private onMessageCallback: () => void;

  socket:WebSocket;

  constructor(url: string, callBack: ()=>void){
    this.onMessageCallback = callBack;
    this.socketURL = url;
    this.socket = new WebSocket(url);
    this.socket.onmessage = (event) => {
      this.messages.push(event.data);
      this.onMessageCallback();
    };
  };

  getLatestMessage(){
    return this.messages[this.messages.length-1]
  }

  closeSocket(){
    this.socket.close();
  }
}