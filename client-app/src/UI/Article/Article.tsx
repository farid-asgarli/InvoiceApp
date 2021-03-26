import React from 'react'
import './Article.css';

export default function Article() {
    return (
        <article className="blog-post">
        <figure className="post-image">
          <a href="./pages/about.html">
            <img alt="Joo - Niche Multi-Purpose HTML Template" src="/images/image2.jpg"/> </a>
        </figure>
        <div className="entry-header">
          <h2 className="entry-title">
            <a href="./pages/about.html">
              <span className="has-text-primary">03.</span> ground shipping</a>
          </h2>
        </div>
        <div className="entry-content">
          <p>The main component of a healthy for self esteem is that it needs be nurturing. It should provide warmth..</p>
        </div>
        <div className="entry-footer">
          <a href="./pages/about.html" className="button">Read More
          <i className="fas fa-chevron-right"></i></a>
        </div>
      </article>
    )
}
