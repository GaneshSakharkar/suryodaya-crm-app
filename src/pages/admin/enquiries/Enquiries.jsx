import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEnquiries } from "../../../api/apiData";
import { AdminEnquiriesTable } from "./EnquiriesTable";

export const AdminEnquiries = () => {
  //   const [searchQuery, setSearchQuery] = useState(""); // For searching by name or email
  //   const [idSearchQuery, setIdSearchQuery] = useState(""); // For searching by ID
  //   const [filters, setFilters] = useState({
  //     college: "",
  //     branch: "",
  //     course: "",
  //     qualification: "",
  //   });
  const [enquiries, setEnquiries] = useState([]);
  //   const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const jwt = localStorage.getItem("admin_jwt");

  // Debounce function for search
  //   const debounceSearch = useCallback(
  //     debounce((query, callback) => callback(query), 300),
  //     []
  //   );

  // Fetch all enquiries
  const fetchAllEnquiries = async () => {
    try {
      const res = await getEnquiries(jwt, "admin");
      return res?.data?.data || [];
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      return [];
    }
  };

  const { data } = useQuery({
    queryKey: ["enquiries"],
    queryFn: fetchAllEnquiries,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (data) {
      setEnquiries(data); // Set enquiries without reversing
      //   setFilteredEnquiries(data); // Set filteredEnquiries to the full list initially
    }
  }, [data]);

  // Fetch distinct options for filters
  //   const { data: collegeData } = useQuery({
  //     queryKey: ["distinctCollege"],
  //     queryFn: () => getDistinctCollege(jwt),
  //     enabled: jwt !== "",
  //   });

  //   const { data: courseData } = useQuery({
  //     queryKey: ["distinctCourse"],
  //     queryFn: () => getDistinctCourse(jwt),
  //     enabled: jwt !== "",
  //   });

  //   // console.log(courseData);

  //   const { data: branchData } = useQuery({
  //     queryKey: ["distinctBranch"],
  //     queryFn: () => getDistinctBranch(jwt),
  //     enabled: jwt !== "",
  //   });

  //   const { data: qualificationData } = useQuery({
  //     queryKey: ["distinctQualification"],
  //     queryFn: () => getDistinctQualification(jwt),
  //     enabled: jwt !== "",
  //   });

  //   // Dynamically search by ID
  //   const { data: idSearchResults } = useQuery({
  //     queryKey: ["searchEnquiriesById", idSearchQuery],
  //     queryFn: () => searchEnquiriesById(jwt, idSearchQuery),
  //     enabled: idSearchQuery !== "", // Only search if there is an ID query
  //     onSuccess: (data) => {
  //       setFilteredEnquiries(data?.data?.data || []);
  //     },
  //     onError: (error) => {
  //       console.error("Error searching by ID:", error);
  //     },
  //   });

  //   // Dynamically search by Name or Email
  //   const { data: nameSearchResults } = useQuery({
  //     queryKey: ["searchEnquiriesByName", searchQuery],
  //     queryFn: () => searchEnquiriesByName(jwt, searchQuery),
  //     enabled: searchQuery !== "", // Only search if there is a name query
  //     onSuccess: (data) => {
  //       setFilteredEnquiries(data?.data?.data || []);
  //     },
  //     onError: (error) => {
  //       console.error("Error searching by name:", error);
  //     },
  //   });

  //   // Filtering Enquiries based on selected filters
  //   useEffect(() => {
  //     let filtered = [...enquiries]; // Start with all enquiries

  //     // Filter by name or email
  //     if (searchQuery) {
  //       filtered = filtered.filter(
  //         (enquiry) =>
  //           enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           enquiry.email.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //     }

  //     // Filter by ID
  //     if (idSearchQuery) {
  //       filtered = filtered.filter((enquiry) =>
  //         enquiry.id.toString().includes(idSearchQuery)
  //       );
  //     }

  //     // Filter by college
  //     if (filters.college) {
  //       filtered = filtered.filter((enquiry) =>
  //         enquiry.college?.toLowerCase().includes(filters.college.toLowerCase())
  //       );
  //     }

  //     // Filter by branch
  //     if (filters.branch) {
  //       filtered = filtered.filter((enquiry) =>
  //         enquiry.branch?.toLowerCase().includes(filters.branch.toLowerCase())
  //       );
  //     }

  //     // Filter by course
  //     if (filters.course) {
  //       filtered = filtered.filter((enquiry) =>
  //         enquiry.courses.some((course) =>
  //           course.courseName.toLowerCase().includes(filters.course.toLowerCase())
  //         )
  //       );
  //     }

  //     // Filter by qualification
  //     if (filters.qualification) {
  //       filtered = filtered.filter((enquiry) =>
  //         enquiry.qualification
  //           ?.toLowerCase()
  //           .includes(filters.qualification.toLowerCase())
  //       );
  //     }

  //     setFilteredEnquiries(filtered); // Update the filtered enquiries
  //   }, [searchQuery, idSearchQuery, filters, enquiries]);

  //   const handleSelectChange = (name, value) => {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       [name]: value,
  //     }));
  //   };

  return (
    <div className="w-full  mt-5 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        Enquiries
      </h1>

      {/* Filters and Search Section */}
      {/* <div className="mb-6">
        <EnquiriesFilters
          searchQuery={searchQuery}
          idSearchQuery={idSearchQuery}
          filters={filters}
          setSearchQuery={setSearchQuery}
          setIdSearchQuery={setIdSearchQuery}
          setFilters={setFilters}
          colleges={collegeData?.data?.data || []}
          branches={branchData?.data?.data || []}
          courses={courseData?.data?.data || []}
          qualifications={qualificationData?.data?.data || []}
        />
      </div> */}

      {/* Enquiries Table */}
      <div className="overflow-x-auto">
        <AdminEnquiriesTable enquiries={enquiries} />
      </div>
    </div>
  );
};
