import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

function CreateProfile() {
  const navigate = useNavigate();

  const handleCancelClick = (e) => {
    e.preventDefault();
    const confirmCancel = window.confirm("Are you sure you want to cancel the registration?");
    if (confirmCancel) {
      navigate('/');
    };
  }

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null)
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    suffix: '',
    birthdate: '',
    nationality: '',
    religion: '',
    height: '',
    weight: '',
    eyecol: '',
    haircol: '',
    occupation: '',
    telnum: '',
    phonenum: '',
    email: '',
    education: '',
    gender: '',
    maritalStat: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    zip: '',
    motherFirstname: '',
    motherLastname: '',
    motherMiddlename: '',
    motherDob: '',
    motherContact: '',
    motherEmail: '',        
    motherOccupation: '',
    motherEmployer: '',
    motherEmployerAddr: '',
    motherTelFax: '',
    fatherFirstname: '',
    fatherLastname: '',
    fatherMiddlename: '',
    fatherDob: '',
    fatherContact: '',
    fatherEmail: '',
    fatherOccupation: '',
    fatherEmployer: '',
    fatherEmployerAddr: '',
    fatherTelFax: '',
    guardianFirstname: '',
    guardianLastname: '',
    guardianMiddlename: '',
    guardianRelationship: '',
    guardianContact: '',
    guardianEmail: '',
    guardianHomeAddr: '',
  });
  
  const textfield ="h-[2.5rem] w-[15rem] p-2 bg-white rounded-md text-txt-color font-montserrat text-[16px] border border-gray-300";
  const txtfield_header = "block text-left text-white font-montserrat text-[35px] mb-6 ml-[2rem] mt-[3rem] pt-[1.5rem]";
  const labelStyle = "block text-left text-white font-montserrat mb-1 text-[14px]";
  const parentInfoHeader  = "font-montserrat text-[25px] block text-left text-white mt-[2.7rem] ml-[2.5rem] mb-[1.5rem]"
  const parentlabelstyle = "block text-left text-white font-montserrat mb-1 text-[14px] ml-[2.5rem]"

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validImageTypes = ["image/jpeg", "image/png"];
      if (!validImageTypes.includes(selectedFile.type)) {
        alert("Please upload a valid image (JPEG/PNG).");
        return;
      }
      // Create an object URL to display the image
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl); // For previewing image
      setFile(selectedFile); // For uploading the actual file
    }
  };


  const handleInput = (e) => {
    e.persist();
    setProfile({...profile, [e.target.name]: e.target.value});
  }

  const saveProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();


  if (
    profile.firstname === '' || profile.lastname === '' || profile.birthdate === '' || 
    profile.eyecol === '' || profile.haircol === '' || profile.education === '' ||
    profile.phonenum === '' || profile.email === '' || profile.gender === '' ||
    profile.maritalStat === '' || profile.height === '' || profile.weight === '' ||
    profile.street === '' || profile.barangay === '' || profile.city === '' ||
    profile.province === '' || profile.zip === '' ||
    profile.motherFirstname === '' || profile.motherLastname === '' || profile.motherDob === '' ||
    profile.motherContact === '' || profile.fatherFirstname === '' || profile.fatherLastname === '' ||
    profile.fatherDob === '' || profile.fatherContact === '' || profile.guardianFirstname === '' ||
    profile.guardianLastname === '' || profile.guardianContact === '' || 
    profile.guardianRelationship === '' || profile.guardianHomeAddr === ''
  ) {
      alert("Please add input to the required fields.");
      return;
  }
  else{

    const isValidPhoneNumber = (phone) => phone.startsWith('09') && phone.length === 11 && !isNaN(phone);
    const isValidEmail = (email) => email.includes('@') && email.endsWith('@gmail.com');

    if (
      !isValidPhoneNumber(profile.phonenum) ||
      !isValidPhoneNumber(profile.motherContact) ||
      !isValidPhoneNumber(profile.fatherContact) ||
      !isValidPhoneNumber(profile.guardianContact)
    ) {
      alert("Please insert a valid contact number. It should start with '09' and be 11 digits long.");
      return;
    }
    else if(
      !isValidEmail(profile.email) ||
      !isValidEmail(profile.motherEmail) ||
      !isValidEmail(profile.fatherEmail)
    ) {
      alert("Please insert a valid email.");
      return;
    }
    
  }

  if (file) {
    formData.append("image", file);
  }
  else{
    alert("Please insert an image.")
    return;
  }

   // Append profile data to FormData
   Object.keys(profile).forEach(key => {
    formData.append(key, profile[key]);
     });

    try {
      const response = await axios.post('http://localhost:5000/create-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Make sure to include this if sending files
        },
      });
      console.log('Profile saved:', response.data);
      alert('Profile Saved!')
      location.reload()
    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error.message);
    }
    

  };


  const renderErrorMessages = (field) => {
    return errorMessages[field] && (
        <div className="text-red-600 text-sm">{errorMessages[field]}</div>
    );
    };

 const [errorMessages, setErrorMessages] = useState({});


  

  const CreateProfContent = 
  <div className = "flex justify-center items-center">
     <div className="pb-9 pr-9 w-[90rem] flex-shrink-0">
     <form onSubmit={saveProfile} autoComplete="on" encType="multipart/form-data" >
      {/* ----------------------------------------------------------------------------PERSONAL INFO---------------------------------------------------------- */}

      <div className="bg-txt-color rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
        
        <h2 className={txtfield_header}>PERSONAL INFORMATION</h2>
        <h4 className = {parentInfoHeader}>Basic Information :</h4>

        <div className="grid grid-cols-1 md:grid-cols-[0.6fr_2fr] items-start">
             {/* Left Column: Add Photo */}
            <div className="flex flex-col items-center mt-[4.5rem] ml-[-1rem]">
                <label htmlFor="imageUpload" className="image-upload-container">
                {image ? (
                <img src={image} alt="Uploaded" className="h-[200px] w-[200px] object-cover rounded-lg mb-4"/>
                ) : (
                <div className="h-[200px] w-[200px] border-2 border-gray-300 flex justify-center items-center rounded-lg cursor-pointer">
                    <div className="text-center">
                    <span className="plus-sign text-[40px] text-white font-montserrat">+</span>
                    <p className="text-white text-[15px] font-montserrat">Add Photo</p>
                    </div>
                </div>
                )}
                </label>
                <input className="border-white border-2" type="file" id="imageUpload" name="image" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </div>

             {/* Right Column: Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start">
                <div> <label className={labelStyle} htmlFor="firstname">Firstname* </label><input className={textfield} type="text" id="firstname" name="firstname" onChange={handleInput} value = {profile.firstname}/>{renderErrorMessages("firstname")}</div>  
                <div><label className={labelStyle} htmlFor="lastname">Lastname*</label><input className={textfield} type="text" id="lastname" name="lastname" onChange={handleInput} value = {profile.lastname}/>{renderErrorMessages("lastname")}</div>
                <div><label className={labelStyle} htmlFor="middlename">Middlename</label><input className={textfield} type="text" id="middlename" name="middlename" onChange={handleInput} value = {profile.middlename}/></div>
                <div><label className={labelStyle} htmlFor="suffix">Suffix</label><input className={textfield} type="text" id="suffix" name="suffix" onChange={handleInput} value = {profile.suffix}/></div>
                <div><label className={labelStyle} htmlFor="birthdate">Birthdate*</label><input className={textfield} type="date" id="birthdate" name="birthdate" onChange={handleInput} value = {profile.birthdate}/>{renderErrorMessages("birthdate")}</div>
                <div><label className={labelStyle} htmlFor="nationality">Nationality*</label><input className={textfield} type="text" id="nationality" name="nationality" onChange={handleInput} value = {profile.nationality}/>{renderErrorMessages("nationality")}</div>
                <div><label className={labelStyle} htmlFor="religion">Religion*</label><input className={textfield} type="text" id="religion" name="religion" onChange={handleInput} value = {profile.religion}/>{renderErrorMessages("religion")}</div>
                <div><label className={labelStyle} htmlFor="height">Height*</label><input className={textfield} type="number" id="height" name="height" onChange={handleInput} value = {profile.height}/>{renderErrorMessages("height")}</div>
                <div><label className={labelStyle} htmlFor="weight">Weight*</label><input className={textfield} type="number" id="weight" name="weight" onChange={handleInput} value = {profile.weight}/>{renderErrorMessages("weight")}</div>
                <div><label className={labelStyle} htmlFor="eyecol">Eye Color*</label><input className={textfield} type="text" id="eyecol" name="eyecol" onChange={handleInput} value = {profile.eyecol}/>{renderErrorMessages("eyecol")}</div>
                <div><label className={labelStyle} htmlFor="haircol">Hair Color*</label><input className={textfield} type="text" id="haircol" name="haircol" onChange={handleInput} value = {profile.haircol}/>{renderErrorMessages("haircol")}</div>
                <div><label className={labelStyle} htmlFor="occupation">Occupation</label><input className={textfield} type="text" id="occupation" name="occupation" onChange={handleInput} value = {profile.occupation}/></div>
            </div>

        </div>

        <h4 className = {parentInfoHeader}>Contact Information :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div><label className={labelStyle} htmlFor="telnum">Telephone Number</label><input className={textfield} type="number" id="telnum" name="telnum" onChange={handleInput} value = {profile.telnum}/>{renderErrorMessages("telnum")}</div>
            <div><label className={labelStyle} htmlFor="phonenum">Phone Number*</label><input className={textfield} type="number" id="phonenum" name="phonenum" onChange={handleInput} value = {profile.phonenum}/>{renderErrorMessages("phonenum")}</div>
            <div><label className={labelStyle} htmlFor="email">Email*</label><input className={textfield} type="text" id="email" name="email" onChange={handleInput} value = {profile.email} autoComplete="on"/>{renderErrorMessages("email")}</div>
        </div>

        <h4 className = {parentInfoHeader}>Social Information :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div>
                <label className={labelStyle} htmlFor="education">Education Level*</label>
                <select className={textfield} id="education" name="education" onChange={handleInput} value = {profile.education}>
                    <option value="" disabled>Select</option>
                    <option value="elementary">Elementary</option>
                    <option value="highschool">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="doctorate">Doctorate</option>
                </select>
            </div>
            
            <div>
                <label className={labelStyle} htmlFor="gender">Gender*</label>
                <select className={textfield} id="gender" name="gender" onChange={handleInput} value = {profile.gender}>
                    <option value="" disabled>Select</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                </select>
            </div>
            
            <div>
                <label className={labelStyle} htmlFor="maritalStat">Marital Status*</label>
                <select className={textfield} id="maritalStat" name="maritalStat" onChange={handleInput} value = {profile.maritalStat}>
                    <option value="" disabled>Select</option>
                    <option value="0">Single</option>
                    <option value="1">Married</option>
                    <option value="2">Divorced</option>
                    <option value="3">Widowed</option>
                </select>
            </div>
        </div>

        <h4 className = {parentInfoHeader}>Address :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div><label className={labelStyle} htmlFor="street">Street*</label><input className={textfield} type="text" id="street" name="street" onChange={handleInput} value = {profile.street}/>{renderErrorMessages("street")}</div>
            <div><label className={labelStyle} htmlFor="barangay">Barangay*</label><input className={textfield} type="text" id="barangay" name="barangay" onChange={handleInput} value = {profile.barangay}/>{renderErrorMessages("barangay")}</div>
            <div><label className={labelStyle} htmlFor="city">City/Municipality*</label><input className={textfield} type="text" id="city" name="city" onChange={handleInput} value = {profile.city}/>{renderErrorMessages("city")}</div>
            <div><label className={labelStyle} htmlFor="province">Province*</label><input className={textfield} type="text" id="province" name="province" onChange={handleInput} value = {profile.province}/>{renderErrorMessages("province")}</div>
            <div><label className={labelStyle} htmlFor="zip">Zip Code*</label><input className={textfield} type="number" id="zip" name="zip" onChange={handleInput} value = {profile.zip}/>{renderErrorMessages("zip")}</div>
        </div>

      </div>

       {/* ---------------------------------------------------------------- PARENT INFO------------------------------------------------------------------------------ */}

       <div className="bg-custom-blue rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
            <h2 className={txtfield_header}>PARENTS' INFORMATION</h2>
            <div id='mother-info'>
            <h3 className = {parentInfoHeader}>Mother's Info :</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div> <label className={parentlabelstyle} htmlFor="m-firstname">Firstname*</label><input className={textfield} type="text" id="m-firstname" name="motherFirstname" onChange={handleInput} value = {profile.motherFirstname}/>{renderErrorMessages("motherFirstname")}</div> 
              <div><label className={parentlabelstyle} htmlFor="m-lastname">Lastname*</label><input className={textfield} type="text" id="m-lastname" name="motherLastname" onChange={handleInput} value = {profile.motherLastname}/>{renderErrorMessages("motherLastname")}</div>
              <div><label className={parentlabelstyle} htmlFor="m-middlename">Middlename</label><input className={textfield} type="text" id="m-middlename" name="motherMiddlename" onChange={handleInput} value = {profile.motherMiddlename}/></div>
              <div><label className={parentlabelstyle} htmlFor="m-birthdate">Birthdate*</label><input className={textfield} type="date" id="m-birthdate" name="motherDob" onChange={handleInput} value = {profile.motherDob}/>{renderErrorMessages("motherDob")}</div>
              <div><label className={parentlabelstyle} htmlFor="m-phonenum">Phone Number*</label><input className={textfield} type="number" id="m-phonenum" name="motherContact" onChange={handleInput} value = {profile.motherContact}/>{renderErrorMessages("motherContact")}</div>
              <div><label className={parentlabelstyle} htmlFor="m-email">Email</label><input className={textfield} type="text" id="m-email" name="motherEmail" onChange={handleInput} value = {profile.motherEmail}/>{renderErrorMessages("motherEmail")}</div>
            </div>

            <h4 className = "font-montserrat text-[18px] block text-left text-white mt-[2rem] ml-[2.5rem] mb-[1rem]">Occupation Details :</h4>
            <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div> <label className={parentlabelstyle} htmlFor="m-occupation">Occupation</label><input className={textfield} type="text" id="m-occupation" name="motherOccupation" onChange={handleInput} value = {profile.motherOccupation}/>{renderErrorMessages("motherOccupation")}</div>
              <div><label className={parentlabelstyle} htmlFor="m-employer">Employer</label><input className={textfield} type="text" id="m-employer" name="motherEmployer" onChange={handleInput} value = {profile.motherEmployer}/></div>
              <div><label className={parentlabelstyle} htmlFor="m-address">Address</label><input className={textfield} type="text" id="m-address" name="motherEmployerAddr" onChange={handleInput} value = {profile.motherEmployerAddr}/></div>
              <div><label className={parentlabelstyle} htmlFor="m-tel-fax">Tel/Fax</label><input className={textfield} type="number" id="m-tel-fax" name="motherTelFax" onChange={handleInput} value = {profile.motherTelFax}/></div>
            </div>
            </div>


            <div id='father-info'>
            <h3 className = {parentInfoHeader}>Father's Info :</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label className={parentlabelstyle} htmlFor="f-firstname">Firstname*</label><input className={textfield} type="text" id="f-firstname" name="fatherFirstname" onChange={handleInput} value = {profile.fatherFirstname}/>{renderErrorMessages("fatherFirstname")}</div>  
                <div><label className={parentlabelstyle}  htmlFor="f-lastname">Lastname*</label><input className={textfield} type="text" id="f-lastname" name="fatherLastname" onChange={handleInput} value = {profile.fatherLastname}/>{renderErrorMessages("fatherLastname")}</div>
                <div><label className={parentlabelstyle}  htmlFor="f-middlename">Middlename</label><input className={textfield} type="text" id="f-middlename" name="fatherMiddlename" onChange={handleInput} value = {profile.fatherMiddlename}/></div>
                <div><label className={parentlabelstyle} htmlFor="f-birthdate">Birthdate*</label><input className={textfield} type="date" id="f-birthdate" name="fatherDob" onChange={handleInput} value = {profile.fatherDob}/>{renderErrorMessages("fatherDob")}</div>
                <div><label className={parentlabelstyle}  htmlFor="f-phonenum">Phone Number*</label><input className={textfield} type="number" id="f-phonenum" name="fatherContact" onChange={handleInput} value = {profile.fatherContact}/>{renderErrorMessages("fatherContact")}</div>
                <div><label className={parentlabelstyle} htmlFor="f-email">Email</label><input className={textfield} type="text" id="f-email" name="fatherEmail" onChange={handleInput} value = {profile.fatherEmail}/>{renderErrorMessages("fatherEmail")}</div>
            </div>
            <h4 className = "font-montserrat text-[18px] block text-left text-white mt-[2rem] ml-[2.5rem] mb-[1rem]">Occupation Details :</h4>
            <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label className={parentlabelstyle} htmlFor="f-occupation">Occupation</label><input className={textfield} type="text" id="f-occupation" name="fatherOccupation" onChange={handleInput} value = {profile.fatherOccupation}/>{renderErrorMessages("fatherOccupation")}</div>  
                <div><label className={parentlabelstyle} htmlFor="f-employer">Employer</label><input className={textfield} type="text" id="f-employer" name="fatherEmployer" onChange={handleInput} value = {profile.fatherEmployer}/></div>
                <div><label className={parentlabelstyle} htmlFor="f-address">Address</label><input className={textfield} type="text" id="f-address" name="fatherEmployerAddr" onChange={handleInput} value = {profile.fatherEmployerAddr}/></div>
                <div><label className={parentlabelstyle} htmlFor="f-tel-fax">Tel/Fax</label><input className={textfield} type="number" id="f-tel-fax" name="fatherTelFax" onChange={handleInput} value = {profile.fatherTelFax}/></div>
            </div>
            </div>
         </div>

          {/* ------------------------------------------------------------------GUARDIAN INFO--------------------------------------------------------------------- */}
          <div className="bg-txt-color rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
            <h2 className={txtfield_header}>GUARDIAN/ CO-PARENT INFORMATION</h2>
            <div id='mother-info'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label className={parentlabelstyle} htmlFor="g-firstname">Firstname*</label><input className={textfield} type="text" id="g-firstname" name="guardianFirstname" onChange={handleInput} value = {profile.guardianFirstname}/>{renderErrorMessages("guardianFirstname")}</div>  
                <div><label className={parentlabelstyle}  htmlFor="g-lastname">Lastname*</label><input className={textfield} type="text" id="g-lastname" name="guardianLastname" onChange={handleInput} value = {profile.guardianLastname}/>{renderErrorMessages("guardianLastname")}</div>
                <div><label className={parentlabelstyle}  htmlFor="g-middlename">Middlename</label><input className={textfield} type="text" id="g-middlename" name="guardianMiddlename" onChange={handleInput} value = {profile.guardianMiddlename}/></div>
                <div><label className={parentlabelstyle}  htmlFor="relationship">Relationship*</label><input className={textfield} type="text" id="relationship" name="guardianRelationship" onChange={handleInput} value = {profile.guardianRelationship}/>{renderErrorMessages("guardianRelationship")}</div>
                <div><label className={parentlabelstyle}  htmlFor="g-phonenum">Phone Number*</label><input className={textfield} type="number" id="g-phonenum" name="guardianContact" onChange={handleInput} value = {profile.guardianContact}/>{renderErrorMessages("guardianContact")}</div>
                <div><label className={parentlabelstyle}  htmlFor="g-email">Email</label><input className={textfield} type="text" id="g-email" name="guardianEmail" onChange={handleInput} value = {profile.guardianEmail}/>{renderErrorMessages("guardianEmail")}</div>
                <div><label className={parentlabelstyle}  htmlFor="homead">Home Address*</label><input className="h-[2.5rem] w-[37rem] p-2 bg-white rounded-md text-txt-color font-montserrat text-[16px] border border-gray-300 ml-[2.5rem]" type="text" id="homead" name="guardianHomeAddr" onChange={handleInput} value = {profile.guardianHomeAddr}/>{renderErrorMessages("guardianHomeAddr")}</div>
                </div>
            </div>
            </div>


            <div className="flex justify-between mt-[2rem] mb-[2rem] ml-[62rem]">
                <button className="w-[12rem] h-[2.5rem] bg-green-600 font-montserrat text-white text-[15px] rounded-md drop-shadow-md hover:bg-green-700 transition duration-200 justify-center save-btn" type="submit">Save</button>
            </div> 

            </form>
              
            <div className="flex justify-end mt-[-4.5rem]">
            <button className="w-[12rem] h-[2.5rem] bg-red-900 font-montserrat text-white text-[15px] rounded-md ml-4 drop-shadow-md hover:bg-red-800 transition duration-200" onClick={handleCancelClick}>Cancel</button>
            </div>

        </div>
  </div>

    return (CreateProfContent);
}

export default CreateProfile;



    