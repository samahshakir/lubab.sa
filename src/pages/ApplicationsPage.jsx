// import React, { useState, useEffect } from "react";
// import { authAxios, logout, isAuthenticated,verifyToken } from "../utils/auth"; // Importing the functions

// const ApplicationsPage = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Check if the user is authenticated before fetching the applications
//   useEffect(() => {
//     const checkToken = async () => {
//         if (!isAuthenticated()) {
//           // If the user is not authenticated, log them out and redirect to login
//           logout();
//           return;
//         }
//         try {
//           // Verify the token
//           const user = await verifyToken();
//           if (!user) {
//             // If token is invalid or expired, log the user out and redirect to login
//             logout();
//           } else {
//             fetchApplications(); // Fetch applications if token is valid
//           }
//         } catch (err) {
//           setError("Error verifying token");
//           logout();
//         }
//       };

//     const fetchApplications = async () => {
//       try {
//         const response = await authAxios().get("/applications");
//         setApplications(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch applications");
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkToken();
//     fetchApplications();
//   }, []);

//   // Handle logout on button click
//   const handleLogout = () => {
//     logout();
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
// <div className="flex items-center justify-between mb-6">
//   <h1 className="text-3xl font-bold text-gray-800">Applications</h1>
//   <button 
//     onClick={handleLogout} 
//     className="text-red-500 font-semibold px-4 py-2 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300"
//   >
//     Logout
//   </button>
// </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-100 border-b border-gray-200">
//             <tr>
//               <th className="text-left px-6 py-3 text-gray-600 font-semibold">Name</th>
//               <th className="text-left px-6 py-3 text-gray-600 font-semibold">Email</th>
//               <th className="text-left px-6 py-3 text-gray-600 font-semibold">Phone</th>
//               <th className="text-left px-6 py-3 text-gray-600 font-semibold">Position</th>
//               <th className="text-left px-6 py-3 text-gray-600 font-semibold">Experience</th>
//               <th className="text-left px-6 py-3 text-gray-600 font-semibold">Message</th>
//               <th className="text-left px-6 py-3 text-gray-600 font-semibold">Date Submitted</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((app) => (
//               <tr key={app._id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4 text-gray-800">{app.name}</td>
//                 <td className="px-6 py-4 text-gray-800">{app.email}</td>
//                 <td className="px-6 py-4 text-gray-800">{app.phone}</td>
//                 <td className="px-6 py-4 text-gray-800">{app.position}</td>
//                 <td className="px-6 py-4 text-gray-800">{app.experience}</td>
//                 <td className="px-6 py-4 text-gray-800">{app.message}</td>
//                 <td className="px-6 py-4 text-gray-800">{new Date(app.dateSubmitted).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ApplicationsPage;
