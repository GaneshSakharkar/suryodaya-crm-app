import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../../security/Encryption";
import { deleteUser } from "../../redux/slice/UserSlice";

export const AdminProfile = () => {
  const [user1, setUser1] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data = useSelector((state) => state.userReducer.user);

  const user = decryptData(data);

  useEffect(() => {
    if (user) {
      setUser1(user); // Ensure user is updated in state
    }
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("jwt");
    localStorage.clear();
    dispatch(deleteUser());
    setUser1(null);
    alert("Logout successful!");
    navigate("/admin-login");
  };

  return (
    <>
      <div className="p-4 w-4/5 flex justify-center items-center">
        <div className="p-4 text-xl flex flex-col items-center justify-center gap-10">
          <h1 className="font-medium text-4xl text-green-500 underline">
            Admin Profile
          </h1>
          <h1 className="font-medium text-3xl">Name: {user1?.name}</h1>
          <h1 className="font-medium text-3xl">Email: {user1?.email}</h1>
          <h1 className="font-medium text-3xl">
            Login Date: {user1?.loginDate}
          </h1>
          <h1 className="font-medium text-3xl">
            Registration Date: {user1?.registationDate}
          </h1>
          {/* <h1>{user1.authorities[0].authority}</h1> */}
          <button
            className="py-4 px-4 text-2xl bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
          {/* Optional chaining to prevent errors */}
        </div>
      </div>
    </>
  );
};
