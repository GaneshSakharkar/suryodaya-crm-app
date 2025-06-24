import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Dialog,
  Input,
  Card,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  AddGetCourse,
  deleteGetCourse,
  getCources,
} from "../../../api/apiData"; // Make sure to implement delete and update API functions
import { useQuery } from "@tanstack/react-query";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseDuration: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null); // To hold the selected course for delete
  const [courseAdded, setCourseAdded] = useState(false); // New state to track course addition
  const [courseDeleted, setCourseDeleted] = useState(false); // New state to track course deletion

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenDeleteDialog = (course) => {
    setSelectedCourse(course);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCourse(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!newCourse.courseName)
      newErrors.courseName = "Course name is required.";
    if (!newCourse.courseDuration)
      newErrors.courseDuration = "Course duration is required.";
    if (!newCourse.price) newErrors.price = "Price is required.";
    else if (isNaN(newCourse.price) || newCourse.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAllCources = async () => {
    try {
      const res = await getCources();
      return res?.data?.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data } = useQuery({
    queryKey: ["cources"],
    queryFn: getAllCources,
  });

  useEffect(() => {
    if (data) setCourses(data);
  }, [data]);

  useEffect(() => {
    if (courseAdded || courseDeleted) {
      // Trigger a re-fetch when a course is added or deleted
      const fetchCourses = async () => {
        try {
          const res = await getAllCources();
          setCourses(res);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCourses();
      setCourseAdded(false); // Reset the flag
      setCourseDeleted(false); // Reset the flag
    }
  }, [courseAdded, courseDeleted]); // This will run every time a course is added or deleted

  const addCourse = async (courseReq) => {
    try {
      const res = await AddGetCourse(jwt, courseReq);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const jwt = localStorage.getItem("admin_jwt");

  const deleteCourseHandler = async () => {
    // alert(confirm("Are you sure want to delete this course?"));
    try {
      const res = await deleteGetCourse(jwt, selectedCourse.id);
      setCourseDeleted(true); // Set flag to trigger the re-fetch in useEffect
      alert(res?.data?.message);
      handleCloseDeleteDialog();
    } catch (error) {
      alert(error?.message);
    }
  };

  const handleAddCourse = async () => {
    if (!validate()) return;

    try {
      const res = await addCourse(newCourse);
      setNewCourse({ courseName: "", courseDuration: "", price: "" });
      alert(res?.data?.message);
      handleClose();
      setCourseAdded(true); // Set flag to trigger the re-fetch in the useEffect
    } catch (error) {
      alert(error?.message);
    }
  };

  return (
    <div className="p-8 w-full max-w-[95%] mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <Typography variant="h4">All Courses</Typography>
        <Button variant="filled" onClick={handleOpen}>
          Add Course
        </Button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-300">
            <th className="border p-2 text-center">Sr. No.</th>
            <th className="border p-2 text-center">Course Name</th>
            <th className="border p-2 text-center">Duration</th>
            <th className="border p-2 text-center">Price</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id || index}>
              <td className="border p-2 border-gray-300 text-center">
                {index + 1}
              </td>
              <td className="border p-2 border-gray-300 text-center">
                {course.courseName}
              </td>
              <td className="border p-2 border-gray-300 text-center">
                {course.courseDuration}
              </td>
              <td className="border p-2 border-gray-300 text-center">
                ₹{course.price}
              </td>
              <td className="border p-2 border-gray-300 text-center">
                <Button
                  variant="outlined"
                  color="red"
                  onClick={() => handleOpenDeleteDialog(course)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Course Dialog */}
      <Dialog open={open} handler={handleClose} size="sm">
        <Card className="bg-white p-6 mx-auto w-auto rounded-lg shadow-lg">
          <Typography variant="h6" className="text-center mb-4">
            Add New Course
          </Typography>
          <DialogBody>
            <div className="mt-6">
              <Input
                label="Course Name"
                value={newCourse.courseName}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseName: e.target.value })
                }
              />
              {errors.courseName && (
                <span className="text-red-500 text-sm">
                  {errors.courseName}
                </span>
              )}
            </div>
            <div className="mt-6">
              <Input
                label="Duration"
                value={newCourse.courseDuration}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseDuration: e.target.value })
                }
              />
              {errors.courseDuration && (
                <span className="text-red-500 text-sm">
                  {errors.courseDuration}
                </span>
              )}
            </div>
            <div className="mt-6">
              <Input
                label="Price"
                type="number"
                value={newCourse.price}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, price: e.target.value })
                }
              />
              {errors.price && (
                <span className="text-red-500 text-sm">{errors.price}</span>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-2">
            <Button variant="outlined" color="red" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleAddCourse}>
              Add Course
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog
        open={openDeleteDialog}
        handler={handleCloseDeleteDialog}
        size="sm"
      >
        <Card className="bg-white p-6 mx-auto w-auto rounded-lg shadow-lg">
          <Typography variant="h6" className="text-center mb-4">
            Are you sure you want to delete this course?
          </Typography>
          <DialogFooter className="flex justify-center items-center gap-2">
            <Button
              variant="outlined"
              color="red"
              onClick={handleCloseDeleteDialog}
            >
              Cancel
            </Button>
            <Button onClick={deleteCourseHandler}>Delete Course</Button>
          </DialogFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default ViewCourses;
