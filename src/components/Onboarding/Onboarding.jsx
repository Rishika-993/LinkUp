import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingQuestions } from '../../mockData';
import './Onboarding.css';

/**
 * A multi-step onboarding questionnaire for buyers and sellers.
 */
const OnboardingWizard = () => {
  const [userType, setUserType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const questions = userType === 'buyer' ? onboardingQuestions.buyer : onboardingQuestions.seller;

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete, navigate to the dashboard
      console.log('Onboarding Answers:', answers);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!userType) {
    return (
      <div className="onboarding-container">
        <div className="onboarding-card type-selection">
          <h1>Welcome to Caprae</h1>
          <p>To get started, tell us who you are.</p>
          <div className="button-group">
            <button onClick={() => setUserType('buyer')} className="btn-primary">I am a Buyer</button>
            <button onClick={() => setUserType('seller')} className="btn-primary">I am a Seller</button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const renderInput = (question) => {
    const value = answers[question.id] || '';

    switch (question.type) {
      case 'textarea':
        return <textarea id={question.id} rows="4" className="input-field" value={value} onChange={(e) => handleAnswerChange(question.id, e.target.value)} />;
      case 'currency':
        return (
          <div className="currency-input">
            <span>$</span>
            <input
              type="number"
              id={question.id}
              className="input-field"
              value={value}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="0.00"
            />
          </div>
        );
      default:
        return <input type={question.type} id={question.id} className="input-field" value={value} onChange={(e) => handleAnswerChange(question.id, e.target.value)} />;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question-content">
          <label htmlFor={currentQuestion.id} className="question-label">{currentQuestion.label}</label>
          {renderInput(currentQuestion)}
        </div>
        <div className="navigation-buttons">
          {currentStep > 0 && <button onClick={handleBack} className="btn-secondary">Back</button>}
          <button onClick={handleNext} className="btn-primary">{currentStep === questions.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
