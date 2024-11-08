"use client";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

const ClientLayout = ({ children }) => {
  useSocket();
  const { joinArea } = useSocket();

  useEffect(() => {
    joinArea("A02");
  }, []);

  return <>{children}</>;
};

export default ClientLayout;
