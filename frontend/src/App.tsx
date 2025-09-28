import { useState } from "react";
import HealthForm from "./components/HealthForm";
import RiskCard from "./components/RiskCard";

function App() {
  const [risk, setRisk] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              HealthIQ
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              AI-Powered Diabetes Risk Assessment
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Get an instant assessment of your diabetes risk based on key health indicators. 
              Our machine learning model analyzes your health data to provide personalized risk insights.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="order-2 lg:order-1">
              <HealthForm onResult={setRisk} />
            </div>

            {/* Results Section */}
            <div className="order-1 lg:order-2">
              {risk !== null ? (
                <RiskCard score={risk} />
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Ready for Assessment
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Fill out the health form to get your personalized diabetes risk assessment.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <h4 className="font-medium text-gray-800 mb-2">What you'll need:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Blood glucose level</li>
                      <li>• Blood pressure reading</li>
                      <li>• BMI (Body Mass Index)</li>
                      <li>• Age and pregnancy history</li>
                      <li>• Insulin and skin thickness data</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-800 mb-2">About This Assessment</h3>
              <p className="text-sm text-gray-600 mb-4">
                This diabetes risk assessment uses machine learning algorithms trained on the Pima Indians Diabetes Dataset 
                to provide personalized risk predictions based on your health indicators.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span>✓ AI-Powered Analysis</span>
                <span>✓ Instant Results</span>
                <span>✓ Privacy Protected</span>
                <span>✓ Evidence-Based</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
