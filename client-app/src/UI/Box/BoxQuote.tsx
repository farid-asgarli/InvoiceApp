import React from "react";
import "./BoxQuote.css";

export default function BoxQuote() {
  return (
    <div className='box-quote' >
      <a href="/">
        <span className="media">
          <span className="media-left">
            <span className="icon">
              <i className="icon-call-in"></i>
            </span>
          </span>
          <span className="media-content">
            <strong>Call Us Anytime</strong>
            <br />+ 123 5456 789 01
            <br />+ 123 5456 789 01
          </span>
        </span>
      </a>
    </div>
  );
}
