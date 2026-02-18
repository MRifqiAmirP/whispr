interface Props {
  username?: string
  message: string
  time: string
  self?: boolean
}

export default function MessageBubble({
  username,
  message,
  time,
  self = false,
}: Props) {
  return (
    <div className={`flex ${self ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-md ${self ? "text-right" : ""}`}>
        {!self && (
          <p className="text-sm font-medium text-slate-700">
            {username} <span className="text-xs text-slate-400">{time}</span>
          </p>
        )}

        <div
          className={`mt-1 px-4 py-2 rounded-2xl text-sm ${
            self
              ? "bg-teal-500 text-white"
              : "bg-slate-200 text-slate-800"
          }`}
        >
          {message}
        </div>

        {self && (
          <p className="text-xs text-slate-400 mt-1">{time}</p>
        )}
      </div>
    </div>
  )
}
