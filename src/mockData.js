export const buyers = [
    {
      id: 1,
      name: 'Alex Chen',
      headline: 'Ex-FAANG product manager looking for a profitable SaaS business.',
      imageUrl: 'https://i.pravatar.cc/150?u=alexchen',
      isVerified: true,
      investmentRange: '$500k - $2M',
      industries: ['SaaS', 'E-commerce', 'FinTech'],
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
      headline: 'Private equity associate searching for a stable, cash-flowing business.',
      imageUrl: 'https://i.pravatar.cc/150?u=samanthajones',
      isVerified: true,
      investmentRange: '$2M - $5M',
      industries: ['Manufacturing', 'Logistics', 'Healthcare Services'],
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
      industries: ['Digital Marketing', 'Advertising', 'Creative Services'],
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
      { id: 'q1', type: 'text', label: "What's your full name or your fund's name?" },
      { id: 'q2', type: 'textarea', label: 'In one sentence, what is your professional background or investment focus? (This will be your profile headline)' },
      { id: 'q3', type: 'tags', label: 'What industries are you most interested in?' },
      { id: 'q4', type: 'slider', label: 'What is your target investment range?', min: 50000, max: 10000000, step: 50000 },
      { id: 'q5', type: 'choice', label: 'What is your ideal level of post-acquisition involvement?', options: ['Active Operator', 'Strategic Advisor', 'Passive Investor'] },
    ],
    seller: [
      { id: 'q1', type: 'text', label: "What's the name of your business?" },
      { id: 'q2', type: 'text', label: 'What industry is your business in?' },
      { id: 'q3', type: 'currency', label: "What was your last full year's revenue?" },
      { id: 'q4', type: 'currency', label: "What was your last full year's EBITDA?" },
      { id: 'q5', type: 'textarea', label: 'In a few sentences, why are you considering selling your business?' },
    ],
  };
  
  export const dealStages = [
    { id: 1, name: 'Initial Discussion', status: 'completed' },
    { id: 2, name: 'NDA Signed', status: 'completed' },
    { id: 3, name: 'Due Diligence', status: 'active' },
    { id: 4, name: 'Letter of Intent (LOI)', status: 'pending' },
    { id: 5, name: 'Closing', status: 'pending' },
  ];
  
  