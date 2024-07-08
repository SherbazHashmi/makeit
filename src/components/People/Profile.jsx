"use client";
import React from 'react'
import Image from 'next/image'
import ProfileImage from "../../../public/profile.png"
const Profile = ({ profile_blob = "" , name = "", home=""}) => {
  return (
    <div className="item profile">
      <div className="profile_left">
        <Image
          src={ProfileImage}
          width={40}
          height={40}
          style={{ borderRadius: 50 }}
          alt="Picture of the author"
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