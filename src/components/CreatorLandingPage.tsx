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

  // Workflow steps state and refs (updated to 3 steps)
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ width: 0, top: 0, height: 0 });

  // Campaign cards refs for 3D effects (updated to 3 cards)
  const leftCampaignRef = useRef<HTMLDivElement>(null);
  const centerCampaignRef = useRef<HTMLDivElement>(null);
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

        // Center campaign card - rotates slightly left
        if (centerCampaignRef.current) {
          const rect = centerCampaignRef.current.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = (viewportCenter - cardCenter) / window.innerHeight;
          
          const rotateY = Math.max(-8, Math.min(8, distance * -12));
          const skewX = Math.max(-3, Math.min(3, distance * -5));
          
          centerCampaignRef.current.style.transform = `perspective(1000px) rotateY(${rotateY}deg) skewX(${skewX}deg)`;
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
        if (centerCampaignRef.current) {
          centerCampaignRef.current.style.transform = 'none';
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
            {/* Left Campaign Card - NoteMate */}
            <div ref={leftCampaignRef} className={styles.campaignCard}>
              <div className={styles.campaignHeader}>
                <div className={styles.campaignLogoPlaceholder}>
                  <img src="/notemate.png" alt="NoteMate" className={styles.campaignLogoImage} />
                </div>
                <div className={styles.campaignBrandWrapper}>
                  <div className={styles.campaignBrandName}>NoteMate</div>
                </div>
              </div>
              <p className={styles.campaignDescription}>Looking for student creators who love "study-with-me" content</p>
              <div className={styles.campaignTags}>
                <span className={styles.campaignTag}>EdTech</span>
                <span className={styles.campaignTag}>Productivity</span>
              </div>
            </div>

            {/* Center iPad-Style Screen with Chat Interface */}
            <div ref={letterContentRef} className={styles.ipadScreen}>
              <div className={styles.ipadBezel}>
                <div className={styles.chatInterface}>
                  {/* Chat Header */}
                  <div className={styles.chatHeader}>
                    <img src="/newwave-text.png" alt="NewWave" className={styles.chatLogo} />
                  </div>
                  
                  {/* Chat Messages */}
                  <div className={styles.chatMessages}>
                    {/* Brand Message 1 (Left) */}
                    <div className={styles.messageLeft}>
                      <div className={styles.messageBubbleLeft}>
                        <p>Hey! We're launching an AI study co-pilot called <strong>NoteMate</strong>. Would love to invite you to join our creator campaign with payout!</p>
                        <button className={styles.campaignDetailsButton}>View Campaign Details</button>
                      </div>
                    </div>

                    {/* Creator Reply (Right) */}
                    <div className={styles.messageRight}>
                      <div className={styles.messageBubbleRight}>
                        <p>This looks super cool — I'd love to join!</p>
                      </div>
                    </div>

                    {/* Brand Follow-up (Left) */}
                    <div className={styles.messageLeft}>
                      <div className={styles.messageBubbleLeft}>
                        <p>Amazing! Here's your creator link to get started!</p>
                      </div>
                    </div>
                  </div>

                  {/* iMessage-style Input Bar */}
                  <div className={styles.chatInputBar}>
                    <div className={styles.inputWrapper}>
                      <div className={styles.cameraIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15V9c0-1.1-.9-2-2-2h-1.6L16 5.6C15.6 5.2 15.1 5 14.6 5H9.4c-.5 0-1 .2-1.4.6L6.6 7H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2" stroke="#2457BA" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="12" cy="13" r="3" stroke="#2457BA" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className={styles.inputField}>
                        <span className={styles.inputPlaceholder}>iMessage</span>
                      </div>
                      <div className={styles.sendButton}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                          <path d="M2 10L18 2L12 18L10 11L2 10Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Top Campaign Card - FitSync */}
            <div ref={centerCampaignRef} className={`${styles.campaignCard} ${styles.campaignCardRight}`}>
              <div className={styles.campaignHeader}>
                <div className={styles.campaignLogoPlaceholder}>
                  <img src="/fitsync.png" alt="FitSync" className={styles.campaignLogoImage} />
                </div>
                <div className={styles.campaignBrandWrapper}>
                  <div className={styles.campaignBrandName}>FitSync</div>
                </div>
              </div>
              <p className={styles.campaignDescription}>Looking for lifestyle creators to film their 7-day progress</p>
              <div className={styles.campaignTags}>
                <span className={styles.campaignTag}>Health</span>
                <span className={styles.campaignTag}>Lifestyle</span>
              </div>
            </div>

            {/* Right Bottom Campaign Card - ClipKit */}
            <div ref={rightCampaignRef} className={`${styles.campaignCard} ${styles.campaignCardRight}`}>
              <div className={styles.campaignHeader}>
                <div className={styles.campaignLogoPlaceholder}>
                  <img src="/clipkit.png" alt="ClipKit" className={styles.campaignLogoImage} />
                </div>
                <div className={styles.campaignBrandWrapper}>
                  <div className={styles.campaignBrandName}>ClipKit</div>
                </div>
              </div>
              <p className={styles.campaignDescription}>Recruiting creators who love editing TikToks & Reels</p>
              <div className={styles.campaignTags}>
                <span className={styles.campaignTag}>Creator Tools</span>
                <span className={styles.campaignTag}>Video</span>
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
                <h3>Build Your Profile with One Click</h3>
                <p>Connect your TikTok, Instagram, or YouTube — we'll instantly build your creator profile with data pulled from your content and engagement.</p>
              </div>
            </div>
            
            <div 
              ref={(el) => { stepRefs.current[1] = el; }}
              className={`${styles.workflowStep} ${activeStep === 1 ? styles.activeStep : ''}`}
              onClick={() => handleStepClick(1)}
            >
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Apply & Collaborate</h3>
                <p>Browse campaigns that match your niche and apply directly to brands you actually like.</p>
              </div>
            </div>
            
            <div 
              ref={(el) => { stepRefs.current[2] = el; }}
              className={`${styles.workflowStep} ${activeStep === 2 ? styles.activeStep : ''}`}
              onClick={() => handleStepClick(2)}
            >
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Submit & Get Paid</h3>
                <p>Deliver your content and get paid securely once the brand approves your post.</p>
              </div>
            </div>
          </div>
          
          <div className={styles.workflowVisual}>
            {/* Modular Visual Cards Based on Active Step */}
            {activeStep === 0 && (
              <div className={styles.workflowCard}>
                <div className={styles.workflowCardHeader}>
                  <div className={styles.workflowCardIcon}>🔗</div>
                  <h4>Connect Your Platform</h4>
                </div>
                <div className={styles.workflowCardContent}>
                  {/* Platform Selection */}
                  <div className={styles.profileFormSection}>
                    <label className={styles.formLabel}>Platform(s) *</label>
                    <p className={styles.formHelp}>Select all platforms where you create content</p>
                    <div className={styles.platformSelectionGrid}>
                      <div className={`${styles.platformSelectCard} ${styles.selected}`}>
                        <img src="/tiktok.svg" alt="TikTok" className={styles.platformSelectIcon} />
                        <span>TikTok</span>
                      </div>
                      <div className={styles.platformSelectCard}>
                        <img src="/instagram.svg" alt="Instagram" className={styles.platformSelectIcon} />
                        <span>Instagram</span>
                      </div>
                      <div className={styles.platformSelectCard}>
                        <img src="/youtube.svg" alt="YouTube" className={styles.platformSelectIcon} />
                        <span>YouTube</span>
                      </div>
                    </div>
                  </div>

                  {/* Platform Details Form */}
                  <div className={styles.profileFormSection}>
                    <label className={styles.formLabel}>Handle or URL</label>
                    <div className={styles.handleInputGroup}>
                      <span className={styles.handlePrefix}>tiktok.com/@</span>
                      <input 
                        type="text" 
                        className={styles.handleInput} 
                        placeholder="lincolnlittlelife"
                        value="lincolnlittlelife"
                        readOnly
                      />
                      <button className={styles.autofillButton}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 018 3zm-.5 2h1v3.5h3v1h-3.5V5z"/>
                        </svg>
                        Autofill
                      </button>
                    </div>
                  </div>

                  {/* Scraped Data Display */}
                  <div className={styles.scrapedDataGrid}>
                    <div className={styles.dataField}>
                      <label className={styles.dataLabel}>Followers</label>
                      <div className={styles.dataValue}>96</div>
                      <div className={styles.dataSource}>✓ Updated from scraping: 96</div>
                    </div>
                    <div className={styles.dataField}>
                      <label className={styles.dataLabel}>Engagement Rate (%)</label>
                      <div className={styles.dataValue}>216.54</div>
                      <div className={styles.dataSource}>✓ Updated from scraping: 216.54</div>
                    </div>
                    <div className={styles.dataField}>
                      <label className={styles.dataLabel}>Average Views</label>
                      <div className={styles.dataValue}>3742</div>
                      <div className={styles.dataSource}>✓ Updated from scraping: 3742</div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className={styles.profileFormSection}>
                    <label className={styles.formLabel}>Languages</label>
                    <div className={styles.languageChips}>
                      <span className={styles.languageChip}>English</span>
                      <span className={styles.languageChip}>Chinese</span>
                      <span className={styles.languageChip}>Spanish</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className={styles.workflowCard}>
                <div className={styles.workflowCardHeader}>
                  <div className={styles.workflowCardIcon}>🎯</div>
                  <h4>Browse & Apply to Campaigns</h4>
                </div>
                <div className={styles.workflowCardContent}>
                  <div className={styles.campaignBrowseGrid}>
                    <div className={styles.browseCampaignCard}>
                      <img src="/notemate.png" alt="NoteMate" className={styles.browseLogo} />
                      <div className={styles.browseInfo}>
                        <strong>NoteMate</strong>
                        <span className={styles.browseFollowers}>160k+</span>
                        <div className={styles.browseTags}>
                          <span>EdTech</span>
                          <span>Productivity</span>
                        </div>
                      </div>
                      <button className={styles.browseApplyBtn}>Apply</button>
                    </div>
            
                    
                    <div className={styles.browseCampaignCard}>
                      <img src="/clipkit.png" alt="ClipKit" className={styles.browseLogo} />
                      <div className={styles.browseInfo}>
                        <strong>ClipKit</strong>
                        <span className={styles.browseFollowers}>135k+</span>
                        <div className={styles.browseTags}>
                          <span>Video</span>
                          <span>Creator Tools</span>
                        </div>
                      </div>
                      <button className={styles.browseApplyBtn}>Apply</button>
                    </div>

                    <div className={styles.browseCampaignCard}>
                      <img src="/talkai.png" alt="TalkAI" className={styles.browseLogo} />
                      <div className={styles.browseInfo}>
                        <strong>TalkAI</strong>
                        <span className={styles.browseFollowers}>180k+</span>
                        <div className={styles.browseTags}>
                          <span>AI</span>
                          <span>Communication</span>
                        </div>
                      </div>
                      <button className={styles.browseApplyBtn}>Apply</button>
                    </div>

                    <div className={styles.browseCampaignCard}>
                      <img src="/echofeed.png" alt="EchoFeed" className={styles.browseLogo} />
                      <div className={styles.browseInfo}>
                        <strong>EchoFeed</strong>
                        <span className={styles.browseFollowers}>150k+</span>
                        <div className={styles.browseTags}>
                          <span>Social</span>
                          <span>Content</span>
                        </div>
                      </div>
                      <button className={styles.browseApplyBtn}>Apply</button>
                    </div>

                    <div className={styles.browseCampaignCard}>
                      <img src="/mindlyze.png" alt="MindLyze" className={styles.browseLogo} />
                      <div className={styles.browseInfo}>
                        <strong>MindLyze</strong>
                        <span className={styles.browseFollowers}>165k+</span>
                        <div className={styles.browseTags}>
                          <span>Analytics</span>
                          <span>AI</span>
                        </div>
                      </div>
                      <button className={styles.browseApplyBtn}>Apply</button>
                    </div>

                    <div className={styles.browseCampaignCard}>
                      <img src="/talk.png" alt="Talk" className={styles.browseLogo} />
                      <div className={styles.browseInfo}>
                        <strong>Talk</strong>
                        <span className={styles.browseFollowers}>200k+</span>
                        <div className={styles.browseTags}>
                          <span>Social</span>
                          <span>Messaging</span>
                        </div>
                      </div>
                      <button className={styles.browseApplyBtn}>Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className={styles.workflowCard}>
                <div className={styles.workflowCardHeader}>
                  <div className={styles.workflowCardIcon}>💰</div>
                  <h4>Get Paid Securely</h4>
                </div>
                <div className={styles.workflowCardContent}>
                  <div className={styles.paymentFlow}>
                    <div className={styles.paymentStep}>
                      <div className={styles.paymentIcon}>📤</div>
                      <span>Submit Content</span>
                    </div>
                    <div className={styles.paymentArrow}>→</div>
                    <div className={styles.paymentStep}>
                      <div className={styles.paymentIcon}>✅</div>
                      <span>Brand Approves</span>
                    </div>
                    <div className={styles.paymentArrow}>→</div>
                    <div className={styles.paymentStep}>
                      <div className={styles.paymentIcon}>💵</div>
                      <span>Instant Payout</span>
                    </div>
                  </div>
                  <div className={styles.paymentAmount}>
                    <div className={styles.amountBox}>
                      <span className={styles.amountLabel}>Payment received</span>
                      <span className={styles.amountValue}>$5,000</span>
                      <span className={styles.amountStatus}>✓ Instant payments</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
