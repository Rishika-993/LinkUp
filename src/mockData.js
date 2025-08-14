// Add this constant for industry tags
export const industryTags = [
  'SaaS',
  'E-commerce',
  'FinTech',
  'Healthcare',
  'Education',
  'Real Estate',
  'Manufacturing',
  'Retail',
  'Logistics',
  'Marketing',
  'Consulting',
  'Technology',
  'Food & Beverage',
  'Entertainment',
  'Travel',
  'Automotive',
  'Energy',
  'Agriculture',
  'Construction',
  'Professional Services'
];

export const buyers = [
  {
    id: 1,
    name: 'Alex Chen',
    headline: 'Ex-FAANG product manager looking for a profitable SaaS business.',
    imageUrl: 'https://i.pravatar.cc/150?u=alexchen',
    isVerified: true,
    investmentRange: '$500k - $2M',
    industries: ['SAAS', 'E-COMMERCE', 'FINTECH'],
    bio: 'With over 10 years of experience scaling products at top tech companies, I am now seeking to acquire and operate a B2B SaaS company with strong product-market fit. My goal is to apply my growth expertise to take a solid business to the next level.',
    experience: [
      { role: 'Senior Product Manager', company: 'Google', years: '2018-2023' },
      { role: 'Product Manager', company: 'Amazon', years: '2015-2018' },
    ],
    investmentThesis: 'I look for businesses with recurring revenue models, low customer churn, and a clear path to profitability. I prefer to be an active operator, working closely with the existing team.',
  },
  {
    id: 2,
    name: 'Samantha Jones',
    headline: 'Private equity associate searching for a stable, cash-flowing business in the midWest.',
    imageUrl: 'https://i.pravatar.cc/150?u=samanthajones',
    isVerified: true,
    investmentRange: '$2M - $5M',
    industries: ['MANUFACTURING', 'LOGISTICS', 'HEALTHCARE SERVICES'],
    bio: 'As an associate at a mid-market private equity firm, I have extensive experience in financial modeling, due diligence, and deal execution. I am now looking to acquire my first business as an independent sponsor.',
    experience: [
      { role: 'Private Equity Associate', company: 'Oak Hill Capital', years: '2019-Present' },
      { role: 'Investment Banking Analyst', company: 'J.P. Morgan', years: '2017-2019' },
    ],
    investmentThesis: 'My focus is on established businesses with a history of stable cash flow and a strong management team. I am open to various levels of involvement post-acquisition, from strategic advisor to full-time CEO.',
  },
  {
    id: 3,
    name: 'Growth Capital Inc.',
    headline: 'Strategic acquirer looking to expand our portfolio of marketing agencies.',
    imageUrl: 'https://i.pravatar.cc/150?u=growthcapital',
    isVerified: false,
    investmentRange: '$1M - $10M',
    industries: ['DIGITAL MARKETING', 'ADVERTISING', 'CREATIVE SERVICES'],
    bio: 'Growth Capital is a holding company that acquires and grows digital marketing agencies. We provide capital, strategic guidance, and shared resources to help our portfolio companies thrive.',
    experience: [
      { role: 'Acquired 5 agencies in the last 3 years' },
      { role: 'Portfolio revenue grew by 40% year-over-year' },
    ],
    investmentThesis: 'We are looking for agencies with a strong brand, a talented team, and a unique service offering. We aim to preserve the culture of the companies we acquire while providing the resources to scale.',
  },
];
  
export const onboardingQuestions = {
  buyer: [
    { 
      id: 'q1', 
      type: 'text', 
      label: "What's your full name or your fund's name?",
      required: true,
      minLength: 4,
      maxLength: 50
    },
    { 
      id: 'q2', 
      type: 'textarea', 
      label: 'In one sentence, what is your professional background or investment focus?',
      required: true,
      minLength: 20,
      maxLength: 200
    },
    { 
      id: 'q3', 
      type: 'tags', 
      label: 'What industries are you most interested in?',
      required: true,
      minTags: 1,
      maxTags: 5
    },
    { 
      id: 'q4', 
      type: 'investment-range',
      label: 'What is your target investment range?',
      required: true,
      min: {
        USD: 50000,
        INR: 4000000  // 40 Lakhs INR
      },
      max: {
        USD: 10000000,
        INR: 800000000  // 80 Crore INR
      },
      step: {
        USD: 50000,
        INR: 4000000
      }
    },
    { 
      id: 'involvement',
      type: 'involvement',
      label: 'What is your ideal level of post-acquisition involvement?',
      required: true
    },
  ],
  seller: [
    { 
      id: 'q1', 
      type: 'text', 
      label: "What's the name of your business?",
      required: true,
      minLength: 2,
      maxLength: 100
    },
    { 
      id: 'q2', 
      type: 'tags', 
      label: 'Which industry categories best describe your business?',
      required: true,
      minTags: 1,
      maxTags: 3,
      options: industryTags  // Using the predefined industry tags array
    },
    { 
      id: 'q3', 
      type: 'textarea', 
      label: 'Briefly describe what your business does and its core offering',
      required: true,
      minLength: 50,
      maxLength: 300
    },
    { 
      id: 'q4', 
      type: 'investment-range', // Changed from 'currency' to 'investment-range'
      label: "What was your last full year's revenue?",
      required: true,
      min: {
        USD: 100000,
        INR: 8000000  // 80 Lakhs INR
      },
      max: {
        USD: 50000000,
        INR: 4000000000  // 40 Crore INR
      },
      step: {
        USD: 10000,
        INR: 800000
      }
    },
    { 
      id: 'q5', 
      type: 'investment-range', // Changed from 'currency' to 'investment-range'
      label: "What was your last full year's EBITDA?",
      required: true,
      min: {
        USD: 0,
        INR: 0
      },
      max: {
        USD: 20000000,
        INR: 1600000000  // 16 Crore INR
      },
      step: {
        USD: 5000,
        INR: 400000
      }
    },
    {
      id: 'q6',
      type: 'involvement',
      label: 'What is your preferred transition arrangement?',
      required: true,
      options: [
        {
          id: 'immediate',
          title: 'Immediate Exit',
          description: 'Complete handover after closing with minimal transition period'
        },
        {
          id: 'short_term',
          title: 'Short-term Transition',
          description: '3-6 months transition period to ensure smooth handover of operations'
        },
        {
          id: 'long_term',
          title: 'Long-term Involvement',
          description: 'Willing to stay involved for 1+ years in a reduced capacity'
        }
      ]
    },
    {
      id: 'q7',
      type: 'textarea',
      label: 'In a few sentences, why are you considering selling your business?',
      required: true,
      minLength: 50,
      maxLength: 500,
      placeholder: 'E.g., retirement, pursuing new ventures, seeking growth capital...'
    }
  ],
};

export const dealStages = [
  { id: 1, name: 'Initial Discussion', status: 'completed' },
  { id: 2, name: 'NDA Signed', status: 'completed' },
  { id: 3, name: 'Due Diligence', status: 'active' },
  { id: 4, name: 'Letter of Intent (LOI)', status: 'pending' },
  { id: 5, name: 'Closing', status: 'pending' },
];

export const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'INR', symbol: '₹' }
];

