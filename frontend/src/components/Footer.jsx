import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        {/* ================= FOOTER ================= */}
        <footer className="bg-white mt-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">TM</span>
                </div>
                <span className="text-xl font-semibold text-stone-800">
              <span className="text-amber-600">Token</span>Mitra
            </span>
              </div>
              <p className="text-gray-600">Your trusted healthcare companion</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-amber-600 transition-colors">Find Doctors</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">Book Appointment</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">Health Records</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-amber-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>support@healthcare.com</li>
                <li>1-800-HEALTH-1</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 HealthCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer