export default function RiskCard({ score }: { score: number }) {
  const riskPercentage = Math.round(score * 100);
  
  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return { level: 'Low', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-200', textColor: 'text-green-800' };
    if (percentage < 60) return { level: 'Moderate', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', textColor: 'text-yellow-800' };
    if (percentage < 80) return { level: 'High', color: 'orange', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', textColor: 'text-orange-800' };
    return { level: 'Very High', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-800' };
  };

  const getRiskMessage = (percentage: number) => {
    if (percentage < 30) return 'Your risk of developing diabetes is relatively low. Continue maintaining a healthy lifestyle.';
    if (percentage < 60) return 'You have a moderate risk of developing diabetes. Consider consulting with a healthcare provider.';
    if (percentage < 80) return 'You have a high risk of developing diabetes. We recommend consulting with a healthcare provider soon.';
    return 'You have a very high risk of developing diabetes. Please consult with a healthcare provider immediately.';
  };

  const getRecommendations = (percentage: number) => {
    if (percentage < 30) return [
      'Maintain a balanced diet',
      'Exercise regularly',
      'Monitor your health regularly'
    ];
    if (percentage < 60) return [
      'Consult with a healthcare provider',
      'Adopt a healthier diet',
      'Increase physical activity',
      'Monitor blood sugar levels'
    ];
    if (percentage < 80) return [
      'Schedule a medical consultation immediately',
      'Consider diabetes screening tests',
      'Implement lifestyle changes',
      'Monitor health metrics closely'
    ];
    return [
      'Seek immediate medical attention',
      'Schedule comprehensive diabetes screening',
      'Implement strict lifestyle modifications',
      'Consider medication consultation'
    ];
  };

  const riskInfo = getRiskLevel(riskPercentage);
  const message = getRiskMessage(riskPercentage);
  const recommendations = getRecommendations(riskPercentage);

  return (
    <div className={`mt-6 ${riskInfo.bgColor} ${riskInfo.borderColor} border-2 rounded-lg p-6 shadow-lg`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Diabetes Risk Assessment</h3>
        <div className={`text-4xl font-bold ${riskInfo.textColor} mb-2`}>
          {riskPercentage}%
        </div>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${riskInfo.color}-100 ${riskInfo.textColor}`}>
          {riskInfo.level} Risk
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
        <ul className="space-y-1">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-800">
          <strong>Disclaimer:</strong> This assessment is for informational purposes only and should not replace professional medical advice. 
          Please consult with a healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}
