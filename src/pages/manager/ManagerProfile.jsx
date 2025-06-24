import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../../security/Encryption";
import { deleteUser } from "../../redux/slice/UserSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export const ManagerProfile = () => {
  const [user1, setUser1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.userReducer.user);

  // Memoize the decrypted user to avoid recalculation on every render
  const user = useMemo(() => decryptData(data), [data]);

  useEffect(() => {
    if (user) {
      setUser1(user);
      setLoading(false);
    }
  }, [data]); // Depend only on `data`

  const handleLogout = () => {
    localStorage.clear();
    dispatch(deleteUser());
    setUser1(null);
    alert("Logout successful!");
    navigate("/manager-login");
  };

  const handleUpdateProfile = () => {
    setUpdatedUser({
      name: user1.name,
      email: user1.email,
      password: "",
    });
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-[95%] h-lvh flex justify-center items-center py-10 bg-gray-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader color="green" className="relative h-56">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Profile Background"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="font-bold mb-2">
            {user1?.name}
          </Typography>
          <Typography color="gray" className="font-medium">
            {user1?.email}
          </Typography>
          <div className="mt-4 text-left space-y-2">
            <Typography variant="paragraph" color="blue-gray">
              <strong>Login Date:</strong> {user1?.loginDate}
            </Typography>
            <Typography variant="paragraph" color="blue-gray">
              <strong>Registration Date:</strong> {user1?.registationDate}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between items-center gap-4">
          <Button color="blue" fullWidth onClick={handleUpdateProfile}>
            Update Profile
          </Button>
          <Button color="red" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
