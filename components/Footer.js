import React from 'react'

const Footer = () => {
  const currentyear = new Date().getFullYear()
  return (
    <div className='text-white justify-between p-6 bg-[#0a0e31] z-50'>
     <p className='text-center'>Copyright &copy; {currentyear} Patronick - All rights reserved!</p>
    </div>
  )
}
  export default Footer

