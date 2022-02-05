import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios.js';

function ApiTest() {

    const [devInfo, setDevInfo] = useState([]);

    const fetchDevInfo = async () => {
        const result = await axiosInstance.get('developers/');
        setDevInfo(result.data);
    }
    
    useEffect(() => {
        fetchDevInfo();
    }, [])

    return (
        <div>
            <div>
                {devInfo.map(dev => {
                    return (
                        <p>{dev.name}</p>
                    )
                })}
            </div>
        </div>
    );
}

export default ApiTest;