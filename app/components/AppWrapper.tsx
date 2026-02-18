"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import OnlineUsers from "./OnlineUsers";
import ProfileSettingsModal from "./ProfileSettingsModal";

export default function AppWrapper() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <div className="h-screen bg-slate-100 flex">
        <Sidebar />
        <ChatArea />
        <OnlineUsers />
      </div>

      <ProfileSettingsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => setShowModal(false)}
      />
    </>
  );
}
