import { Link, useNavigate } from 'react-router-dom';
import {useRef, useState, useCallback, useEffect} from 'react'


function ViewProfile(){
    const navigate = useNavigate();


    const ProfileContent = <div>
        <p>Test</p>
    </div>

    return (ProfileContent);
}

export default ViewProfile