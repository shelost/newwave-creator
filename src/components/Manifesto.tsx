import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Manifesto.module.css';

// Helper function to generate random offset
const getRandomOffset = (min = -40, max = 40) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ManifestoSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay 
      }}
      className={styles.section}
    >
      {children}
    </motion.div>
  );
};

const SideCard: React.FC<{ 
  side: 'left' | 'right'; 
  title: string; 
  image: string; 
  gradient: string;
  delay?: number;
}> = ({ side, title, image, gradient, delay = 0 }) => {
  const xOffset = useMemo(() => getRandomOffset(-50, 50), []);
  const rotateOffset = useMemo(() => getRandomOffset(-2, 2), []);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -200 : 200, scale: 0.8 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, margin: "0px 0px -200px 0px" }}
      transition={{ 
        duration: 1, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay 
      }}
      className={`${styles.sideCard} ${side === 'left' ? styles.sideCardLeft : styles.sideCardRight}`}
      style={{ 
        [side === 'left' ? 'left' : 'right']: `calc(${side === 'left' ? '-350px' : '-350px'} + ${xOffset}px)`,
        rotate: `${rotateOffset}deg`
      }}
    >
      <div className={styles.sideCardInner}>
        <div className={`${styles.sideCardGradient} ${gradient}`} />
        <img 
          src={image} 
          alt={title} 
          className={styles.sideCardImage}
        />
        <div className={styles.sideCardTitle}>{title}</div>
      </div>
    </motion.div>
  );
};

const FloatingBadge: React.FC<{ 
  text: string; 
  side: 'left' | 'right';
  color: string;
  delay?: number;
}> = ({ text, side, color, delay = 0 }) => {
  const xOffset = useMemo(() => getRandomOffset(-30, 30), []);
  const rotateOffset = useMemo(() => getRandomOffset(-5, 5), []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -10 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotateOffset }}
      viewport={{ once: false, margin: "0px 0px -150px 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay 
      }}
      className={`${styles.floatingBadge} ${side === 'left' ? styles.floatingBadgeLeft : styles.floatingBadgeRight}`}
      style={{ 
        backgroundColor: color,
        [side === 'left' ? 'left' : 'right']: `calc(${side === 'left' ? '-280px' : '-280px'} + ${xOffset}px)`
      }}
    >
      {text}
    </motion.div>
  );
};

const AnimatedIcon: React.FC<{ 
  emoji: string; 
  side: 'left' | 'right';
  delay?: number;
}> = ({ emoji, side, delay = 0 }) => {
  const xOffset = useMemo(() => getRandomOffset(-40, 40), []);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: false, margin: "0px 0px -150px 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.34, 1.56, 0.64, 1],
        delay: delay 
      }}
      className={`${styles.animatedIcon} ${side === 'left' ? styles.animatedIconLeft : styles.animatedIconRight}`}
      style={{
        [side === 'left' ? 'left' : 'right']: `calc(${side === 'left' ? '-300px' : '-300px'} + ${xOffset}px)`
      }}
    >
      {emoji}
    </motion.div>
  );
};

const ComparisonCard: React.FC<{ 
  label: string;
  emoji: string;
  side: 'left' | 'right';
  type: 'old' | 'new';
  delay?: number;
}> = ({ label, emoji, side, type, delay = 0 }) => {
  const xOffset = useMemo(() => getRandomOffset(-35, 35), []);
  const rotateOffset = useMemo(() => getRandomOffset(-3, 3), []);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -150 : 150 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "0px 0px -150px 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay 
      }}
      className={`${styles.comparisonCard} ${side === 'left' ? styles.comparisonCardLeft : styles.comparisonCardRight} ${type === 'old' ? styles.comparisonCardOld : styles.comparisonCardNew}`}
      style={{
        [side === 'left' ? 'left' : 'right']: `calc(${side === 'left' ? '-280px' : '-280px'} + ${xOffset}px)`,
        rotate: `${rotateOffset}deg`
      }}
    >
      <span className={styles.comparisonEmoji}>{emoji}</span>
      <span className={styles.comparisonCardLabel}>{label}</span>
    </motion.div>
  );
};

const Manifesto: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }}
          className={styles.heroContent}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4
            }}
          >
            <img src='/wave.png' alt='NewWave Logo' className={styles.heroLogo} />
          </motion.div>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.6
            }}
          >
            The Creator Manifesto
          </motion.h1>
        </motion.div>
      </section>

      {/* Manifesto Content */}
      <main className={styles.main}>
        {/* Opening Statement */}
        <ManifestoSection>
          <p className={styles.paragraph}>
            For too long, creators have been stuck in a broken system 🔗.
          </p>
        </ManifestoSection>

        <ManifestoSection>
          <p className={styles.paragraph}>
            Chasing brands that don't respond. Negotiating rates that don't reflect 
            your value. Waiting weeks—sometimes months—for payments that should be instant 💸.
          </p>
        </ManifestoSection>

        <ManifestoSection>
          <p className={styles.paragraph}>
            Meanwhile, the best opportunities—the startups building tomorrow's products—are 
            locked away, reserved for influencers with massive followings and agency connections.
          </p>
        </ManifestoSection>

        {/* The Problem - With Floating Badges */}
        <div className={styles.sectionWithCards}>
          <ManifestoSection>
            <p className={styles.sectionLabel}>The Problem</p>
          </ManifestoSection>

          <FloatingBadge text="500k+ Followers Required" side="left" color="#ff6b6b" delay={0.1} />
          <FloatingBadge text="Agency Access Only" side="right" color="#ff8787" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              The creator economy promised democratization. But the reality? 
              It's gatekept by follower counts, agency relationships, and opaque 
              processes that favor the already-famous.
            </p>
          </ManifestoSection>

          <FloatingBadge text="Net 60 Payments" side="right" color="#ff9999" delay={0.1} />
          <AnimatedIcon emoji="❌" side="left" delay={0.3} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              Small creators—the ones with authentic audiences and genuine passion—are 
              left out. Told they're "not big enough yet." Told to keep grinding, 
              keep posting for free, keep waiting for their break.
            </p>
          </ManifestoSection>

          <AnimatedIcon emoji="⏳" side="right" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              But here's what they don't tell you: the most valuable creators 
              aren't the ones with millions of followers. They're the ones with 
              real influence in their niche, authentic engagement, and audiences 
              that actually trust their recommendations.
            </p>
          </ManifestoSection>
        </div>

        {/* The Shift - With Icons */}
        <div className={styles.sectionWithCards}>
          <ManifestoSection>
            <p className={styles.sectionLabel}>The Shift</p>
          </ManifestoSection>

          <AnimatedIcon emoji="🚀" side="left" delay={0.1} />
          <AnimatedIcon emoji="💡" side="right" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              Tech startups don't need mega-influencers. They need creators who 
              understand their products, can authentically explain complex features, 
              and speak to the exact audience the startup is trying to reach.
            </p>
          </ManifestoSection>

          <AnimatedIcon emoji="🎯" side="left" delay={0.2} />
          <AnimatedIcon emoji="✨" side="right" delay={0.3} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              A creator with 5,000 engaged followers in the productivity niche is 
              worth more to a SaaS startup than a celebrity with 5 million followers 
              who've never used the product.
            </p>
          </ManifestoSection>
        </div>

        {/* Core Belief */}
        <ManifestoSection>
          <p className={styles.paragraphHighlight}>
            Small creators deserve big opportunities.
          </p>
        </ManifestoSection>

        {/* What We Believe - With Side Cards */}
        <div className={styles.sectionWithCards}>
          <ManifestoSection>
            <p className={styles.sectionLabel}>What We Believe</p>
          </ManifestoSection>

          <SideCard 
            side="left"
            title="NoteMate"
            image="/notemate.png"
            gradient={styles.gradientRed}
            delay={0.2}
          />

          <ManifestoSection>
            <p className={styles.paragraph}>
              We believe every creator deserves access to brand partnerships—not 
              just the top 1%. If you're creating content, building an audience, 
              and adding value, you should be able to monetize that work.
            </p>
          </ManifestoSection>

          <SideCard 
            side="right"
            title="ClipKit"
            image="/clipkit.png"
            gradient={styles.gradientOrange}
            delay={0.3}
          />

          <ManifestoSection>
            <p className={styles.paragraph}>
              We believe the best brand partnerships happen when creators genuinely 
              love the product. When you can try it first, use it in your workflow, 
              and share authentic experiences—not scripted sponsorships.
            </p>
          </ManifestoSection>

          <SideCard 
            side="left"
            title="FitSync"
            image="/fitsync.png"
            gradient={styles.gradientTeal}
            delay={0.2}
          />

          <ManifestoSection>
            <p className={styles.paragraph}>
              We believe creators should be paid instantly and fairly. No net-60 
              payment terms. No chasing invoices. No wondering if you'll ever see 
              the money you earned.
            </p>
          </ManifestoSection>

          <SideCard 
            side="right"
            title="TalkAI"
            image="/talkai.png"
            gradient={styles.gradientPurple}
            delay={0.3}
          />

          <ManifestoSection>
            <p className={styles.paragraph}>
              We believe in transparency. You should know exactly what you're earning, 
              what's expected of you, and what success looks like—before you commit 
              to any partnership.
            </p>
          </ManifestoSection>
        </div>

        {/* How We're Different - With Comparison Cards */}
        <div className={styles.sectionWithCards}>
          <ManifestoSection>
            <p className={styles.sectionLabel}>How We're Different</p>
          </ManifestoSection>

          <ComparisonCard label="Exclusive Access" emoji="🔒" side="left" type="old" delay={0.1} />
          <ComparisonCard label="Open Platform" emoji="🌊" side="right" type="new" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              Traditional influencer platforms require you to apply, audition, and prove 
              yourself worthy. We welcome every creator—from 100 followers to 100,000.
            </p>
          </ManifestoSection>

          <ComparisonCard label="Mass Market Brands" emoji="🏢" side="left" type="old" delay={0.1} />
          <ComparisonCard label="Tech Startups" emoji="⚡" side="right" type="new" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              Instead of pushing generic products, we connect you with innovative 
              tech companies building the tools your audience actually wants to discover.
            </p>
          </ManifestoSection>

          <ComparisonCard label="Net 60 Terms" emoji="📅" side="left" type="old" delay={0.1} />
          <ComparisonCard label="Instant Payouts" emoji="💰" side="right" type="new" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              We don't make you wait. Complete your collaboration, get approved, 
              and get paid—instantly. Your work has value, and you shouldn't have 
              to wait two months to see it.
            </p>
          </ManifestoSection>

          <ComparisonCard label="Cold Outreach" emoji="📧" side="left" type="old" delay={0.1} />
          <ComparisonCard label="Smart Matching" emoji="🎯" side="right" type="new" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              Stop sending cold DMs hoping for a response. Our AI matches you with 
              startups actively looking for creators in your niche, so every opportunity 
              is already a good fit.
            </p>
          </ManifestoSection>
        </div>

        {/* The Invitation */}
        <div className={styles.sectionWithCards}>
          <ManifestoSection>
            <p className={styles.sectionLabel}>This Is For You If...</p>
          </ManifestoSection>

          <AnimatedIcon emoji="🎬" side="left" delay={0.1} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              You're tired of creating content for free while watching mega-influencers 
              cash in on brand deals.
            </p>
          </ManifestoSection>

          <AnimatedIcon emoji="💪" side="right" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              You believe your audience—no matter the size—has real value and deserves 
              to be compensated for your work.
            </p>
          </ManifestoSection>

          <AnimatedIcon emoji="🚀" side="left" delay={0.1} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              You love discovering new tech products and want to be among the first 
              to share them with your audience.
            </p>
          </ManifestoSection>

          <AnimatedIcon emoji="🎯" side="right" delay={0.2} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              You want partnerships that feel authentic—working with brands you 
              actually believe in, not just whoever's paying.
            </p>
          </ManifestoSection>

          <AnimatedIcon emoji="⚡" side="left" delay={0.1} />

          <ManifestoSection>
            <p className={styles.paragraph}>
              You're ready to stop waiting for permission and start building a 
              real income from your content.
            </p>
          </ManifestoSection>
        </div>

        {/* Closing */}
        <ManifestoSection>
          <p className={styles.paragraphHighlight}>
            The next wave of creator partnerships starts here.
          </p>
        </ManifestoSection>

        <ManifestoSection>
          <p className={styles.paragraph}>
            Join creators who are getting paid to test, share, and promote the 
            most exciting tech products launching today. No gatekeepers. No waiting. 
            Just real opportunities and instant payouts.
          </p>
        </ManifestoSection>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.ctaSection}
        >
          <Link to="/" className={styles.ctaButton}>
            Join the Waitlist
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerNav}>
            <Link to="/" className={styles.footerLink}>Home</Link>
            <Link to="/manifesto" className={styles.footerLink}>Manifesto</Link>
          </div>
          
          <div className={styles.footerLogo}>
            <Link to="/">
              <img 
                src='/newwave-text.png' 
                alt='NewWave Logo' 
                className={styles.footerLogoImage}
              />
            </Link>
          </div>
          
          <p className={styles.footerCopy}>&copy; 2025 NewWave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Manifesto;

