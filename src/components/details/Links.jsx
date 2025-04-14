function Links({ links }) {
    if (!links || (!links.linkedin && !links.portfolio && !links.github && !links.other)) {
      return <p className="text-gray-500 italic">No links provided.</p>;
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.linkedin && (
          <div>
            <p className="text-gray-600">LinkedIn</p>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{links.linkedin}</a>
          </div>
        )}
        
        {links.portfolio && (
          <div>
            <p className="text-gray-600">Portfolio</p>
            <a href={links.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{links.portfolio}</a>
          </div>
        )}
        
        {links.github && (
          <div>
            <p className="text-gray-600">GitHub</p>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{links.github}</a>
          </div>
        )}
        
        {links.other && (
          <div>
            <p className="text-gray-600">Other</p>
            <a href={links.other} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{links.other}</a>
          </div>
        )}
      </div>
    );
  }
  
  export default Links;