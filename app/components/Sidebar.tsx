export default function Sidebar({ user }: { user: any }) {
  return (
    <div className="w-64 bg-gray-100 border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-teal-600">Whispr</h1>
      </div>

      {/* Rooms */}
      <div className="p-4 text-black">
        <p className="text-xs font-semibold text-slate-400 mb-2">ROOMS</p>
        <div className="space-y-2 font-bold">
          <div className="bg-teal-50 text-teal-600 px-3 py-2 rounded-lg flex justify-between">
            <span># Global Chat</span>
            <span className="inline-flex items-center justify-center text-xs bg-teal-500 text-white px-2 h-5 rounded-full leading-none">
              12
            </span>
          </div>
          <div className="px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
            # Tech Talk
          </div>
          <div className="px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
            # Gaming
          </div>
        </div>
      </div>

      {/* Direct Messages */}
      <div className="p-4 text-black">
        <p className="text-xs font-semibold text-slate-400 mb-2">
          DIRECT MESSAGES
        </p>
        <div className="space-y-2 text-sm">
          <div className="hover:bg-slate-100 px-3 py-2 rounded-lg cursor-pointer">
            Aruwino-chan
          </div>
          <div className="hover:bg-slate-100 px-3 py-2 rounded-lg cursor-pointer flex justify-between">
            A Fauzan
            <span className="inline-flex items-center justify-center text-xs bg-red-500 text-white px-2 h-5 rounded-full leading-none">
              1
            </span>
          </div>
        </div>
      </div>

      {/* User Footer */}
      {/* <div className="mt-auto p-4 border-t text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-300 rounded-full" />
          <div>
            <p className="font-bold text-black">Anon#9283</p>
            <p className="text-xs text-green-500 font-medium">Online</p>
          </div>
        </div>
      </div> */}

      <div className="mt-auto p-4 border-t text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-300 rounded-full" />
          <div>
            <p className="font-bold text-black">
              {user?.name || "Loading..."}
            </p>
            <p className="text-xs text-green-500 font-medium">
              {user?.location || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
