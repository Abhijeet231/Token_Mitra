import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='bg-white w-full border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex justify-between items-center h-16'>
          
          {/* Brand - Left */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>TM</span>
            </div>
            <span className='text-xl font-semibold text-slate-800'>
              <span className='text-emerald-600'>Token</span>Mitra
            </span>
          </Link>

          {/* Navigation Links - Center (Desktop) */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link 
              to='/' 
              className='text-slate-600 hover:text-emerald-600 font-medium text-sm'
            >
              Home
            </Link>
            <Link 
              to='/about' 
              className='text-slate-600 hover:text-emerald-600 font-medium text-sm'
            >
              About
            </Link>
            <Link 
              to='/contact' 
              className='text-slate-600 hover:text-emerald-600 font-medium text-sm'
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons - Right (Desktop) */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link 
              to='/login' 
              className='flex items-center space-x-1 text-slate-600 hover:text-emerald-600 font-medium text-sm'
            >
              <User className='w-4 h-4' />
              <span>Login</span>
            </Link>
            <Link 
              to='/register' 
              className='px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700'
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden text-slate-600 hover:text-emerald-600'
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-200'>
          <div className='px-6 py-4 space-y-3'>
            <Link 
              to='/' 
              className='block px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-gray-50 font-medium text-sm rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to='/about' 
              className='block px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-gray-50 font-medium text-sm rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to='/contact' 
              className='block px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-gray-50 font-medium text-sm rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className='pt-3 space-y-2 border-t border-gray-200'>
              <Link 
                to='/login' 
                className='flex items-center justify-center space-x-1 w-full px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-gray-50 font-medium text-sm rounded-lg'
                onClick={() => setIsMenuOpen(false)}
              >
                <User className='w-4 h-4' />
                <span>Login</span>
              </Link>
              <Link 
                to='/register' 
                className='block w-full px-4 py-2 bg-emerald-600 text-white text-center font-medium text-sm rounded-lg hover:bg-emerald-700'
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;