import { Star, MapPin, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";


const DoctorCard = ({ doctor}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow  overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-amber-100 to-orange-100">
        <img 
          src={doctor?.profileImage?.url} 
          alt={doctor?.userId?.fullName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="text-sm font-semibold text-gray-800">{doctor?.userId?.fullName}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor?.fullName}</h3>
        <p className="text-amber-600 font-medium mb-3">{doctor?.specialization}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{doctor?.clinicAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{doctor?.experience} experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-green-600 font-medium">{doctor?.isAvailable}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">{doctor?.reviews} reviews</span>
          <Link
           to= "/patient/booking"
          className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard