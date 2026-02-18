"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import ChatArea from "@/app/components/ChatArea";
import OnlineUsers from "@/app/components/OnlineUsers";
import ProfileSettingsModal from "@/app/components/ProfileSettingsModal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [statusSavedUser, setStatusSavedUser] = useState(true);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);

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
    let alive = true;

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (alive) {
          setTotalUsers(data.total);
          setUsers(data.users);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();

    const interval = setInterval(fetchUsers, 5000);

    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      const user = localStorage.getItem("whispr_user");

      if (user) {
        const parsed = JSON.parse(user);

        fetch(`api/profile/${parsed.uuid}`, {
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
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const savedUser = await res.json();

    localStorage.setItem("whispr_user", JSON.stringify(savedUser));

    if (savedUser.status != "success") {
      setUser(savedUser);
      setIsOpen(false);
      setStatusSavedUser(true);
      setSaveTrigger((prev) => prev + 1);
    } else {
      setIsOpen(true);
      setStatusSavedUser(false);
    }
  };

  return (
    <>
      <div className="h-screen bg-slate-100 flex">
        <Sidebar user={user} />
        <ChatArea saveTrigger={saveTrigger} totalUsers={totalUsers} />
        <OnlineUsers users={users} />
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
