# HealthIQ - AI-Powered Diabetes Risk Assessment

A full-stack web application that predicts diabetes risk using machine learning. Built with React, TypeScript, FastAPI, and scikit-learn.

## 🚀 Features

- **AI-Powered Risk Assessment**: Machine learning model trained on **BRFSS 2015 Dataset**
- **Real-time Predictions**: Instant diabetes risk analysis based on 21 health indicators
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS
- **Input Validation**: Comprehensive client-side and server-side validation
- **Error Handling**: Robust error handling with user-friendly messages
- **Risk Categorization**: Color-coded risk levels with personalized recommendations
- **Dockerized**: Easy deployment with Docker and Docker Compose

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

The model analyzes **21 key health indicators** from the BRFSS 2015 dataset, including:

1. **HighBP** - High Blood Pressure
2. **HighChol** - High Cholesterol
3. **BMI** - Body Mass Index
4. **Smoker** - Smoking history
5. **Stroke** - History of stroke
6. **HeartDiseaseorAttack** - History of heart disease/attack
7. **PhysActivity** - Physical activity in past 30 days
8. **Fruits** - Consumes fruit 1+ times per day
9. **Veggies** - Consumes vegetables 1+ times per day
10. **HvyAlcoholConsump** - Heavy alcohol consumption
11. **GenHlth** - General health (1-5 scale)
12. **MentHlth** - Days of poor mental health (0-30)
13. **PhysHlth** - Days of poor physical health (0-30)
14. **DiffWalk** - Serious difficulty walking or climbing stairs
15. **Sex** - Sex (0=Female, 1=Male)
16. **Age** - Age category (1-13)
17. **Education** - Education level (1-6)
18. **Income** - Income level (1-8)
...and more.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose (Recommended)
OR
- Node.js 18+ and npm
- Python 3.9+

### 🐳 Docker Setup (Recommended)

1. Build and start the services:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

### Manual Setup

#### Backend Setup

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
python train_brfss.py
```

5. Start the FastAPI server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

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

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Check API health status

### Predictions
- **POST** `/predict` - Get diabetes risk prediction

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
│   ├── train_brfss.py           # Model training
│   ├── Dockerfile               # Backend Docker config
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── api/                 # API client
│   │   └── App.tsx              # Main app
│   ├── Dockerfile               # Frontend Docker config
│   └── tailwind.config.js       # Tailwind config
├── docker-compose.yml           # Docker orchestration
└── README.md                    # Project documentation
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for better health outcomes**