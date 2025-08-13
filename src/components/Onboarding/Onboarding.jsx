import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingQuestions, industryTags, currencies } from '../../mockData';
import './Onboarding.css';

/**
 * A multi-step onboarding questionnaire for buyers and sellers.
 */
const OnboardingWizard = () => {
  const [userType, setUserType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const navigate = useNavigate();

  const questions = userType === 'buyer' ? onboardingQuestions.buyer : onboardingQuestions.seller;

  const validateAnswer = (question, value) => {
    // Always check for required fields first
    if (!value && question.required) {
      return 'This field is required';
    }

    if (value) {
      switch (question.type) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
          }
          break;

        case 'text':
          if (typeof value !== 'string') {
            return 'Please enter valid text';
          }
          if (value.length < question.minLength) {
            return `Minimum ${question.minLength} characters required`;
          }
          if (value.length > question.maxLength) {
            return `Maximum ${question.maxLength} characters allowed`;
          }
          break;

        case 'textarea':
          if (typeof value !== 'string') {
            return 'Please enter valid text';
          }
          if (value.length < question.minLength) {
            return `Please enter at least ${question.minLength} characters`;
          }
          if (value.length > question.maxLength) {
            return `Response cannot exceed ${question.maxLength} characters`;
          }
          break;

        case 'currency':
          const numValue = parseFloat(value);
          if (isNaN(numValue) || numValue < question.min) {
            return `Amount must be at least $${question.min.toLocaleString()}`;
          }
          if (numValue > question.max) {
            return `Amount cannot exceed $${question.max.toLocaleString()}`;
          }
          break;

        case 'tags':
          const tags = Array.isArray(value) ? value : [];
          if (tags.length < question.minTags) {
            return `Please select at least ${question.minTags} ${question.minTags === 1 ? 'option' : 'options'}`;
          }
          if (tags.length > question.maxTags) {
            return `Cannot select more than ${question.maxTags} options`;
          }
          break;

        case 'choice':
          if (!question.options.includes(value)) {
            return 'Please select a valid option';
          }
          break;

        case 'slider':
          const sliderValue = parseFloat(value);
          if (isNaN(sliderValue) || sliderValue < question.min || sliderValue > question.max) {
            return `Please select a value between ${question.min.toLocaleString()} and ${question.max.toLocaleString()}`;
          }
          break;
      }
    }
    
    return '';
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    const currentQuestion = questions[currentStep];
    const error = validateAnswer(currentQuestion, value);
    setErrors(prev => ({ ...prev, [questionId]: error }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];
    const error = validateAnswer(currentQuestion, currentAnswer);

    if (error) {
      setErrors(prev => ({ ...prev, [currentQuestion.id]: error }));
      return;
    }

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

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Update renderInput to handle investment-range type
  const renderInput = (question) => {
    const value = answers[question.id] || '';
    const error = errors[question.id];

    switch (question.type) {
      case 'textarea':
        return (
          <div className="input-wrapper">
            <textarea
              id={question.id}
              rows="4"
              className="input-field"
              value={value}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      case 'currency':
        return (
          <div className="input-wrapper currency-input">
            <div className="currency-selector">
              {currencies.map(currency => (
                <button
                  key={currency.code}
                  className={`currency-button ${selectedCurrency === currency.code ? 'selected' : ''}`}
                  onClick={() => setSelectedCurrency(currency.code)}
                >
                  {currency.code}
                </button>
              ))}
            </div>
            <div className="amount-input">
              <span className="currency-symbol">
                {selectedCurrency === 'USD' ? '$' : '₹'}
              </span>
              <input
                type="number"
                id={question.id}
                className="input-field"
                value={value}
                min={question.min[selectedCurrency]}
                max={question.max[selectedCurrency]}
                step={question.step[selectedCurrency]}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="range-hints">
              <span>Min: {formatCurrency(question.min[selectedCurrency], selectedCurrency)}</span>
              <span>Max: {formatCurrency(question.max[selectedCurrency], selectedCurrency)}</span>
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      case 'tags':
        const selectedTags = Array.isArray(answers[question.id]) ? answers[question.id] : [];
        return (
          <div className="input-wrapper">
            <div className="tags-container">
              {industryTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => {
                    const newTags = selectedTags.includes(tag)
                      ? selectedTags.filter(t => t !== tag)
                      : [...selectedTags, tag];
                    handleAnswerChange(question.id, newTags);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      case 'investment-range':
        return (
          <div className="input-wrapper investment-range">
            <div className="currency-selector">
              {currencies.map(currency => (
                <button
                  key={currency.code}
                  className={`currency-button ${selectedCurrency === currency.code ? 'selected' : ''}`}
                  onClick={() => setSelectedCurrency(currency.code)}
                >
                  {currency.code}
                </button>
              ))}
            </div>
            <div className="range-input">
              <input
                type="range"
                id={question.id}
                min={question.min[selectedCurrency]}
                max={question.max[selectedCurrency]}
                step={question.step[selectedCurrency]}
                value={value || question.min[selectedCurrency]}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="slider"
              />
              <div className="range-labels">
                <span>{formatCurrency(question.min[selectedCurrency], selectedCurrency)}</span>
                <span>{formatCurrency(value || question.min[selectedCurrency], selectedCurrency)}</span>
                <span>{formatCurrency(question.max[selectedCurrency], selectedCurrency)}</span>
              </div>
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      case 'involvement':
        const involvementOptions = [
          {
            id: 'active',
            title: 'Active Operator',
            description: 'Full-time involvement in day-to-day operations, strategic planning, and business development.'
          },
          {
            id: 'strategic',
            title: 'Strategic Advisor',
            description: 'Part-time involvement focusing on high-level strategy, quarterly reviews, and major decisions.'
          },
          {
            id: 'passive',
            title: 'Passive Investor',
            description: 'Limited involvement with periodic updates and annual meetings, delegating operations to existing management.'
          }
        ];

        return (
          <div className="input-wrapper">
            <div className="involvement-options">
              {involvementOptions.map((option) => (
                <label 
                  key={option.id}
                  className={`involvement-option ${value === option.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={value === option.id}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                  <div className="involvement-title">{option.title}</div>
                  <div className="involvement-description">{option.description}</div>
                </label>
              ))}
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      default:
        return (
          <div className="input-wrapper">
            <input
              type={question.type}
              id={question.id}
              className="input-field"
              value={value}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
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
