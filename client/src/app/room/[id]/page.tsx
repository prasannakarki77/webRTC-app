"use client";
import VideoPlayer from "@/components/VideoPlayer";
import { RoomContext } from "@/context/RoomContext";
import { useContext, useEffect } from "react";

type TParams = {
  id: string;
};

const RoomPage = ({ params }: { params: TParams }) => {
  const roomId = params.id;
  const { ws, me, stream } = useContext(RoomContext);
  useEffect(() => {
    if (me) ws.emit("join-room", { roomId, peerId: me._id });
  }, [me, roomId, ws]);

  return (
    <div>
      {" "}
      {params.id}
      <div className="">
        <VideoPlayer stream={stream} />
      </div>
    </div>
  );
};

export default RoomPage;
