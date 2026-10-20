import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">⚡</span>
              Project <span>X</span>
            </div>
            <p>
              Empowering teams to build better projects, faster. 
              Join thousands of happy users worldwide.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="footer-links">
            <h4>
              <i className="fas fa-cube"></i> Product
            </h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#">Integrations</a>
            <a href="#">Changelog</a>
            <a href="#">Roadmap</a>
          </div>

          {/* Column 3: Company */}
          <div className="footer-links">
            <h4>
              <i className="fas fa-building"></i> Company
            </h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
            <a href="#">Press Kit</a>
          </div>

          {/* Column 4: Resources */}
          <div className="footer-links">
            <h4>
              <i className="fas fa-life-ring"></i> Resources
            </h4>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Status</a>
            <a href="#">Terms & Privacy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; {new Date().getFullYear()} Project X. All rights reserved.
            </p>
            <p className="footer-heart">
              Made with <span className="heart">❤️</span> by Team X
            </p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;