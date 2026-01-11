import { Search, ChevronDown, ChevronUp, LoaderCircle } from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import DoctorCard from '@/components/doctor/DoctorCard.jsx';
import { useState, useEffect } from 'react';
import { getAllDoctors } from '@/services/doctor.service.js';
import { toast } from 'react-toastify';



const PatientHomePage = () => {
  const [doctor, setDoctor] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false)

  
  // Fetching all Doctors
  useEffect(() => {
    const getAllDocs = async() => {
      try {
        setLoading(true)
        const res = await getAllDoctors();
        setDoctor(res.data.data);
        console.log("All Available Doctors:", res.data.data);
      } catch (error) {
        toast.error("Error WHile Fetching all Doctors!");
        console.log("Error While Fetching all Doctors:", error)
      }finally{
        setLoading(false)
      }

    }
    getAllDocs();
  }, [])

  // search Input
  const normalizedQuerry = searchQuery.toLocaleLowerCase().trim();

  // Filtering doctors array
  const filteredDoctors = doctor.filter((doc) => {
    const name = doc?.userId?.fullName?.toLocaleLowerCase() || "";
    const specialization = doc?.specialization?.toLocaleLowerCase()||"";
    const address = doc?.clinicAddress?.toLocaleLowerCase() || "";

    return(
      name.includes(normalizedQuerry) || 
      specialization.includes(normalizedQuerry) ||
      address.includes(normalizedQuerry)
    );
  });

 // for progressive disclosure feature (showMore> showLess)
  const visibleDoctors = showAll ? filteredDoctors : filteredDoctors.slice(0,4);

  // for clean ux
  useEffect(() => {
    setShowAll(false);
  },[searchQuery])
 

   if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
  <h3 className="text-center font-semibold text-2xl text-gray-700 animate-pulse">
    Loading...
  </h3>

  <LoaderCircle className="w-10 h-10 text-amber-500 animate-spin" />
</div>
    );
  }

  
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
        <div className="mb-8 ">
         
          {filteredDoctors.length === 0 ? (
            <p className='text-center text-gray-500 mt-12 '>No Doctors found matching your search</p>
          ) :
          <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Doctors</h2>
             
            <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
            {visibleDoctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc}  />
            ))}
            </div>
          </div>
          }
        </div>

        {/* Show More Button */}
   {filteredDoctors.length >=1  &&
          doctor.length > 4 && (
  <div className="flex justify-center">
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
)
     
   }

      
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default PatientHomePage;