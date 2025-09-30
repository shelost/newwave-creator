import React from 'react';
import styles from './CreatorLandingPage.module.css';

const CreatorLandingPage: React.FC = () => {
  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Be the first to try it. <br />
              Show it. Get paid.
            </h1>
            <p className={styles.heroSubtitle}>
              Tap into the newest, coolest startups and get paid for every collab
            </p>
            <button className={styles.ctaButton}>Join the waitlist</button>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.mockupCard}>
              <div className={styles.mockupHeader}>
                <h3>The AI-powered Jira:</h3>
                <h2>from <span className={styles.highlight}>teams</span> to dreams</h2>
              </div>
              <div className={styles.mockupImage}>
                <div className={styles.placeholderImage}>
                  <div className={styles.teamIcons}>
                    <div className={styles.iconRow}>
                      <div className={styles.avatar}></div>
                      <div className={styles.avatar}></div>
                      <div className={styles.avatar}></div>
                      <div className={styles.avatar}></div>
                      <div className={styles.avatar}></div>
                    </div>
                    <p className={styles.teamText}>Work faster with your AI team.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className={styles.valuePropSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Small creators, big opportunities.</h2>
          <p className={styles.sectionSubtitle}>
            Getting brands to notice you is hard. That's why we flip the script, instead of you chasing deals,<br />
            our AI brings the newest startups straight to your inbox. Cool products. Real collabs. No waiting.
          </p>
          
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
          <h2 className={styles.sectionTitle}>How It Works (Creator Workflow)</h2>
          <p className={styles.sectionSubtitle}>From profile to paycheck — here's what it looks like:</p>
          
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
            <div className={styles.laptopMockup}>
              <div className={styles.laptopScreen}>
                <div className={styles.dashboardPreview}>
                  <div className={styles.sidebar}>
                    <div className={`${styles.sidebarItem} ${styles.active}`}></div>
                    <div className={styles.sidebarItem}></div>
                    <div className={styles.sidebarItem}></div>
                    <div className={styles.sidebarItem}></div>
                    <div className={styles.sidebarItem}></div>
                  </div>
                  <div className={styles.mainContent}>
                    <div className={styles.contentHeader}></div>
                    <div className={styles.contentCards}>
                      <div className={styles.card}></div>
                      <div className={styles.card}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.workflowCards}>
              <div className={styles.workflowCardGrid}>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardHeader}></div>
                  <div className={styles.miniCardContent}></div>
                </div>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardHeader}></div>
                  <div className={styles.miniCardContent}></div>
                </div>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardHeader}></div>
                  <div className={styles.miniCardContent}></div>
                </div>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardHeader}></div>
                  <div className={styles.miniCardContent}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCtaSection}>
        <div className={styles.container}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>🌊 Ride the first wave of tech collabs.</h2>
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
