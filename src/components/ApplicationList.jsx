import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApplications } from '../services/api';
import ApplicationCard from './ApplicationCard';

function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupedApplications, setGroupedApplications] = useState({});
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getApplications();
        console.log(data)
        // Filter only submitted applications
        const submittedApplications = data.filter(app => app.status === "submitted");;
        setApplications(submittedApplications);
        
        // Group submitted applications by jobSlug
        const grouped = submittedApplications.reduce((acc, app) => {
          // Handle applications with no job slug
          const slug = app.jobSlug || 'Uncategorized';
          
          if (!acc[slug]) {
            acc[slug] = [];
          }
          acc[slug].push(app);
          return acc;
        }, {});
        
        setGroupedApplications(grouped);
      } catch (err) {
        setError('Failed to fetch applications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Helper function to display status badge
  const StatusBadge = ({ status }) => {
    const statusColors = {
      draft: 'bg-gray-200 text-gray-800',
      submitted: 'bg-blue-200 text-blue-800',
      reviewed: 'bg-yellow-200 text-yellow-800',
      rejected: 'bg-red-200 text-red-800',
      accepted: 'bg-green-200 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status] || 'bg-gray-200'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div></div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  return (
    <div className='font-nizar text-black mx-15 my-10'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Submitted Job Applications</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('card')}
            className={`px-3 py-1 rounded ${viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Card View
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Table View
          </button>
        </div>
      </div>
      
      {applications.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded text-yellow-700">No submitted applications found.</div>
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedApplications).map(jobSlug => (
            <div key={jobSlug} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-gray-200">
                {jobSlug}
              </h2>
              
              {viewMode === 'card' ? (
                // Card View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedApplications[jobSlug].map(app => (
                    <Link to={`/application/${app.jobSlug}/${app._id}`} key={app._id}>
                      <ApplicationCard application={app} />
                    </Link>
                  ))}
                </div>
              ) : (
                // Table View
                <div className="bg-white rounded-lg shadow overflow-hidden max-w-[80%]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {groupedApplications[jobSlug].map(app => (
                        <tr key={app._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{app.personal.firstName} {app.personal.lastName}</div>
                            <div className="text-sm text-gray-500">{app.personal.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {app.skills && app.skills.skillList && app.skills.skillList.length > 0 ? (
                                <>
                                  {app.skills.skillList.slice(0, 2).map((skill, index) => (
                                    <span key={index} className="bg-gray-200 px-2 py-0.5 rounded-full text-gray-700 text-xs">
                                      {skill}
                                    </span>
                                  ))}
                                  {app.skills.skillList.length > 2 && (
                                    <span className="text-gray-500 text-xs">+{app.skills.skillList.length - 2} more</span>
                                  )}
                                </>
                              ) : (
                                <span className="text-gray-500 text-xs">No skills listed</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={app.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                            <Link to={`/application/${app.jobSlug}`} className="text-blue-600 hover:text-blue-900">
                              View details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsList;