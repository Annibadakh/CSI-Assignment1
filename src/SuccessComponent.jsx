import { useLocation } from "react-router-dom";
import { CheckCircle, User } from "lucide-react";

const SuccessComponent = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-lg text-gray-600">No data submitted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 text-green-600 rounded-full p-4">
            <CheckCircle className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-green-700 mb-2">Submission Successful!</h2>
        <p className="text-center text-gray-600 mb-6">Here's what we received from you:</p>
        <ul className="divide-y divide-gray-200">
          {Object.entries(state).map(([key, value]) =>
            key !== "showPassword" ? (
              <li key={key} className="py-3 flex justify-between">
                <span className="font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span className="text-gray-900">{value}</span>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default SuccessComponent;
