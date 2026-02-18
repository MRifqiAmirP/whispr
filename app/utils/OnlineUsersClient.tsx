"use client";

import { useEffect, useState } from "react";
import OnlineUsers from "@/app/components/OnlineUsers";

export default function OnlineUsersClient({
  initialUsers,
  initialTotal,
  onUpdate,
}: {
  initialUsers: any[];
  initialTotal: number;
  onUpdate: (total: number) => void;
}) {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setUsers(data.users);
      onUpdate(data.total);
    };

    const interval = setInterval(fetchUsers, 5000);

    return () => clearInterval(interval);
  }, [onUpdate]);

  return <OnlineUsers users={users} />;
}
