import { useNavigate } from 'react-router-dom';
import fingerprint from './assets/fingerprint.png';
import profile from './assets/profile.png';

function Home() {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleCreateProfileClick = () => {
    navigate('/create-profile');  // Navigate to CreateProfile when the button is clicked
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg drop-shadow-md h-[500px] w-[600px] mt-[9rem]">
        <p className="text-txt-color text-[50px] font-bold font-montserrat p-[2rem]">WELCOME !</p>

        <div>
          <button className="h-[100px] w-[400px] border-2 border-custom-blue rounded-lg flex items-center justify-center ml-[100px] mt-[0rem]">
            <img src={fingerprint} alt="Fingerprint" className="max-h-full max-w-full object-contain" />
            <p className='text-[22px] text-custom-grey2 pl-[1rem] font-montserrat'>Scan My Fingerpint</p>
          </button>

          <div className="flex items-center w-[500px] m-[3rem]"> 
            <div className="flex-grow border-t border-txt-color/60"></div>
            <span className="px-4 font-montserrat text-txt-color/100">or</span>
            <div className="flex-grow border-t border-txt-color/60"></div>
          </div>

          <button 
            className="h-[100px] w-[400px] border-2 border-custom-blue bg-custom-blue rounded-lg flex items-center justify-center ml-[100px]" onClick={handleCreateProfileClick}>
            <img src={profile} alt="Create Profile" className="h-[60px] w-[60px] object-contain" /> 
            <p className='text-[22px] text-white pl-[1.5rem] font-montserrat'>Create My Profile</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
