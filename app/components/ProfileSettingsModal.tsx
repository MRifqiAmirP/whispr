"use client";

import { X, Camera, MapPin } from "lucide-react";
import { Mars, Venus, User } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    username: string;
    name: string;
    gender: string;
    location: string;
  }) => void;
  statusSavedUser: boolean;
}

export default function ProfileSettingsModal({
  isOpen,
  onClose,
  onSave,
  statusSavedUser,
}: Props) {
  const [username, setUsername] = useState("rawruwino");
  const [name, setName] = useState("Aruwino-chan");
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("New York, USA");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Settings
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 px-6 py-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-700">
                <Camera size={14} />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Tap to change profile picture
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              This is how you appear to others in chat rooms.
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`text-black mt-2 w-full rounded-lg border border-gray-200 ${!statusSavedUser ? "border-red-500" : ""} px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {!statusSavedUser && (
              <p className="mt-1 text-xs text-red-400">
                This username is already taken.
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>

            <div className="mt-3 flex gap-4">
              <button
                onClick={() => setGender("Male")}
                className={`text-blue-400 flex flex-col items-center rounded-xl border p-3 w-24 ${
                  gender === "Male"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <Mars size={20} />
                <span className="text-xs mt-1">Male</span>
              </button>

              <button
                onClick={() => setGender("Female")}
                className={`text-pink-500 flex flex-col items-center rounded-xl border p-3 w-24 ${
                  gender === "Female"
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200"
                }`}
              >
                <Venus size={20} />
                <span className="text-xs mt-1">Female</span>
              </button>

              <button
                onClick={() => setGender("Other")}
                className={`text-gray-800 flex flex-col items-center rounded-xl border p-3 w-24 ${
                  gender === "Other"
                    ? "border-gray-800 bg-gray-100"
                    : "border-gray-200"
                }`}
              >
                <User size={20} />
                <span className="text-xs mt-1">Other</span>
              </button>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="relative mt-2">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-black w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Visible only to friends (optional).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                username,
                name,
                gender,
                location,
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
