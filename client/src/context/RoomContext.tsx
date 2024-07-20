"use client";

import React, { createContext, ReactNode } from "react";
import socketIOClient from "socket.io-client";

const WS = "http://localhost:8000";

export const RoomContext = createContext<any | null>(null);

const ws = socketIOClient(WS);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FunctionComponent<RoomProviderProps> = ({
  children,
}) => {
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};
