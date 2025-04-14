function PersonalInfo({ personal }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Full Name</p>
          <p className="font-medium">{personal.firstName} {personal.lastName}</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-medium">{personal.email}</p>
        </div>
        <div>
          <p className="text-gray-600">Phone</p>
          <p className="font-medium">{personal.phone || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-gray-600">Address</p>
          <p className="font-medium">
            {[
              personal.address,
              personal.city,
              personal.state,
              personal.zipCode,
              personal.country
            ].filter(Boolean).join(', ') || 'Not provided'}
          </p>
        </div>
      </div>
    );
  }
  
  export default PersonalInfo;