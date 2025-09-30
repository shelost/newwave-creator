import React, { useEffect, useRef, useState } from 'react';
import styles from './CreatorLandingPage.module.css';
import BlobBackground from './BlobBackground';

const CreatorLandingPage: React.FC = () => {
  // Parallax speed factors - adjust these to control the strength (higher = faster scroll)
  const LETTER_CONTENT_SPEED = 1.1 // 15% faster than normal scroll
  const WORKFLOW_IMAGE_SPEED = 1.1; // 20% faster than normal scroll

  // Refs for parallax elements
  const letterContentRef = useRef<HTMLDivElement>(null);
  const workflowImageRef = useRef<HTMLImageElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    // Handle window resize to enable/disable parallax dynamically
    const handleResize = () => {
      const desktop = window.innerWidth > 768;
      setIsDesktop(desktop);
      
      // Reset transforms when switching to mobile
      if (!desktop) {
        if (letterContentRef.current) {
          letterContentRef.current.style.transform = 'none';
        }
        if (workflowImageRef.current) {
          workflowImageRef.current.style.transform = 'none';
        }
      }
    };

    const handleScroll = () => {
      // Only apply parallax on desktop
      if (!isDesktop) return;

      const scrollPosition = window.pageYOffset;

      // Apply parallax effect to letterContent
      if (letterContentRef.current) {
        const elementTop = letterContentRef.current.getBoundingClientRect().top + scrollPosition;
        const elementScroll = scrollPosition - elementTop + window.innerHeight;
        
        if (elementScroll > 0) {
          const offset = elementScroll * (LETTER_CONTENT_SPEED - 1);
          letterContentRef.current.style.transform = `translateY(-${offset}px)`;
        }
      }

      // Apply parallax effect to workflowVisualImage
      if (workflowImageRef.current) {
        const elementTop = workflowImageRef.current.getBoundingClientRect().top + scrollPosition;
        const elementScroll = scrollPosition - elementTop + window.innerHeight;
        
        if (elementScroll > 0) {
          const offset = elementScroll * (WORKFLOW_IMAGE_SPEED - 1);
          workflowImageRef.current.style.transform = `translateY(-${offset}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDesktop]);

  return (
    <div className={styles.landingPage}>
      <BlobBackground />
      {/* Hero Section */}
      <section className={styles.heroSection}>


          <div className={styles.heroContent}>

            <img src="/newwave-text.png" alt="NewWave" className={styles.heroLogo} />
            <h1 className={styles.heroTitle}>
              Be the first to try it. <br />
              Show it. Get paid.
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
            <div className={styles.workflowStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Select Your Platform</h3>
                <p>Choose TikTok, Instagram, or YouTube and add your handle to instantly build your profile with scraped data.</p>
              </div>
            </div>
            
            <div className={styles.workflowStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Discover Campaigns for You</h3>
                <p>Apply to campaigns tailored to your profile through our AI matching algorithm.</p>
              </div>
            </div>
            
            <div className={styles.workflowStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Apply & Collaborate</h3>
                <p>Apply directly to the campaigns that fit best and start collaborating with brands.</p>
              </div>
            </div>
            
            <div className={styles.workflowStep}>
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
