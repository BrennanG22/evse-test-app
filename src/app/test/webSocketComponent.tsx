import { useEffect, useState } from "react";

interface WebSocketComponentProps {
  webSocketURL: string
}

const WebSocketComponent: React.FC<WebSocketComponentProps> = ({webSocketURL}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Replace with your WebSocket server URL
    const socket = new WebSocket(webSocketURL);

    socket.onopen = () => {
      console.log("WebSocket Connected");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => console.log("WebSocket Disconnected");
    socket.onerror = (error) => console.error("WebSocket Error:", error);

    return () => socket.close(); // Cleanup on unmount
  }, []);

  return (<div />)
}

export default WebSocketComponent;