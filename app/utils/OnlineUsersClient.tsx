"use client";

import { useEffect, useState } from "react";
import OnlineUsers from "@/app/components/OnlineUsers";

export default function OnlineUsersClient({
  initialUsers,
}: {
  initialUsers: any[];
}) {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setUsers(data.users);
    };

    const interval = setInterval(fetchUsers, 5000);

    return () => clearInterval(interval);
  }, []);

  return <OnlineUsers users={users} />;
}
