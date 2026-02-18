"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/app/components/Sidebar";
import ChatArea from "@/app/components/ChatArea";
import ProfileSettingsModal from "@/app/components/ProfileSettingsModal";
import OnlineUsersClient from "./OnlineUsersClient";

export default function HomeClient({
  initialUsers,
  initialTotal,
}: {
  initialUsers: any[];
  initialTotal: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [statusSavedUser, setStatusSavedUser] = useState(true);
  const [saveTrigger, setSaveTrigger] = useState(0);

  const [totalUsers, setTotalUsers] = useState(initialTotal);

  useEffect(() => {
    const stored = localStorage.getItem("whispr_user");

    if (stored) {
      setUser(JSON.parse(stored));
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      const user = localStorage.getItem("whispr_user");

      if (user) {
        const parsed = JSON.parse(user);

        fetch(`/api/profile/${parsed.uuid}`, {
          method: "DELETE",
          keepalive: true,
        });

        localStorage.removeItem("whispr_user");
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleSave = async (data: any) => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const savedUser = await res.json();

      localStorage.setItem(
        "whispr_user",
        JSON.stringify(savedUser)
      );

      if (savedUser.status !== "error") {
        setUser(savedUser);
        setIsOpen(false);
        setStatusSavedUser(true);
        setSaveTrigger((p) => p + 1);

        return true;
      }

      setStatusSavedUser(false);
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <>
      <div className="h-screen bg-slate-100 flex">
        <Sidebar user={user} />

        <ChatArea
          saveTrigger={saveTrigger}
          totalUsers={totalUsers}
        />

        <OnlineUsersClient
          initialUsers={initialUsers}
          initialTotal={initialTotal}
          onUpdate={setTotalUsers}
        />
      </div>

      <ProfileSettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        statusSavedUser={statusSavedUser}
      />
    </>
  );
}
