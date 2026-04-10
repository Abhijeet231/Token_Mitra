import React from 'react';
import { Code, Database, Mail, Github, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';
import Footer from '@/components/Footer';

export default function About() {
  const frontendSkills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'];
  const backendSkills = ['Node.js', 'MongoDB', 'REST APIs'];
  const tools = ['Git & GitHub', 'Resend', 'JWT Authentication & RBAC', "Mapbox"];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Abhijeet Ghosh
          </h1>
          <p className="text-xl md:text-2xl text-amber-600 font-medium">
            Full-Stack Developer
          </p>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            I'm a Full-Stack Developer who enjoys building clean, scalable web applications with modern technologies.
          </p>
        </div>
      </section>

      {/* About Me Section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
            I come from a background in B.Sc. Biology, but over time I discovered a strong interest in technology and decided to transition into software development.
            </p>
            <p>
              Through self-learning and hands-on project building, I’ve developed a solid foundation in full-stack development. I believe in learning by doing - every project teaches me something new about problem-solving, architecture, and user experience.
            </p>
            <p>
             What drives me is the challenge of turning ideas into functional applications that solve real-world problems. 
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-2 mb-8">
            <Code className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Tech Stack</h2>
          </div>

          <div className="space-y-6">
            {/* Frontend */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Tools & Others
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-100"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Featured Project</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-600">Token Mitra</h3>
            <p className="text-gray-700 leading-relaxed">
              A comprehensive doctor-patient appointment booking system designed to streamline healthcare consultations. The platform solves the common problem of inefficient appointment management and long waiting times.
            </p>
            
            <div className="space-y-2 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Role-based access control for doctors and patients with dedicated dashboards</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Token-based queue management system for organized patient flow</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Automated email notifications for appointment confirmations and updates</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Real-time booking status and appointment tracking</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Goals Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 pb-20">
        <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm p-8 md:p-10 border border-amber-100">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">What I'm Looking For</h2>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I'm currently seeking <span className="font-semibold text-amber-700">Full-Stack Internship</span> or <span className="font-semibold text-amber-700">Junior Developer</span> opportunities where I can contribute to real-world projects and continue growing as a developer.
            </p>
            <p>
              I'm eager to work in production environments, collaborate with experienced teams, and learn industry best practices. Whether it's React.js, Node.js, or full-stack development, I'm excited to bring my problem-solving mindset and enthusiasm for learning to your team.
            </p>
            <p>
              If you're looking for someone who's self-motivated, adaptable, and passionate about building quality software, let's connect!
            </p>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 pt-6 border-t border-amber-200">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <a
                href="mailto:ghoshabhijeet778@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                <Mail size={18} />
                Get in Touch
              </a>
              <a
                href="https://github.com/Abhijeet231"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                <Github size={18} />
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}