"use client";

import { useRouter } from "next/navigation";
import Peer from "peerjs";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidV4 } from "uuid";
import { peerReducer } from "./peerReducer";
import { addPeerAction } from "./peerActions";

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
  const [peers, dispatch] = useReducer(peerReducer, {});

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

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    ws.on("user-joined", ({ peerId }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  console.log({ peers });

  return (
    <RoomContext.Provider value={{ ws, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
