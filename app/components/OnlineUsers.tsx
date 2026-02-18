interface Props {
  users: Array<any>;
}

export default function OnlineUsers({ users }: Props) {
  return (
    <div className="w-64 bg-white border-l p-4 hidden lg:block">
      <h3 className="font-semibold mb-4 text-black">Online</h3>

      <div className="space-y-3 text-sm">
        {users.map((user) => (
          <div key={user.uuid} className="flex items-center gap-3">
            {/* Status online */}
            <div className="w-2 h-2 bg-green-500 rounded-full" />

            {/* Foto profile */}
            <img
              src={user.avatar ?? "https://xsgames.co/randomusers/avatar.php?g=male"}
              alt={user.name}
              className="w-9 h-9 rounded-full border"
            />

            {/* Nama */}
            <span className="text-black">{user.name} <span className="text-slate-400">({user.username})</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
