import React from 'react'

const Footer = () => {
  return (
    <>
        {/* Footer */}
      <footer className='bg-gray-900 text-gray-300 py-12 px-6'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='flex items-center justify-center space-x-3 mb-6'>
            <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-black text-lg'>TM</span>
            </div>
            <span className='text-2xl font-bold text-white'>
              TOKEN <span className='text-blue-400'>MITRA</span>
            </span>
          </div>
          <p className='text-gray-400 mb-6'>
            Secure, Fast, and Reliable Token Management Platform
          </p>
          <div className='border-t border-gray-800 pt-6'>
            <p className='text-sm text-gray-500'>
              © 2024 Token Mitra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer