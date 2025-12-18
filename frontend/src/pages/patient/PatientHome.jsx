import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Award, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '@/components/Footer';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 247,
    location: "Manhattan Medical Center",
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    available: "Today at 2:00 PM"
  },
  {
    id: 2,
    name: "Dr. James Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 189,
    location: "Wellness Skin Clinic",
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    available: "Tomorrow at 10:00 AM"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 5.0,
    reviews: 312,
    location: "Children's Health Center",
    experience: "18 years",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    available: "Today at 4:30 PM"
  },
  {
    id: 4,
    name: "Dr. Michael Thompson",
    specialty: "Orthopedic Surgeon",
    rating: 4.7,
    reviews: 156,
    location: "Sports Medicine Institute",
    experience: "20 years",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    available: "Wed at 9:00 AM"
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Psychiatrist",
    rating: 4.9,
    reviews: 203,
    location: "Mental Wellness Center",
    experience: "14 years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    available: "Today at 6:00 PM"
  },
  {
    id: 6,
    name: "Dr. David Park",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 178,
    location: "Brain & Spine Institute",
    experience: "16 years",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    available: "Thu at 11:00 AM"
  },
  {
    id: 7,
    name: "Dr. Rachel Green",
    specialty: "Ophthalmologist",
    rating: 4.9,
    reviews: 221,
    location: "Vision Care Center",
    experience: "11 years",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    available: "Today at 3:00 PM"
  },
  {
    id: 8,
    name: "Dr. Robert Kumar",
    specialty: "Gastroenterologist",
    rating: 4.7,
    reviews: 167,
    location: "Digestive Health Clinic",
    experience: "13 years",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    available: "Fri at 1:30 PM"
  }
];

const DoctorCard = ({ doctor, index }) => {
  return (
    <div
      onClick={() => window.location.href = `#/doctor/${doctor.id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-amber-100 to-orange-100">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-amber-600 font-medium mb-3">{doctor.specialty}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{doctor.experience} experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-green-600 font-medium">{doctor.available}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">{doctor.reviews} reviews</span>
          <button className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const PatientHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  
  const displayedDoctors = showAll ? doctors : doctors.slice(0, 4);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-50">


      {/* Hero Section with Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect
            <span className="bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> Doctor</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with top-rated healthcare professionals in your area
          </p>
        </div>

        <div
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none text-lg shadow-lg bg-white"
            />
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Doctors</h2>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {displayedDoctors.map((doctor, index) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={index} />
            ))}
          </div>
        </div>

        {/* Show More Button */}
        <div 
          className="flex justify-center"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-4 bg-white text-amber-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-amber-200"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                Show More Doctors
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default PatientHomePage;