import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationBySlug } from '../services/api';
import PersonalInfo from './details/PersonalInfo';
import Education from './details/Education';
import Experience from './details/Experience';
import Skills from './details/Skills';
import Links from './details/Links';
import LoadScreen from './LoadScreen';

function ApplicationDetail() {
  const { slug,userId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const data = await getApplicationBySlug(slug,userId);
        setApplication(data);
      } catch (err) {
        setError('Failed to fetch application details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [slug]);

  if (loading) {
    return <LoadScreen/>
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  if (!application) {
    return <div className="bg-yellow-50 p-4 rounded text-yellow-700">Application not found.</div>;
  }

  const { personal, education, experience, skills, links, status, createdAt } = application;
  const statusColors = {
    draft: 'bg-gray-200 text-gray-800',
    submitted: 'bg-blue-200 text-blue-800',
    reviewed: 'bg-yellow-200 text-yellow-800',
    rejected: 'bg-red-200 text-red-800',
    accepted: 'bg-green-200 text-green-800'
  };

  return (
    <div className='font-nizar text-black mx-5 my-5'>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Application Details</h1>
        <span className={`px-3 py-1 rounded-full ${statusColors[status] || 'bg-gray-800'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <PersonalInfo personal={personal} />
        </div>
        
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <Education education={education} />
        </div>
        
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          <Experience experience={experience} />
        </div>
        
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <Skills skills={skills} />
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          <Links links={links} />
        </div>
      </div>
      
      {personal.coverLetter && (
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
          <div className="whitespace-pre-line text-gray-700">{personal.coverLetter}</div>
        </div>
      )}
    </div>
  );
}

export default ApplicationDetail;