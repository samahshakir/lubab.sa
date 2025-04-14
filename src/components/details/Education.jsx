function Education({ education }) {
    if (!education || education.length === 0) {
      return <p className="text-gray-500 italic">No education information provided.</p>;
    }
  
    return (
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-blue-200 pl-4">
            <h3 className="font-medium text-lg">{edu.institution}</h3>
            <p className="text-gray-700">{edu.degree} in {edu.fieldOfStudy}</p>
            <p className="text-gray-500">
              {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
            </p>
            {edu.description && (
              <p className="mt-2 text-gray-600">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  export default Education;
  