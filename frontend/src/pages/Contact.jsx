import React from 'react';
import { Mail, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import Footer from '@/components/Footer.jsx';


export default function Contact() {
  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:ghoshabhijeet778@gmail.com',
      color: 'hover:bg-amber-50 hover:border-amber-200',
      iconColor: 'text-amber-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Abhijeet231',
      color: 'hover:bg-gray-50 hover:border-gray-300',
      iconColor: 'text-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/abhijit-ghosh-63b624235/',
      color: 'hover:bg-blue-50 hover:border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: 'https://x.com/Abhijit_091',
      color: 'hover:bg-sky-50 hover:border-sky-200',
      iconColor: 'text-sky-600'
    },
    {
      name: 'Reddit',
      icon: MessageCircle,
      url: 'https://www.reddit.com/user/Open_Ad4468/',
      color: 'hover:bg-orange-50 hover:border-orange-200',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h1>
          <p className="text-gray-600">
            Feel free to reach out through any of these platforms
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-200 transition-all duration-200 ${link.color}`}
              >
                <div className={`p-3 bg-gray-50 rounded-lg ${link.iconColor}`}>
                  <Icon size={24} />
                </div>
                <span className="font-medium text-gray-700">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
      <Footer/>
      </>
  );
}