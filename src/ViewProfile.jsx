import { Link, useNavigate } from 'react-router-dom';
import {useRef, useState, useCallback, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';


function ViewProfile(){
    const location = useLocation();
    const {users} = location.state || {}; // Get data and image from location.state
    const profile = JSON.parse(users)



    const navigate = useNavigate();
    const textfield ="h-[2.5rem] w-[15rem] p-2 bg-white rounded-md text-txt-color font-montserrat text-[16px] border border-gray-300";
    const txtfield_header = "block text-left text-white font-montserrat text-[35px] mb-6 ml-[2rem] mt-[3rem] pt-[1.5rem]";
    const labelStyle = "block text-left text-white font-montserrat mb-1 text-[14px]";
    const parentInfoHeader  = "font-montserrat text-[25px] block text-left text-white mt-[2.7rem] ml-[2.5rem] mb-[1.5rem]"
    const parentlabelstyle = "block text-left text-white font-montserrat mb-1 text-[14px] ml-[2.5rem]"

    const handleBack = (e) => {        
          navigate('/');
      }

    const ProfileContent = 
  <div className = "flex justify-center items-center">
     <div className="pb-9 pr-9 w-[90rem] flex-shrink-0">
     <form autoComplete="on" encType="multipart/form-data" >
     <button type="button" onClick={handleBack} className="absolute top-5 left-5 font-montserrat text-white p-2 flex text-[20px] items-center"><ArrowLeftIcon className="w-5 h-5 mr-2" /> {/* Left Arrow Icon */}Back</button>     
     {/* ----------------------------------------------------------------------------PERSONAL INFO---------------------------------------------------------- */}

      <div className="bg-txt-color rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
        
        <h2 className={txtfield_header}>PERSONAL INFORMATION</h2>
        <h4 className = {parentInfoHeader}>Basic Information :</h4>

        <div className="grid grid-cols-1 md:grid-cols-[0.6fr_2fr] items-start">
            {/* Right column here */}
            <div className="mt-[3rem] flex justify-center items-center p-4">
                <img 
                src={profile.image}  // Assuming `profile.image` holds the image URL
                alt="Profile Picture" 
                className="rounded-md w-[250px]  h-[300px] object-cover border-4 border-gray-300" 
                />
            </div> 

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
                <div> <label className={labelStyle} htmlFor="firstname">Firstname* </label><input className={textfield} type="text" value = {profile.firstname} id="firstname" name="firstname" readOnly/></div>  
                <div><label className={labelStyle} htmlFor="lastname">Lastname*</label><input className={textfield} type="text" value = {profile.lastname} id="lastname" name="lastname" readOnly/></div>
                <div><label className={labelStyle} htmlFor="middlename">Middlename</label><input className={textfield} type="text" value = {profile.middlename} id="middlename" name="middlename" readOnly/></div>
                <div><label className={labelStyle} htmlFor="suffix">Suffix</label><input className={textfield} type="text" value = {profile.suffix} id="suffix"name="suffix" readOnly/></div>
                <div><label className={labelStyle} htmlFor="birthdate">Birthdate*</label><input className={textfield} type="text" value = {profile.birthdate} id="birthdate" name="birthdate" readOnly/></div>
                <div><label className={labelStyle} htmlFor="nationality">Nationality*</label><input className={textfield} type="text" value = {profile.nationality} id="nationality" name="nationality" readOnly/></div>
                <div><label className={labelStyle} htmlFor="religion">Religion*</label><input className={textfield} type="text" id="religion" value = {profile.religion} name="religion" readOnly/></div>
                <div><label className={labelStyle} htmlFor="height">Height*</label><input className={textfield} type="number" id="height"value = {profile.height}  name="height" readOnly/></div>
                <div><label className={labelStyle} htmlFor="weight">Weight*</label><input className={textfield} type="number" id="weight"  value = {profile.weight} name="weight" readOnly/></div>
                <div><label className={labelStyle} htmlFor="eyecol">Eye Color*</label><input className={textfield} type="text" id="eyecol" value = {profile.eye} name="eyecol" readOnly/></div>
                <div><label className={labelStyle} htmlFor="haircol">Hair Color*</label><input className={textfield} type="text" id="haircol" value = {profile.hair} name="haircol" readOnly/></div>
                <div><label className={labelStyle} htmlFor="occupation">Occupation</label><input className={textfield} type="text" id="occupation" value = {profile.occupation} name="occupation" readOnly/></div>
                <div><label className={labelStyle} htmlFor="pob">Place of Birth</label><input className={textfield} type="text" id="pob" value = {profile.pob} name="pob" readOnly/></div>

            </div>

        </div>

        <h4 className = {parentInfoHeader}>Contact Information :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div><label className={labelStyle} htmlFor="telnum">Telephone Number</label><input className={textfield} type="number" value = {profile.telnum} id="telnum" name="telnum" readOnly/></div>
            <div><label className={labelStyle} htmlFor="phonenum">Phone Number*</label><input className={textfield} type="number"  value = {profile.phonenum} id="phonenum" name="phonenum" readOnly/></div>
            <div><label className={labelStyle} htmlFor="email">Email*</label><input className={textfield} type="text" id="email" value = {profile.email} name="email" readOnly/></div>
        </div>

        <h4 className = {parentInfoHeader}>Social Information :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div>
                <label className={labelStyle} htmlFor="education">Education Level*</label>
                <input className={textfield} id="education" name="education" value = {profile.education} readOnly/>
            </div>
            
            <div>
                <label className={labelStyle} htmlFor="gender">Gender*</label>
                <input className={textfield} id="gender" name="gender" value = {profile.gender} readOnly/>
            </div>
            
            <div>
                <label className={labelStyle} htmlFor="maritalStat">Marital Status*</label>
                <input className={textfield} id="maritalStat" name="maritalStat" value = {profile.maritalstat} readOnly/>
            </div>
        </div>

        <h4 className = {parentInfoHeader}>Address :</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start ml-[3rem]">
            <div><label className={labelStyle} htmlFor="street">Street*</label><input className={textfield} type="text" id="street" value = {profile.stret} name="street" readOnly/></div>
            <div><label className={labelStyle} htmlFor="barangay">Barangay*</label><input className={textfield} type="text" id="barangay" value = {profile.barangay} name="barangay" readOnly/></div>
            <div><label className={labelStyle} htmlFor="city">City/Municipality*</label><input className={textfield} type="text" id="city" value = {profile.city} name="city" readOnly/></div>
            <div><label className={labelStyle} htmlFor="province">Province*</label><input className={textfield} type="text" id="province" value = {profile.province} name="province" readOnly/></div>
            <div><label className={labelStyle} htmlFor="zip">Zip Code*</label><input className={textfield} type="number" id="zip" value = {profile.zip} name="zip" readOnly/></div>
        </div>

      </div>

       {/* ---------------------------------------------------------------- PARENT INFO------------------------------------------------------------------------------ */}

       <div className="bg-custom-blue rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
            <h2 className={txtfield_header}>PARENTS' INFORMATION</h2>
            <div id='mother-info'>
            <h3 className = {parentInfoHeader}>Mother's Info :</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div> <label className={parentlabelstyle} htmlFor="m-firstname">Firstname*</label><input className={textfield} type="text" id="m-firstname" value = {profile.mFName} name="motherFirstname" readOnly/></div> 
              <div><label className={parentlabelstyle} htmlFor="m-lastname">Lastname*</label><input className={textfield} type="text" id="m-lastname" value = {profile.mLName} name="motherLastname" readOnly/></div>
              <div><label className={parentlabelstyle} htmlFor="m-middlename">Middlename</label><input className={textfield} type="text" id="m-middlename"  value = {profile.mMiddlename} name="motherMiddlename" readOnly/></div>
              <div><label className={parentlabelstyle} htmlFor="m-birthdate">Birthdate*</label><input className={textfield} type="date" id="m-birthdate" value = {profile.mBdate} name="motherDob" readOnly/></div>
              <div><label className={parentlabelstyle} htmlFor="m-phonenum">Phone Number*</label><input className={textfield} type="number" id="m-phonenum" value = {profile.mphonenum} name="motherContact" readOnly/></div>
              <div><label className={parentlabelstyle} htmlFor="m-email">Email</label><input className={textfield} type="text" id="m-email" name="motherEmail" value = {profile.mEmail} readOnly/></div>
             <div> <label className={parentlabelstyle} htmlFor="m-occupation">Occupation</label><input className={textfield} type="text" id="m-occupation" value = {profile.mOccupation} name="motherOccupation" readOnly/></div>
              <div><label className={parentlabelstyle} htmlFor="mpob">Place of Birth</label><input className={textfield} type="text" id="mpob" value = {profile.mpob} name="mpob" readOnly/></div>

            </div>
            </div>


            <div id='father-info'>
            <h3 className = {parentInfoHeader}>Father's Info :</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label className={parentlabelstyle} htmlFor="f-firstname">Firstname*</label><input className={textfield} type="text" id="f-firstname" value = {profile.fFName} name="fatherFirstname" readOnly/></div>  
                <div><label className={parentlabelstyle}  htmlFor="f-lastname">Lastname*</label><input className={textfield} type="text" id="f-lastname" value = {profile.fLName} name="fatherLastname" readOnly/></div>
                <div><label className={parentlabelstyle}  htmlFor="f-middlename">Middlename</label><input className={textfield} type="text" id="f-middlename" value = {profile.fMiddlename} name="fatherMiddlename" readOnly/></div>
                <div><label className={parentlabelstyle} htmlFor="f-birthdate">Birthdate*</label><input className={textfield} type="text" id="f-birthdate"value = {profile.fBdate}  name="fatherDob" readOnly/></div>
                <div><label className={parentlabelstyle}  htmlFor="f-phonenum">Phone Number*</label><input className={textfield} type="number" id="f-phonenum" value = {profile.fphonenum} name="fatherContact" readOnly/></div>
                <div><label className={parentlabelstyle} htmlFor="f-email">Email</label><input className={textfield} type="text" id="f-email" value = {profile.fEmail} name="fatherEmail" readOnly/></div>
                <div> <label className={parentlabelstyle} htmlFor="f-occupation">Occupation</label><input className={textfield} type="text" id="f-occupation"value = {profile.fOccupation}  name="fatherOccupation" readOnly/></div>  
                <div><label className={parentlabelstyle} htmlFor="fpob">Place of Birth</label><input className={textfield} type="text" id="fpob" name="fpob" value = {profile.fpob} readOnly/></div>
            </div>
            </div>
         </div>

          {/* ------------------------------------------------------------------GUARDIAN INFO--------------------------------------------------------------------- */}
          <div className="bg-txt-color rounded-lg shadow-lg pl-9 pb-9 pr-9 w-[90rem] flex-shrink-0">
            <h2 className={txtfield_header}>GUARDIAN/ CO-PARENT INFORMATION</h2>
            <div id='mother-info'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div> <label className={parentlabelstyle} htmlFor="g-firstname">Firstname*</label><input className={textfield} type="text" id="g-firstname" value = {profile.gFName} name="guardianFirstname" readOnly/></div>  
                <div><label className={parentlabelstyle}  htmlFor="g-lastname">Lastname*</label><input className={textfield} type="text" id="g-lastname"  value = {profile.gLName} name="guardianLastname" readOnly/></div>
                <div><label className={parentlabelstyle}  htmlFor="g-middlename">Middlename</label><input className={textfield} type="text" id="g-middlename" value = {profile.gMiddlename} name="guardianMiddlename" readOnly/></div>
                <div><label className={parentlabelstyle}  htmlFor="relationship">Relationship*</label><input className={textfield} type="text" id="relationship" value = {profile.gRelationship} name="guardianRelationship" readOnly/></div>
                <div><label className={parentlabelstyle}  htmlFor="g-phonenum">Phone Number*</label><input className={textfield} type="number" id="g-phonenum" value = {profile.phonenum} name="guardianContact" readOnly/></div>
                <div><label className={parentlabelstyle}  htmlFor="g-email">Email</label><input className={textfield} type="text" id="g-email" name="guardianEmail" value = {profile.gEmail} readOnly/></div>
                <div><label className={parentlabelstyle}  htmlFor="homead">Home Address*</label><input className="h-[2.5rem] w-[37rem] p-2 bg-white rounded-md text-txt-color font-montserrat text-[16px] border border-gray-300 ml-[2.5rem]" type="text" id="homead" value = {profile.gHomeAdd} name="guardianHomeAddr" readOnly/></div>
                </div>
            </div>
            </div>
            </form>

        </div>
  </div>

    return (ProfileContent);
}

export default ViewProfile