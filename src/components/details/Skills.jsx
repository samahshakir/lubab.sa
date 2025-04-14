function Skills({ skills }) {
    if (!skills || !skills.skillList || skills.skillList.length === 0) {
      return <p className="text-gray-500 italic">No skills information provided.</p>;
    }
  
    return (
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.skillList.map((skill, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">
              {skill}
              {skills.proficiencyLevels && skills.proficiencyLevels[skill] && (
                <span className="ml-1 text-gray-500">({skills.proficiencyLevels[skill]})</span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default Skills;