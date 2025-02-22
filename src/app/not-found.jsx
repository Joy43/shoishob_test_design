import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import errorimg from "../../public/images/Notfount/Pure-CSS-404-Error-Page.gif"

const NotFound= () => {
  return (
    <div className=' items-center p-4 '>
      <div className="items-center text-center mx-auto">
        <Link className="bg-blue-700 text-white rounded-lg p-2 w-fit shadow-md"  href="/"> 
        ◄ Go Home
        </Link>
      </div>
      <div className='w-[90%] mx-auto my-5 '>
        <Image src={errorimg}
        alt='Not found page shoishob website'
        width={500}
        height={500}
        className="w-full rounded-3xl"
        >


        </Image>
      </div>
    </div>
  )
}

export default NotFound
