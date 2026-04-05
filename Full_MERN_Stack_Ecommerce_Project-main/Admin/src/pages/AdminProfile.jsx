import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile } from "../features/auth/authSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { adminProfile, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  if (isLoading && !adminProfile) {
    return <h3 className="mb-4 title">Loading admin profile...</h3>;
  }

  return (
    <div>
      <h3 className="mb-4 title">Admin Profile</h3>
      <div className="bg-white p-4 rounded-3">
        <p className="mb-2">
          <strong>Name:</strong> {adminProfile?.name || "-"}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {adminProfile?.email || "-"}
        </p>
        <p className="mb-0">
          <strong>Role:</strong> {adminProfile?.role || "-"}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
