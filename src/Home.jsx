import fingerprint from './assets/fingerprint.png';
import profile from './assets/profile.png'

function Home() {
    return (
      <div className="flex items-center justify-center bg-custom-green h-screen w-screen mt-[-32px] ml-[-258px]">
        <div className="bg-white rounded-lg drop-shadow-md h-[500px] w-[600px]">
          <p className="text-txt-color text-[50px] font-bold p-[10px]">WELCOME !</p>

          <div>
          
              <button className="h-[100px] w-[400px] border-2 border-custom-grey rounded-lg flex items-center justify-center ml-[100px] mt-[2.5rem]">
                <img src={fingerprint} alt="Fingerprint" className="max-h-full max-w-full object-contain"/> <p className='text-[25px] text-custom-grey2 pl-[1rem]'>Scan My Fingerpint</p>
              </button>

              <div className="flex items-center w-[500px] m-[3rem]"> 
                <div className="flex-grow border-t border-txt-color/100"></div>
                <span className="px-4 text-txt-color/100">or</span>
                <div className="flex-grow border-t border-txt-color/100"></div>
              </div>


              <button className="h-[100px] w-[400px] border-2 border-txt-color bg-txt-color rounded-lg flex items-center justify-center ml-[100px]">
                <img src={profile} alt="Fingerprint" className="h-[60px] w-[60px] object-contain"/> <p className='text-[25px] text-white pl-[1.5rem]'>Create My Profile</p>
              </button>
          </div>
        </div>
      </div>
    );
}

export default Home;
