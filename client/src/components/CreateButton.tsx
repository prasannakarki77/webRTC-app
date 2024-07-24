import { RoomContext } from "@/context/RoomContext";
import React, { useContext } from "react";

const CreateButton = React.forwardRef<HTMLButtonElement>((props, ref) => {
  const { ws } = useContext(RoomContext);
  const createRoom = () => {
    ws.emit("create-room");
  };
  return (
    <button
      ref={ref}
      className="rounded-lg bg-red-600 font-medium p-2 text-white"
      {...props}
      onClick={createRoom}
    >
      Start new meeting
    </button>
  );
});

CreateButton.displayName = "CreateButton";

export default CreateButton;
