import { ArrowLeft } from 'lucide-react';

const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className="items-center space-x-2 px-4 py-2 text-secondary-blue hover:text-blue-600 rounded-md hidden md:flex font-nizar relative z-15"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
};

export default GoBackButton;
