import React, { useState } from 'react';
import { Menu, X, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='bg-slate-50 w-full shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex justify-between items-center h-20'>
          
          {/* Logo/Brand - Left */}
          <div className='flex items-center space-x-3'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md'>
              <span className='text-white font-black text-xl'>TM</span>
            </div>
            <span className='text-2xl font-bold text-gray-800 tracking-tight'>
              TOKEN <span className='text-blue-600'>MITRA</span>
            </span>
          </div>

          {/* Navigation Links - Center (Desktop) */}
          <div className='hidden md:flex items-center space-x-8'>
            <a href='#home' className='text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200 relative group'>
              Home
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
            </a>
            <a href='#about' className='text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200 relative group'>
              About
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
            </a>
            <a href='#contact' className='text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200 relative group'>
              Contact
              <span className='absolute -bottom-1 left-0 w-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
            </a>
          </div>

          {/* Auth Buttons - Right (Desktop) */}
          <div className='hidden md:flex items-center space-x-3'>
            <button className='flex items-center space-x-2 px-5 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200'>
              <UserCircle className='w-5 h-5' />
              <span>Login</span>
            </button>
            <button className='px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md'>
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden text-gray-700 hover:text-blue-600 transition-colors'
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-200'>
          <div className='px-6 py-4 space-y-2'>
            <a 
              href='#home' 
              className='block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium rounded-lg transition-all'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href='#about' 
              className='block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium rounded-lg transition-all'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href='#contact' 
              className='block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium rounded-lg transition-all'
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            
            <div className='pt-3 space-y-2 border-t border-gray-200'>
              <button className='w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition-all'>
                <UserCircle className='w-5 h-5' />
                <span>Login</span>
              </button>
              <button className='w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all'>
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;