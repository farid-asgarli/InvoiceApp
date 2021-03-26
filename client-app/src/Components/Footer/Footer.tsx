import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';


export default function Footer() {
    return (
        <footer id="footer" className="site-footer">
        <div id="footer-inner" className="site-footer-inner container">
           <div className="row">
            <div className="col-md-9">
              <div className="widget widget-html">
                <div className="textwidget">
                  <div className="site-logo ">
                    <Link to='/'>
                      <img alt="Joo - Niche Multi-Purpose HTML Template" src="/images/logo2-white.png"/>
                      <span className="logo-text">Invoice App</span>
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
        
            <div className="col-md-3">
              <div className="widget">
                <h3 className="widget-title ">contact me</h3>
                <div className="widget-links links-with-icons">
                  <ul>
                    <li>
                      <span className="icon">
                        <i className="icon-location-pin"></i>
                      </span>
                      <a href="/">github.com/faridOP</a>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="icon-location-pin"></i>
                      </span>
                      <a href="/">Baku, Azerbaijan</a>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="icon-envelope"></i>
                      </span>
                      <a href="mailto:feridask17@gmail.com">feridask17@gmail.com</a>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="icon-phone"></i>
                      </span>
                      <a href="tel:+994508668407">+994 50 866 84 07</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}
