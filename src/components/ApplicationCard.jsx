import { useState } from 'react';

function ApplicationCard({ application }) {
  const { personal, status, createdAt, jobSlug, skills } = application;
  
  const statusColors = {
    draft: 'bg-gray-200 text-gray-800',
    submitted: 'bg-blue-200 text-blue-800',
    reviewed: 'bg-yellow-200 text-yellow-800',
    rejected: 'bg-red-200 text-red-800',
    accepted: 'bg-green-200 text-green-800'
  };

  const formattedDate = new Date(createdAt).toLocaleDateString();
  
  // Only return the card view from this component
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">{personal.firstName} {personal.lastName}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status] || 'bg-gray-200'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="text-gray-600 mt-1 flex flex-wrap gap-2 mb-2">
        {skills && skills.skillList && skills.skillList.length > 0 ? (
          skills.skillList.slice(0, 3).map((skill, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-gray-700 text-sm">
              {skill}
              {skills.proficiencyLevels && skills.proficiencyLevels[skill] && (
                <span className="ml-1 text-gray-500">({skills.proficiencyLevels[skill]})</span>
              )}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No skills listed</span>
        )}
        {skills && skills.skillList && skills.skillList.length > 3 && (
          <span className="text-gray-500 text-sm">+{skills.skillList.length - 3} more</span>
        )}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <span className="text-blue-600 text-sm">View details →</span>
      </div>
    </div>
  );
}

export default ApplicationCard;