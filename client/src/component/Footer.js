import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

export default function Footer() {
    return (
        <div className='text-center bg-dark '>
           
            <span><a className='text-white fs-1 m-3' href="https://www.facebook.com"><FaFacebookSquare/></a> </span>
            <span><a className='text-white fs-1 m-3' href="https://github.com/ahmad-sul"><AiFillGithub/></a> </span>
            <span><a className='text-white fs-1 m-3' href="https://www.linkedin.com/in/ahmad-suliman-19ba37214/"><AiFillLinkedin/></a> </span>
            <span><a className='text-white fs-1 m-3' href="https://www.google.com"><AiOutlineMail/></a> </span>
           
        </div>
    )
}
