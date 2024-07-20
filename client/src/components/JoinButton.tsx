import { RoomContext } from "@/context/RoomContext";
import React, { useContext } from "react";

const JoinButton = React.forwardRef<HTMLButtonElement>((props, ref) => {
  const { ws } = useContext(RoomContext);
  const joinRoom = () => {
    ws.emit("join-room");
  };
  return (
    <button
      ref={ref}
      className="rounded-lg bg-red-600 font-medium p-2 text-white"
      {...props}
      onClick={joinRoom}
    >
      Start new meeting
    </button>
  );
});

JoinButton.displayName = "JoinButton";

export default JoinButton;
