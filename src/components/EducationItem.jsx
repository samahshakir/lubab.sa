// src/components/EducationItem.jsx
import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
// Consider adding react-icons: npm install react-icons
// import { FaTrash } from 'react-icons/fa';

const EducationItem = ({ item, index, onChange, onRemove, isArabic }) => {
  const { darkMode } = useDarkMode();

  const handleChange = (e) => {
    onChange(index, e.target.name, e.target.value);
  };

  return (
    <div className={`p-4 rounded-lg border mb-4 ${darkMode ? 'border-gray-700 bg-dark-gray' : 'border-gray-300 bg-gray-50'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div>
          <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {isArabic ? "المؤسسة التعليمية" : "School/University"}
          </label>
          <input
            type="text" name="school" value={item.school} onChange={handleChange} required
            className={`w-full px-3 py-2 rounded border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' : 'bg-white border-gray-300 text-black focus:border-blue-500'} focus:outline-none focus:ring-1 focus:ring-blue-400`}
          />
        </div>
        <div>
          <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {isArabic ? "الشهادة/التخصص" : "Degree/Field of Study"}
          </label>
          <input
            type="text" name="degree" value={item.degree} onChange={handleChange} required
            className={`w-full px-3 py-2 rounded border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' : 'bg-white border-gray-300 text-black focus:border-blue-500'} focus:outline-none focus:ring-1 focus:ring-blue-400`}
          />
        </div>
        {/* Add Start/End Dates if needed */}
      </div>
       {/* Optional: Description field */}
       {/* <div>
          <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
             {isArabic ? "الوصف" : "Description (Optional)"}
          </label>
          <textarea name="description" value={item.description} onChange={handleChange} rows="2"
              className={`w-full px-3 py-2 rounded border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' : 'bg-white border-gray-300 text-black focus:border-blue-500'} focus:outline-none focus:ring-1 focus:ring-blue-400`}></textarea>
       </div> */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className={`mt-2 text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
        aria-label={isArabic ? "إزالة عنصر التعليم" : "Remove Education Item"}
      >
        {/* <FaTrash className="inline mr-1" /> */}
        {isArabic ? "إزالة" : "Remove"}
      </button>
    </div>
  );
};

// Create a similar ExperienceItem.jsx component adapting field names (company, role, etc.)

export default EducationItem;