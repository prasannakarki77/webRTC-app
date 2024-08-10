"use client";

import { useRouter } from "next/navigation";
import Peer from "peerjs";
import { createContext, ReactNode, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidV4 } from "uuid";

const WS = "http://localhost:8000";

export const RoomContext = createContext<any | null>(null);

const ws = socketIOClient(WS);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FunctionComponent<RoomProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const enterRoom = ({ roomId }: { roomId: string }) => {
    router.push("/room/" + roomId);
  };

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (error) {
      console.log(error);
    }
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
  }, []);

  return (
    <RoomContext.Provider value={{ ws, me, stream }}>
      {children}
    </RoomContext.Provider>
  );
};
