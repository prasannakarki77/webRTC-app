"use client";
import VideoPlayer from "@/components/VideoPlayer";
import { PeerState } from "@/context/peerReducer";
import { RoomContext } from "@/context/RoomContext";
import { useContext, useEffect } from "react";

type TParams = {
  id: string;
};

const RoomPage = ({ params }: { params: TParams }) => {
  const roomId = params.id;
  const { ws, me, stream, peers } = useContext(RoomContext);
  useEffect(() => {
    if (me) ws.emit("join-room", { roomId, peerId: me._id });
  }, [me, roomId, ws]);

  return (
    <div>
      {params.id}
      <div className=" grid grid-cols-4 gap-4">
        <VideoPlayer stream={stream} />
        {Object.values(peers as PeerState).map((peer) => (
          <VideoPlayer stream={peer.stream} key={peer.stream.id} />
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
