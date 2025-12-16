import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TM</span>
                </div>
                <span className="text-lg font-semibold text-slate-800">
                  <span className="text-emerald-600">Token</span>Mitra
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Modern healthcare appointment management for everyone.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/" className="hover:text-emerald-600">Find Doctors</Link></li>
                <li><Link to="/" className="hover:text-emerald-600">Specializations</Link></li>
                <li><Link to="/" className="hover:text-emerald-600">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/" className="hover:text-emerald-600">About Us</Link></li>
                <li><Link to="/" className="hover:text-emerald-600">Contact</Link></li>
                <li><Link to="/" className="hover:text-emerald-600">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/" className="hover:text-emerald-600">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-emerald-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-12 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} TokenMitra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer