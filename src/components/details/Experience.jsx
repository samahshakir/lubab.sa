function Experience({ experience }) {
    if (!experience || experience.length === 0) {
      return <p className="text-gray-500 italic">No experience information provided.</p>;
    }
  
    return (
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="border-l-4 border-green-200 pl-4">
            <h3 className="font-medium text-lg">{exp.position}</h3>
            <p className="text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
            <p className="text-gray-500">
              {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
            </p>
            {exp.description && (
              <p className="mt-2 text-gray-600">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  export default Experience;