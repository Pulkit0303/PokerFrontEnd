import { useState, useRef, useEffect, useCallback } from "react";
import { Input, Card, Button, Notification } from "../components/ui";
import { useUser, useClerk } from "@clerk/clerk-react";
import useAxios from "../api/axiosInstance";

// Notification component


function GroupList() {
  const axios = useAxios();
  const { user } = useUser();
  const { signOut } = useClerk();

  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteGroupId, setDeleteGroupId] = useState(null);
  const profileRef = useRef(null);

  const fetchGroups = useCallback(async () => {
    try {
      const res = await axios.get("/groups");
      setGroups(res.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  }, [axios]);

  // Fetch groups
  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  // Click outside listener for logout
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    if (showLogout) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogout]);

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setNotification({ type: "error", message: "Group name cannot be empty" });
      return;
    }
    try {
      await axios.post("/groups", { name: groupName.trim() });
      setGroupName("");
      fetchGroups();
      setNotification({ type: "success", message: `${groupName.trim()} created` });
    } catch (err) {
      setNotification({ type: "error", message: "Failed to create group" });
      console.error("Error creating group:", err);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await axios.delete(`/groups/${id}`);
      fetchGroups();
      setShowDeleteModal(false);
      setDeleteGroupId(null);
      setNotification({ type: "success", message: "Group deleted" });
    } catch (err) {
      setNotification({ type: "error", message: "Failed to delete group" });
      console.error("Error deleting group:", err);
    }
  };

  // UI Elements function
  function LogoAndProfile() {
    return (
       <div className="flex flex-row justify-between items-center text-black mt-4 mx-4">
        {/* Logo and Title */}
        <div className="flex flex-row justify-center items-center">
          <img src="/poker_icon.svg" className="w-12 lg:w-20" />
          <span className="lg:text-[40px] text-[24px] font-semibold">
            PokerLedger
          </span>
        </div>

        {/* Profile + Logout Menu */}
        <div className="relative" ref={profileRef}>
          <button
            className="w-10 h-10 lg:w-14 lg:h-14 bg-black text-white border-2 border-black rounded-full flex items-center justify-center text-xl lg:text-3xl"
            onClick={() => setShowLogout((prev) => !prev)}
          >
            {user?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}
          </button>

          {showLogout && (
            <div className="absolute right-0 mt-2 border border-black rounded-xl z-10 bg-white w-32 text-center shadow-md">
              <button
                onClick={() => signOut()}
                className="w-full px-4 py-2 text-center text-black hover:text-white hover:bg-[#333333] transition-colors duration-200 rounded-[8px]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
  function DeleteGroupModal({ onCancel, onDelete }) {
  return (
    <div className="absolute left-0 top-0 w-full h-full z-50 flex items-start justify-center">
      <div className="w-full h-full bg-black/30 bg-opacity-30 absolute"></div>
      <div className="relative mt-20 p-2 border-red-500 border-3 rounded-xl w-fit bg-white text-red-700 shadow-lg">
        <div className="flex flex-col gap-2 text-xl font-bold">
          <h1 className="text-center">DELETE GROUP</h1>
          <ul className="text-xs list-disc ml-4 text-red-400">
            <li>Delete the group.</li>
            <li>Deletes all the players in the group.</li>
            <li>Deletes all the sessions in the group.</li>
          </ul>
        </div>
        <div className="flex flex-row gap-3 justify-evenly mt-4 font-bold text-center">
          <button
            className="px-4 py-1 border-2 rounded-lg text-black hover:bg-black hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 border-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div>
      <LogoAndProfile />
      <div className="flex flex-col gap-8 mt-8">
        <div className="flex flex-row gap-4 justify-center">
          <Input
            Placeholder={"Enter group name"}
            name={"groupName"}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button type={"Add"} onClick={handleCreateGroup} />
        </div>
        <div className="grid gap-6 w-full px-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {groups.length > 0 ? (
            groups.map((group) => (
              <Card
                key={group._id}
                usedFor={"Group"}
                title={group.name}
                date={new Date(group.createdAt).toDateString().substring(4)}
                onDelete={() => {
                  setShowDeleteModal(true);
                  setDeleteGroupId(group._id);
                }}
                onView={() => (window.location.href = `/groups/${group._id}`)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No groups found.</p>
          )}
        </div>
      </div>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
        />
      )}
      {showDeleteModal && (
        <DeleteGroupModal
          onCancel={() => {
            setShowDeleteModal(false);
            setDeleteGroupId(null);
          }}
          onDelete={() => handleDeleteGroup(deleteGroupId)}
        />
      )}
    </div>
  );
}

export default GroupList;
