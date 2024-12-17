import { useState } from "react";

function CreateProfile() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
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
    image: null
  });
  

  const textfield ="h-[2.5rem] w-[15rem] p-2 bg-white rounded-md text-txt-color font-montserrat text-[16px] border border-gray-300";
  const txtfield_header = "block text-left text-white font-montserrat text-[35px] mb-6 ml-[2rem] mt-[3rem] pt-[1.5rem]";
  const labelStyle = "block text-left text-white font-montserrat mb-1 text-[14px]";
  const parentInfoHeader  = "font-montserrat text-[25px] block text-left text-white mt-[2.7rem] ml-[2.5rem] mb-[1.5rem]"
  const parentlabelstyle = "block text-left text-white font-montserrat mb-1 text-[14px] ml-[2.5rem]"

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };


  const CreateProfContent = 
  <div className = "flex justify-center items-center">
     <div className="pb-9 pr-9 w-[90rem] flex-shrink-0">
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
                <div> <label htmlFor="firstname" className={labelStyle}>Firstname</label><input className={textfield} type="text" id="firstname" /></div>  
                <div><label htmlFor="lastname" className={labelStyle}>Lastname</label><input className={textfield} type="text" id="lastname" /></div>
                <div><label htmlFor="middlename" className={labelStyle}>Middlename</label><input className={textfield} type="text" id="middlename" /></div>
                <div><label htmlFor="suffix" className={labelStyle}>Suffix</label><input className={textfield} type="text" id="suffix"/></div>
                <div><label htmlFor="birthdate" className={labelStyle}>Birthdate</label><input className={textfield} type="date" id="birthdate" /></div>
                <div><label htmlFor="nationality" className={labelStyle}>Nationality</label><input className={textfield} type="text" id="nationality" /></div>
                <div><label htmlFor="religion" className={labelStyle}>Religion</label><input className={textfield} type="text" id="religion" /></div>
                <div><label htmlFor="height" className={labelStyle}>Height</label><input className={textfield} type="number" id="height" /></div>
                <div><label htmlFor="weight" className={labelStyle}>Weight</label><input className={textfield} type="number" id="weight" /></div>
                <div><label htmlFor="eyecol" className={labelStyle}>Eye Color</label><input className={textfield} type="text" id="eyecol" /></div>
                <div><label htmlFor="haircol" className={labelStyle}>Hair Color</label><input className={textfield} type="text" id="haircol" /></div>
            </div>

        </div>

        <h4 className = {parentInfoHeader}>Contact Information :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div><label htmlFor="telnum" className={labelStyle}>Telephone Number</label><input className={textfield} type="number" id="telnum" /></div>
            <div><label htmlFor="phonenum" className={labelStyle}>Phone Number</label><input className={textfield} type="number" id="phonenum" /></div>
            <div><label htmlFor="email" className={labelStyle}>Email</label><input className={textfield} type="text" id="email" /></div>
        </div>

        <h4 className = {parentInfoHeader}>Social Information :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div>
                <label htmlFor="education" className={labelStyle}>Education Level</label>
                <select className={textfield} id="education" name="education">
                    <option value="" disabled selected>Select</option>
                    <option value="elementary">Elementary</option>
                    <option value="highschool">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="doctorate">Doctorate</option>
                </select>
            </div>
            
            <div>
                <label htmlFor="gender" className={labelStyle}>Gender</label>
                <select className={textfield} id="gender" name="gender">
                    <option value="" disabled selected>Select</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                </select>
            </div>
            
            <div>
                <label htmlFor="marital-stat" className={labelStyle}>Marital Status</label>
                <select className={textfield} id="marital-stat" name="marital-stat">
                    <option value="" disabled selected>Select</option>
                    <option value="0">Single</option>
                    <option value="1">Married</option>
                    <option value="2">Divorced</option>
                    <option value="3">Widowed</option>
                </select>
            </div>
        </div>

        <h4 className = {parentInfoHeader}>Address :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div><label htmlFor="street" className={labelStyle}>Street</label><input className={textfield} type="text" id="street" /></div>
            <div><label htmlFor="barangay" className={labelStyle}>Barangay</label><input className={textfield} type="text" id="barangay" /></div>
            <div><label htmlFor="city" className={labelStyle}>City/Municipality</label><input className={textfield} type="text" id="city" /></div>
            <div><label htmlFor="province" className={labelStyle}>Province</label><input className={textfield} type="text" id="province" /></div>
            <div><label htmlFor="zip" className={labelStyle}>Zip Code</label><input className={textfield} type="number" id="zip" /></div>
        </div>

      </div>

       {/* ---------------------------------------------------------------- PARENT INFO------------------------------------------------------------------------------ */}

       <div className="bg-custom-blue rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
            <h2 className={txtfield_header}>PARENTS' INFORMATION</h2>
            <div id='mother-info'>
            <h3 className = {parentInfoHeader}>Mother's Info :</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div> <label htmlFor="firstname" className={parentlabelstyle}>Firstname</label><input className={textfield} type="text" id="firstname" /></div> 
              <div><label htmlFor="lastname" className={parentlabelstyle}>Lastname</label><input className={textfield} type="text" id="lastname" /></div>
              <div><label htmlFor="middlename" className={parentlabelstyle}>Middlename</label><input className={textfield} type="text" id="middlename" /></div>
              <div><label htmlFor="birthdate" className={parentlabelstyle}>Birthdate</label><input className={textfield} type="date" id="birthdate" /></div>
              <div><label htmlFor="phonenum" className={parentlabelstyle}>Phone Number</label><input className={textfield} type="number" id="phonenum" /></div>
              <div><label htmlFor="email" className={parentlabelstyle}>Email</label><input className={textfield} type="text" id="email" /></div>
            </div>

            <h4 className = "font-montserrat text-[18px] block text-left text-white mt-[2rem] ml-[2.5rem] mb-[1rem]">Occupation Details :</h4>
            <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div> <label htmlFor="occupation" className={parentlabelstyle}>Occupation</label><input className={textfield} type="text" id="occupation" /></div>
              <div><label htmlFor="employer" className={parentlabelstyle}>Employer</label><input className={textfield} type="text" id="employer" /></div>
              <div><label htmlFor="address" className={parentlabelstyle}>Address</label><input className={textfield} type="text" id="address" /></div>
              <div><label htmlFor="tel-fax" className={parentlabelstyle}>Tel/Fax</label><input className={textfield} type="number" id="tel-fax" /></div>
            </div>
            </div>


            <div id='father-info'>
            <h3 className = {parentInfoHeader}>Father's Info :</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label htmlFor="firstname" className={parentlabelstyle}>Firstname</label><input className={textfield} type="text" id="firstname" /></div>  
                <div><label htmlFor="lastname" className={parentlabelstyle}>Lastname</label><input className={textfield} type="text" id="lastname" /></div>
                <div><label htmlFor="middlename" className={parentlabelstyle}>Middlename</label><input className={textfield} type="text" id="middlename" /></div>
                <div><label htmlFor="birthdate" className={parentlabelstyle}>Birthdate</label><input className={textfield} type="date" id="birthdate" /></div>
                <div><label htmlFor="phonenum" className={parentlabelstyle}>Phone Number</label><input className={textfield} type="number" id="phonenum" /></div>
                <div><label htmlFor="email" className={parentlabelstyle}>Email</label><input className={textfield} type="text" id="email" /></div>
            </div>
            <h4 className = "font-montserrat text-[18px] block text-left text-white mt-[2rem] ml-[2.5rem] mb-[1rem]">Occupation Details :</h4>
            <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label htmlFor="occupation" className={parentlabelstyle}>Occupation</label><input className={textfield} type="text" id="occupation" /></div>  
                <div><label htmlFor="employer" className={parentlabelstyle}>Employer</label><input className={textfield} type="text" id="employer" /></div>
                <div><label htmlFor="address" className={parentlabelstyle}>Address</label><input className={textfield} type="text" id="address" /></div>
                <div><label htmlFor="tel-fax" className={parentlabelstyle}>Tel/Fax</label><input className={textfield} type="number" id="tel-fax" /></div>
            </div>
            </div>
         </div>

          {/* ------------------------------------------------------------------GUARDIAN INFO--------------------------------------------------------------------- */}
          <div className="bg-txt-color rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
            <h2 className={txtfield_header}>GUARDIAN/ CO-PARENT INFORMATION</h2>
            <div id='mother-info'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label htmlFor="firstname" className={parentlabelstyle}>Firstname</label><input className={textfield} type="text" id="firstname" /></div>  
                <div><label htmlFor="lastname" className={parentlabelstyle}>Lastname</label><input className={textfield} type="text" id="lastname" /></div>
                <div><label htmlFor="middlename" className={parentlabelstyle}>Middlename</label><input className={textfield} type="text" id="middlename" /></div>
                <div><label htmlFor="relationship" className={parentlabelstyle}>Relationship</label><input className={textfield} type="text" id="relationship" /></div>
                <div><label htmlFor="phonenum" className={parentlabelstyle}>Phone Number</label><input className={textfield} type="number" id="phonenum" /></div>
                <div><label htmlFor="email" className={parentlabelstyle}>Email</label><input className={textfield} type="text" id="email" /></div>
                <div><label htmlFor="homead" className={parentlabelstyle}>Home Address</label><input className="h-[2.5rem] w-[37rem] p-2 bg-white rounded-md text-txt-color font-montserrat text-[16px] border border-gray-300 ml-[2.5rem]" type="text" id="homead" /></div>
                </div>
            </div>
            </div>


            <div className="flex justify-end mt-[2rem] mb-[2rem]">
                <button className="w-[12rem] h-[2.5rem] bg-green-600 font-montserrat text-white text-[15px] rounded-md drop-shadow-md hover:bg-green-700 transition duration-200 justify-center" type="submit">Save</button>
                <button className="w-[12rem] h-[2.5rem] bg-red-900 font-montserrat text-white text-[15px] rounded-md ml-4 drop-shadow-md hover:bg-red-800 transition duration-200">Cancel</button>
            </div>

        </div>
  </div>

    return (CreateProfContent);
}

export default CreateProfile;



    