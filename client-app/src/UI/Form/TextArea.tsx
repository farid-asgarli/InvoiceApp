import React from 'react'
import './TextArea.css';

export default function TextArea() {
    return (
        <div className="form-control is-expanded">
        <textarea className="textarea" name="textarea" placeholder="Message" ></textarea>
      </div>
    )
}
