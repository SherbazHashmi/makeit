"use client";
import React, { useRef } from 'react'
import Image from 'next/image'
import Image0 from "../../../public/profile/0.webp";
import Image1 from "../../../public/profile/1.webp";
import Image2 from "../../../public/profile/2.webp";
import Image3 from "../../../public/profile/3.webp";
import Image4 from "../../../public/profile/4.webp";
import Image5 from "../../../public/profile/5.webp";
import Image6 from "../../../public/profile/6.webp";
import Image7 from "../../../public/profile/7.webp";
import Image8 from "../../../public/profile/8.webp";
import Image9 from "../../../public/profile/9.webp";
import Image10 from "../../../public/profile/10.webp";
import Image11 from "../../../public/profile/11.webp";
import Image12 from "../../../public/profile/12.webp";
import Image13 from "../../../public/profile/13.webp";
import Image14 from "../../../public/profile/14.webp";
import Image15 from "../../../public/profile/15.webp";
import Image16 from "../../../public/profile/16.webp";
import Image17 from "../../../public/profile/17.webp";
// import Image18 from "../../../public/profile/18.webp";
// import Image19 from "../../../public/profile/19.webp";
// import Image20 from "../../../public/profile/20.webp";
import Head from "../../../public/profile/head.webp";
const images = [
  Image0, Image1, Image2,
  Image3, Image4, Image5,
  Image6, Image7, Image8,
  Image9, Image10, Image11,
  Image12, Image13, Image14, 
  Image15, Image16, Image17
]
  
const Profile = ({ name = "", home="", assigned=true}) => {
  const profileImageIndex = useRef(Math.floor(Math.random() * images.length));
  return (
    <div className="item profile">
      <div className="profile_left">
        <Image
          src={assigned ? images[profileImageIndex.current] : Head}
          width={40}
          height={40}
          style={{ borderRadius: 50 }}
          alt="Avatar for the person"
        />
      </div>
      <div className="profile_right">
        <div className="name">{name}</div>
        <div className="profile_right-homeclub">{home}</div>
      </div>
    </div>
  )
}

export default Profile