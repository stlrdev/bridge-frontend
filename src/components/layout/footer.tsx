import React from "react";
import Container from "./container";
const Footer = () => {
  return (
    <footer className="bg-primary text-white px-8 py-20">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Logo and Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl">STLR</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Empowering employees with world-class benefits and exclusive savings
            from global and local brands. your reward platform for a better life
            style.
          </p>
          <div className="pt-4 border-t border-blue-500">
            <p className="text-xs">
              © 2024 STLR Platforms Inc. All rights reserved.
            </p>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm hover:text-blue-200 transition-colors"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm hover:text-blue-200 transition-colors"
              >
                New arrivals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm hover:text-blue-200 transition-colors"
              >
                Redemption guide
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm hover:text-blue-200 transition-colors"
              >
                Support center
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - Corporate */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Corporate</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm hover:text-blue-200 transition-colors"
              >
                Merchant portal
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm hover:text-blue-200 transition-colors"
              >
                Company settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm hover:text-blue-200 transition-colors"
              >
                Terms of service
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
