import { useState } from "react";
import { predict, ApiError } from "../api/client";

// Define HealthInput locally to avoid import issues
interface HealthInput {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}

type Props = { onResult: (risk: number) => void };

interface FormData {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  age: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function HealthForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string): string => {
    const numValue = parseFloat(value);
    
    switch (name) {
      case 'pregnancies':
        if (!value) return 'Pregnancies is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        return '';
      
      case 'glucose':
        if (!value) return 'Glucose level is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        if (numValue > 600) return 'Glucose level seems unusually high';
        return '';
      
      case 'bloodPressure':
        if (!value) return 'Blood pressure is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        if (numValue > 200) return 'Blood pressure seems unusually high';
        return '';
      
      case 'skinThickness':
        if (!value) return 'Skin thickness is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        if (numValue > 100) return 'Skin thickness seems unusually high';
        return '';
      
      case 'insulin':
        if (!value) return 'Insulin level is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        return '';
      
      case 'bmi':
        if (!value) return 'BMI is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        if (numValue > 100) return 'BMI seems unusually high';
        return '';
      
      case 'diabetesPedigree':
        if (!value) return 'Diabetes pedigree function is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        return '';
      
      case 'age':
        if (!value) return 'Age is required';
        if (isNaN(numValue) || numValue < 0) return 'Must be a valid non-negative number';
        if (numValue > 120) return 'Age seems unusually high';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const body: HealthInput = {
        pregnancies: parseFloat(formData.pregnancies),
        glucose: parseFloat(formData.glucose),
        bloodPressure: parseFloat(formData.bloodPressure),
        skinThickness: parseFloat(formData.skinThickness),
        insulin: parseFloat(formData.insulin),
        bmi: parseFloat(formData.bmi),
        diabetesPedigree: parseFloat(formData.diabetesPedigree),
        age: parseFloat(formData.age)
      };
      
      const res = await predict(body);
      onResult(res.risk);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while predicting risk');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pregnancies" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Pregnancies
            </label>
            <input
              type="number"
              id="pregnancies"
              name="pregnancies"
              value={formData.pregnancies}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.pregnancies ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 2"
              min="0"
              step="1"
            />
            {errors.pregnancies && (
              <p className="text-red-500 text-xs mt-1">{errors.pregnancies}</p>
            )}
          </div>

          <div>
            <label htmlFor="glucose" className="block text-sm font-medium text-gray-700 mb-1">
              Glucose Level (mg/dL)
            </label>
            <input
              type="number"
              id="glucose"
              name="glucose"
              value={formData.glucose}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.glucose ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 148"
              min="0"
              step="0.1"
            />
            {errors.glucose && (
              <p className="text-red-500 text-xs mt-1">{errors.glucose}</p>
            )}
          </div>

          <div>
            <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700 mb-1">
              Blood Pressure (mmHg)
            </label>
            <input
              type="number"
              id="bloodPressure"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bloodPressure ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 72"
              min="0"
              step="1"
            />
            {errors.bloodPressure && (
              <p className="text-red-500 text-xs mt-1">{errors.bloodPressure}</p>
            )}
          </div>

          <div>
            <label htmlFor="skinThickness" className="block text-sm font-medium text-gray-700 mb-1">
              Skin Thickness (mm)
            </label>
            <input
              type="number"
              id="skinThickness"
              name="skinThickness"
              value={formData.skinThickness}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.skinThickness ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 35"
              min="0"
              step="0.1"
            />
            {errors.skinThickness && (
              <p className="text-red-500 text-xs mt-1">{errors.skinThickness}</p>
            )}
          </div>

          <div>
            <label htmlFor="insulin" className="block text-sm font-medium text-gray-700 mb-1">
              Insulin Level (μU/mL)
            </label>
            <input
              type="number"
              id="insulin"
              name="insulin"
              value={formData.insulin}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.insulin ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 0"
              min="0"
              step="0.1"
            />
            {errors.insulin && (
              <p className="text-red-500 text-xs mt-1">{errors.insulin}</p>
            )}
          </div>

          <div>
            <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 mb-1">
              BMI (kg/m²)
            </label>
            <input
              type="number"
              id="bmi"
              name="bmi"
              value={formData.bmi}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bmi ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 33.6"
              min="0"
              step="0.1"
            />
            {errors.bmi && (
              <p className="text-red-500 text-xs mt-1">{errors.bmi}</p>
            )}
          </div>

          <div>
            <label htmlFor="diabetesPedigree" className="block text-sm font-medium text-gray-700 mb-1">
              Diabetes Pedigree Function
            </label>
            <input
              type="number"
              id="diabetesPedigree"
              name="diabetesPedigree"
              value={formData.diabetesPedigree}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.diabetesPedigree ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 0.627"
              min="0"
              step="0.001"
            />
            {errors.diabetesPedigree && (
              <p className="text-red-500 text-xs mt-1">{errors.diabetesPedigree}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 50"
              min="0"
              step="1"
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Predicting Risk...
            </div>
          ) : (
            'Predict Diabetes Risk'
          )}
        </button>
    </form>
    </div>
  );
}
