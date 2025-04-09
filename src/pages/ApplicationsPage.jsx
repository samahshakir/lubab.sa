import React, { useState, useEffect } from "react";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/applications");
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Applications</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Name</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Email</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Phone</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Position</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Experience</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Message</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{app.name}</td>
                  <td className="px-6 py-4 text-gray-800">{app.email}</td>
                  <td className="px-6 py-4 text-gray-800">{app.phone}</td>
                  <td className="px-6 py-4 text-gray-800">{app.position}</td>
                  <td className="px-6 py-4 text-gray-800">{app.experience}</td>
                  <td className="px-6 py-4 text-gray-800">{app.message}</td>
                  <td className="px-6 py-4 text-gray-800">{new Date(app.dateSubmitted).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ApplicationsPage;
