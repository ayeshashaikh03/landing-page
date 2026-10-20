import React from 'react';

const Pricing = () => {
  // Array of pricing data
  const pricingData = [
    {
      id: 1,
      title: 'Free Trial',
      price: '$0',
      period: '/ 30 days',
      description: 'Perfect for getting started',
      features: [
        '30-day full access',
        'Up to 5 team members',
        '1 project',
        'Basic support'
      ],
      buttonText: 'Start Free Trial',
      buttonClass: 'btn-outline',
      popular: false
    },
    {
      id: 2,
      title: 'Credits Plan',
      price: '₹1',
      period: '/ Credit',
      description: 'Pay as you go — 1 Credit = 1 Day Access for 1 Project',
      features: [
        'Flexible daily access',
        'No monthly commitment',
        'Unlimited team members',
        'Priority support'
      ],
      buttonText: 'Buy Credits',
      buttonClass: 'btn-primary',
      popular: true
    },
    {
      id: 3,
      title: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Unlimited projects',
        'Advanced security',
        'Dedicated account manager',
        '24/7 premium support'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'btn-outline',
      popular: false
    }
  ];

  // Handle button click
  const handlePricingClick = (title) => {
    if (title.includes('Free Trial')) {
      alert('🎁 Starting your 30-day free trial!\nNo credit card required.');
    } else if (title.includes('Credits')) {
      alert('💳 Redirecting to payment page...\n1 Credit = ₹1\n1 Credit = 1 day access for 1 project');
    } else if (title.includes('Enterprise')) {
      alert('🏢 Contact our sales team at:\nsales@projectx.com');
    }
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">
          Simple & <span>Transparent</span> Pricing
        </h2>
        <p className="section-subtitle">
          Choose the plan that fits your needs. Start with a 30-day free trial — no credit card required.
        </p>

        <div className="pricing-grid">
          {/* Loop through pricingData array and render each card */}
          {pricingData.map((plan) => (
            <div 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`} 
              key={plan.id}
            >
              {plan.popular && <span className="popular-badge">🔥 Most Popular</span>}
              <h3>{plan.title}</h3>
              <div className="price">
                {plan.price} <span>{plan.period}</span>
              </div>
              <p>{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i> {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="#" 
                className={`btn ${plan.buttonClass}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePricingClick(plan.title);
                }}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;