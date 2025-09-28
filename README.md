# HealthIQ - AI-Powered Diabetes Risk Assessment

A full-stack web application that predicts diabetes risk using machine learning. Built with React, TypeScript, FastAPI, and scikit-learn.

## 🚀 Features

- **AI-Powered Risk Assessment**: Machine learning model trained on Pima Indians Diabetes Dataset
- **Real-time Predictions**: Instant diabetes risk analysis based on 8 health indicators
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS
- **Input Validation**: Comprehensive client-side and server-side validation
- **Error Handling**: Robust error handling with user-friendly messages
- **Risk Categorization**: Color-coded risk levels with personalized recommendations

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **React 19** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **Axios** for API communication
- Form validation and error handling

### Backend (Python + FastAPI)
- **FastAPI** for high-performance API
- **scikit-learn** with Logistic Regression for ML predictions
- **Pydantic** for data validation
- **joblib** for model serialization
- CORS middleware for cross-origin requests

## 📊 Health Indicators

The model analyzes these 8 key health indicators:

1. **Pregnancies** - Number of pregnancies
2. **Glucose Level** - Blood glucose concentration (mg/dL)
3. **Blood Pressure** - Diastolic blood pressure (mmHg)
4. **Skin Thickness** - Triceps skin fold thickness (mm)
5. **Insulin Level** - 2-hour serum insulin (μU/mL)
6. **BMI** - Body mass index (kg/m²)
7. **Diabetes Pedigree Function** - Family history of diabetes
8. **Age** - Age in years

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Train the model (if needed):
```bash
python train_pima.py
```

5. Start the FastAPI server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Check API health status

### Predictions
- **POST** `/predict` - Get diabetes risk prediction

#### Request Body:
```json
{
  "pregnancies": 2,
  "glucose": 148,
  "bloodPressure": 72,
  "skinThickness": 35,
  "insulin": 0,
  "bmi": 33.6,
  "diabetesPedigree": 0.627,
  "age": 50
}
```

#### Response:
```json
{
  "risk": 0.75,
  "modelVersion": "1.0.0",
  "ts": "2024-01-15T10:30:00Z"
}
```

## 🎯 Risk Categories

- **Low Risk** (< 30%): Continue healthy lifestyle
- **Moderate Risk** (30-60%): Consider healthcare consultation
- **High Risk** (60-80%): Schedule medical consultation
- **Very High Risk** (> 80%): Seek immediate medical attention

## 🔧 Development

### Project Structure
```
HealthIQ/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── routes/              # API endpoints
│   │   ├── schemas/             # Pydantic models
│   │   ├── services/            # Business logic
│   │   └── model/               # ML model files
│   ├── train_pima.py           # Model training
│   ├── pima_diabetes.csv       # Training dataset
│   └── requirements.txt        # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/          # React components
    │   ├── api/                 # API client
    │   └── App.tsx              # Main app
    ├── package.json            # Node dependencies
    └── tailwind.config.js      # Tailwind config
```

### Environment Variables

Create `.env` files in both frontend and backend directories:

**frontend/.env:**
```
VITE_API_BASE=http://localhost:8000
```

**backend/.env:**
```
MODEL_DIR=app/model
MODEL_VERSION=1.0.0
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the Docker image:
```bash
docker build -t healthiq-api ./backend
```

2. Run the container:
```bash
docker run -p 8000:8000 healthiq-api
```

### Frontend Deployment
1. Build for production:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to your hosting service

## 📈 Model Performance

The Logistic Regression model achieves:
- **AUC Score**: ~0.85
- **Accuracy**: ~80%
- **Dataset**: Pima Indians Diabetes Dataset (768 samples)

## ⚠️ Disclaimer

This application is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for better health outcomes**