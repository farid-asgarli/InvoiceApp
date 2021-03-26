import React from 'react'
import './TitleBar.css';

interface Props{
  title:string;
  subTitle:string;
}

export default function TitleBar({title,subTitle}:Props) {
    return (
      <>
      <p className="heading-title-top has-text-centered">{title}</p>
      <h1 className="heading-title style-3 multiline">{subTitle}</h1>
      </>
    )
}
