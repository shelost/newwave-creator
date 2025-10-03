import React, { useEffect, useRef, useState } from 'react';
import styles from './CreatorLandingPage.module.css';
import BlobBackground from './BlobBackground';

const CreatorLandingPage: React.FC = () => {
  // Parallax speed factors - desktop values (reduced on mobile for performance)
  const LETTER_CONTENT_SPEED = 1.1; // 10% faster than normal scroll
  const WORKFLOW_IMAGE_SPEED = 1.1; // 10% faster than normal scroll
  
  // Mobile uses 50% of desktop intensity for better performance
  const MOBILE_SPEED_MULTIPLIER = 0.5;

  // Refs for parallax elements
  const letterContentRef = useRef<HTMLDivElement>(null);
  const workflowImageRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // IntersectionObserver refs to track visibility
  const letterObserverRef = useRef<IntersectionObserver | null>(null);
  const workflowObserverRef = useRef<IntersectionObserver | null>(null);
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const [isWorkflowVisible, setIsWorkflowVisible] = useState(false);

  // Workflow steps state and refs
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ width: 0, top: 0, height: 0 });

  // Campaign cards refs for 3D effects
  const leftCampaignRef = useRef<HTMLDivElement>(null);
  const rightCampaignRef = useRef<HTMLDivElement>(null);
  const [isCampaignsVisible, setIsCampaignsVisible] = useState(false);
  const campaignsObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Create IntersectionObservers to track element visibility
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    letterObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsLetterVisible(entry.isIntersecting);
      });
    }, observerOptions);

    workflowObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsWorkflowVisible(entry.isIntersecting);
      });
    }, observerOptions);

    campaignsObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsCampaignsVisible(entry.isIntersecting);
      });
    }, observerOptions);

    // Observe elements
    if (letterContentRef.current) {
      letterObserverRef.current.observe(letterContentRef.current);
    }
    if (workflowImageRef.current) {
      workflowObserverRef.current.observe(workflowImageRef.current);
    }
    if (leftCampaignRef.current) {
      campaignsObserverRef.current.observe(leftCampaignRef.current);
    }

    const applyParallax = () => {
      const scrollPosition = window.pageYOffset;
      
      // Mobile uses reduced parallax intensity for better performance
      const letterSpeed = isMobile 
        ? 1 + ((LETTER_CONTENT_SPEED - 1) * MOBILE_SPEED_MULTIPLIER)
        : LETTER_CONTENT_SPEED;
      const workflowSpeed = isMobile 
        ? 1 + ((WORKFLOW_IMAGE_SPEED - 1) * MOBILE_SPEED_MULTIPLIER)
        : WORKFLOW_IMAGE_SPEED;

      // Apply parallax effect to letterContent only if visible
      if (letterContentRef.current && isLetterVisible) {
        const elementTop = letterContentRef.current.getBoundingClientRect().top + scrollPosition;
        const elementScroll = scrollPosition - elementTop + window.innerHeight;
        
        if (elementScroll > 0) {
          const offset = elementScroll * (letterSpeed - 1);
          letterContentRef.current.style.transform = `translateY(-${offset}px)`;
        }
      }

      // Apply parallax effect to workflowVisualImage only if visible
      if (workflowImageRef.current && isWorkflowVisible) {
        const elementTop = workflowImageRef.current.getBoundingClientRect().top + scrollPosition;
        const elementScroll = scrollPosition - elementTop + window.innerHeight;
        
        if (elementScroll > 0) {
          const offset = elementScroll * (workflowSpeed - 1);
          workflowImageRef.current.style.transform = `translateY(-${offset}px)`;
        }
      }

      // Apply 3D rotation effects to campaign cards only if visible
      if (isCampaignsVisible && !isMobile) {
        // Left campaign card - rotates slightly right and skews as you scroll
        if (leftCampaignRef.current) {
          const rect = leftCampaignRef.current.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = (viewportCenter - cardCenter) / window.innerHeight;
          
          // Subtle rotation (max 8 degrees) and skew (max 3 degrees)
          const rotateY = Math.max(-24, Math.min(240, distance * 15));
          const skewX = Math.max(-3, Math.min(3, distance * 6));
          
          leftCampaignRef.current.style.transform = `perspective(600px) rotateY(${rotateY}deg) skewX(${skewX}deg)`;
        }

        // Right campaign card - rotates slightly left and skews as you scroll
        if (rightCampaignRef.current) {
          const rect = rightCampaignRef.current.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = (viewportCenter - cardCenter) / window.innerHeight;
          
          // Opposite direction for right card
          const rotateY = Math.max(-8, Math.min(8, distance * -15));
          const skewX = Math.max(-3, Math.min(3, distance * -6));
          
          rightCampaignRef.current.style.transform = `perspective(1000px) rotateY(${rotateY}deg) skewX(${skewX}deg)`;
        }
      } else if (isMobile) {
        // Reset transforms on mobile for better readability
        if (leftCampaignRef.current) {
          leftCampaignRef.current.style.transform = 'none';
        }
        if (rightCampaignRef.current) {
          rightCampaignRef.current.style.transform = 'none';
        }
      }
    };

    const handleScroll = () => {
      // Use requestAnimationFrame for smooth performance
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(applyParallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial call
    applyParallax();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (letterObserverRef.current) {
        letterObserverRef.current.disconnect();
      }
      if (workflowObserverRef.current) {
        workflowObserverRef.current.disconnect();
      }
      if (campaignsObserverRef.current) {
        campaignsObserverRef.current.disconnect();
      }
    };
  }, [isMobile, isLetterVisible, isWorkflowVisible, isCampaignsVisible]);

  // Update pill position when active step changes
  useEffect(() => {
    const updatePillPosition = () => {
      if (stepRefs.current[activeStep]) {
        const activeElement = stepRefs.current[activeStep];
        if (activeElement) {
          const rect = activeElement.getBoundingClientRect();
          const containerRect = activeElement.parentElement?.getBoundingClientRect();
          
          if (containerRect) {
            setPillStyle({
              width: rect.width,
              top: rect.top - containerRect.top,
              height: rect.height
            });
          }
        }
      }
    };

    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(updatePillPosition, 0);
    window.addEventListener('resize', updatePillPosition);

    return () => {
      window.removeEventListener('resize', updatePillPosition);
    };
  }, [activeStep]);

  // Handle step click
  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className={styles.landingPage}>
      <BlobBackground />
      {/* Hero Section */}
      <section className={styles.heroSection}>


          <div className={styles.heroContent}>

            <img src="/newwave-text.png" alt="NewWave" className={styles.heroLogo} />
            <h1 className={styles.heroTitle}>
              <span className={styles.gradientText}>Be the first to try it. <br />
              Show it.</span> <span className={styles.highlightText}> Get paid. </span>
            </h1>
            <p className={styles.heroSubtitle}>
              Tap into the newest, coolest startups and get paid for every collab.
            </p>
            <button className={styles.ctaButton}>Join the waitlist</button>
          </div>
          

      </section>

      {/* Value Prop Section */}
      <section className={styles.valuePropSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Small creators, big opportunities.</h2>

          <div className={styles.campaignsWrapper}>
            {/* Left Campaign Card */}
            <div ref={leftCampaignRef} className={styles.campaignCard}>
              <div className={styles.campaignHeader}>
                
                <img src="/pfp_lincoln.jpg" alt="Lincoln" className={styles.campaignPfp} />

                <div className={styles.campaignBrandWrapper}>
                  <div className={styles.campaignBrand}>Lincoln</div>
                  <div className={styles.campaignPayout}>92% Match</div>
                </div>
              </div>
              <h3 className={styles.campaignTitle}>AI Productivity App Launch</h3>
              <p className={styles.campaignDescription}>Looking for tech-savvy creators to showcase our new AI assistant</p>
              <div className={styles.campaignTags}>
                <span className={styles.campaignTag}>Tech</span>
                <span className={styles.campaignTag}>SaaS</span>
              </div>
            </div>

            {/* Center Phone Graphic */}
            <div ref={letterContentRef} className={styles.letterContent}>
                    <p className={styles.letterText}>
                        Getting brands to notice you is hard. 
                    </p>
                    <p className={styles.letterText}>
                        
                        That's why we flip the script. 
                    </p>
                    <p className={styles.letterText}>
                        Instead of you chasing deals, 
                    </p>
                    <p className={styles.letterText}>
                        Our AI brings the newest startups straight to your inbox. 
                    </p>
                    <p className={styles.letterText}>
                        Cool products. Real collabs. No waiting.
                    </p>
                    <p className={styles.letterText}>
                        Instead of you chasing deals, 
                    </p>
                    <p className={styles.letterText}>
                        Our AI brings the newest startups straight to your inbox. 
                    </p>
                    <p className={styles.letterText}>
                        Cool products. Real collabs. No waiting.
                    </p>

                    <img src="/newwave-text.png" alt="Letter" className={styles.letterImage} />
            </div>

            {/* Right Campaign Card */}
            <div ref={rightCampaignRef} className={styles.campaignCard}>
              <div className={styles.campaignHeader}>
                <img src="/pfp_victoria.jpg" alt="Victoria" className={styles.campaignPfp} />
                <div className={styles.campaignBrandWrapper}>
                  <div className={styles.campaignBrand}>Victoria </div>
                  <div className={styles.campaignPayout}>97% Match</div>
                </div>
              </div>
              <h3 className={styles.campaignTitle}>Wellness App Collab</h3>
              <p className={styles.campaignDescription}>Seeking fitness creators for authentic workout app reviews</p>
              <div className={styles.campaignTags}>
                <span className={styles.campaignTag}>Health</span>
                <span className={styles.campaignTag}>Lifestyle</span>
              </div>
            </div>
          </div>

          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureImagePlaceholder}>
                <div className={styles.browserMockup}>
                  <div className={styles.browserBar}></div>
                  <div className={styles.browserContent}></div>
                </div>
              </div>
              <h3>Personalized matching</h3>
              <p>Our AI analyzes your profile and connects you with brands that fit your vibe</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureImagePlaceholder}>
                <div className={styles.browserMockup}>
                  <div className={styles.browserBar}></div>
                  <div className={styles.browserContent}></div>
                </div>
              </div>
              <h3>One-click apply</h3>
              <p>See a campaign you like? Apply in seconds and start collaborating</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureImagePlaceholder}>
                <div className={styles.browserMockup}>
                  <div className={styles.browserBar}></div>
                  <div className={styles.browserContent}></div>
                </div>
              </div>
              <h3>Guaranteed payouts</h3>
              <p>No chasing invoices. Get paid securely once your content is approved</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureImagePlaceholder}>
                <div className={styles.browserMockup}>
                  <div className={styles.browserBar}></div>
                  <div className={styles.browserContent}></div>
                </div>
              </div>
              <h3>Workflow streamlining</h3>
              <p>Manage all your brand deals in one place, from pitch to payout</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>From profile to paycheck — here's what it looks like:</p>
          
          <div className={styles.workflowContainer}>
        
          <div className={styles.workflowSteps}>
            {/* Highlight pill that slides behind active step */}
            <div 
              className={styles.highlightPill}
              style={{
                width: `${pillStyle.width}px`,
                height: `${pillStyle.height}px`,
                transform: `translateY(${pillStyle.top}px)`
              }}
            />

            <div 
              ref={(el) => { stepRefs.current[0] = el; }}
              className={`${styles.workflowStep} ${activeStep === 0 ? styles.activeStep : ''}`}
              onClick={() => handleStepClick(0)}
            >
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Select Your Platform</h3>
                <p>Choose TikTok, Instagram, or YouTube and add your handle to instantly build your profile with scraped data.</p>
              </div>
            </div>
            
            <div 
              ref={(el) => { stepRefs.current[1] = el; }}
              className={`${styles.workflowStep} ${activeStep === 1 ? styles.activeStep : ''}`}
              onClick={() => handleStepClick(1)}
            >
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Discover Campaigns for You</h3>
                <p>Apply to campaigns tailored to your profile through our AI matching algorithm.</p>
              </div>
            </div>
            
            <div 
              ref={(el) => { stepRefs.current[2] = el; }}
              className={`${styles.workflowStep} ${activeStep === 2 ? styles.activeStep : ''}`}
              onClick={() => handleStepClick(2)}
            >
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Apply & Collaborate</h3>
                <p>Apply directly to the campaigns that fit best and start collaborating with brands.</p>
              </div>
            </div>
            
            <div 
              ref={(el) => { stepRefs.current[3] = el; }}
              className={`${styles.workflowStep} ${activeStep === 3 ? styles.activeStep : ''}`}
              onClick={() => handleStepClick(3)}
            >
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Submit & Get Paid</h3>
                <p>Upload your deliverables and get paid securely through escrow once content is approved.</p>
              </div>
            </div>
          </div>
          
          <div className={styles.workflowVisual}>
            <img ref={workflowImageRef} src="/macbook.png" alt="Workflow Visual" className={styles.workflowVisualImage} />
          </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCtaSection}>
        <div className={styles.container}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaSubtitle}>🌊</h2>
            <h2 className={styles.finalCtaTitle}>Ride the first wave of tech collabs.</h2>
            <p className={styles.finalCtaText}>
              Be the first creator to test and share tomorrow's SaaS products — with guaranteed payouts.
            </p>
            <button className={styles.ctaButton}>Join the waitlist</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2025 Newwave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreatorLandingPage;
