import React from 'react'
import Navbar from '../shared/Navbar/Navbar'

export default function layout({children}) {
  return (
    
  <>
   <div>
        <title>shoishob-product</title>
        <meta name="shoishob band" content="Shoishob is a leading kids fashion brand in Bangladesh that
              represents style and quality since 2008, mostly distinguished for
              its own quality designs and fabrics. Shoishob aspires to deliver
              what every kid’s wardrobe needs." />
        <meta name="keywords" content="shoishob, Kids, hotproduct" />
        <meta name="author" content="shoishob" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Your Website Title" />
        <meta property="og:description" content="Description of your website for sharing on social platforms" />
        <meta property="og:image" content="URL_to_image_for_social_sharing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsiteurl.com" />
      </div>

   <div>
   <Navbar/>
   {children}
   </div>
     </>

  )
}
