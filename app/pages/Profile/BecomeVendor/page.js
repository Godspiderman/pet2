'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function VendorPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        shopName: '',
        contactDetails: '',
        taxId: '',
        registrationNumber: '',
        activeStatus: true, 
        userId: '1',
        address: '',
        city: '',
        createdDate: new Date().toISOString(), 
        modifiedDate: new Date().toISOString(), 
        countryId: '', 
        stateId: '',
    });

    const [errors, setErrors] = useState({});
    const [countryData, setCountryData] = useState([]); 
    const [stateData, setStateData] = useState([]);

    useEffect(() => {
        fetchCountryData();
        fetchStateData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/public/country/getAll');
            const data = await response.json();
            setCountryData(data);
            console.log('Country Data:', data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchStateData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/public/state/getAll');
            const data = await response.json();
            setStateData(data);
            console.log('State Data:', data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updatedFormData = { ...prev };

            if (name === "countryId") {
                updatedFormData.countryId = value;
                updatedFormData.stateId = ""; 
            } else if (name === "stateId") {
                updatedFormData.stateId = value;
            } else {
                updatedFormData[name] = value;
            }

            return updatedFormData;
        });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };


    const handleCancel = () => {
        router.push("/pages/Profile");
    };

    const validate = () => {
        const newErrors = {};

        // Check for empty fields
        Object.keys(formData).forEach((field) => {
            if (!formData[field] && field !== 'contactDetails' && field !== 'activeStatus') {
                newErrors[field] = 'Please fill this field.';
            }
        });

        if (!formData.countryId) {
            newErrors.countryId = 'Please select a country.';
        }

        if (!formData.stateId) {
            newErrors.stateId = 'Please select a state.';
        }

        // if (!formData.userId) {
        //     newErrors.userId = 'Please fill this field.';
        // }

        // else if (formData.userId !== '1') {
        //     newErrors.userId = 'User ID must be 1.';
        // }

        if (!formData.contactDetails) {
            newErrors.contactDetails = 'Please fill this field.';
        }

        else if (formData.contactDetails && !/^\d{10}$/.test(formData.contactDetails)) {
            newErrors.contactDetails = 'Contact number must be exactly 10 digits.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/public/vendor/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Vendor added successfully!');
                setFormData({
                    shopName: '',
                    contactDetails: '',
                    taxId: '',
                    registrationNumber: '',
                    activeStatus: true,
                    userId: '',
                    address: '',
                    city: '',
                    createdDate: new Date().toISOString(),
                    modifiedDate: new Date().toISOString(),
                    countryId: '',
                    stateId: '',
                });
                router.push("/pages/Profile");
            } else {
                alert('Failed to add vendor. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the vendor.');
        }
    };


    return (
        <div className='vendorpage'>
            <div className='vendorpage-container'>
                <div className='vendorpage-contents'>

                    <div className='vendorpage-head'>
                        <h2>Become a Vendor</h2>
                    </div>

                    <div className='pet-page-contents'>

                        <div className='pet-page-content'>
                            <form onSubmit={handleSubmit}>
                                <div className='content1-form'>
                                    <div className='content1-form-inputs'>
                                        <div className="form2">
                                            <label>Shop Name</label>
                                            <input
                                                className="content-input"
                                                name="shopName"
                                                type="text"
                                                placeholder="Enter shop name"
                                                value={formData.shopName}
                                                onChange={handleInputChange}
                                            />
                                            {errors.shopName && <span className="error-text">{errors.shopName}</span>}
                                        </div>
                                        <div className="form2">
                                            <label>Contact Number</label>
                                            <input
                                                className="content-input"
                                                name="contactDetails"
                                                placeholder="Enter contact number"
                                                value={formData.contactDetails}
                                                onChange={handleInputChange}
                                            />
                                            {errors.contactDetails && <span className="error-text">{errors.contactDetails}</span>}
                                        </div>
                                    </div>
                                
                                    <div className='content1-form-inputs'>
                                        <div className="form2">
                                            <label>Tax Id</label>
                                            <input
                                                className="content-input"
                                                name="taxId"
                                                placeholder="Enter tax id"
                                                value={formData.taxId}
                                                onChange={handleInputChange}
                                            />
                                            {errors.taxId && <span className="error-text">{errors.taxId}</span>}
                                        </div>
                                        <div className="form2">
                                            <label>Registration Number</label>
                                            <input
                                                className="content-input"
                                                name="registrationNumber"
                                                placeholder="Enter reg number"
                                                value={formData.registrationNumber}
                                                onChange={handleInputChange}
                                            />
                                            {errors.registrationNumber && <span className="error-text">{errors.registrationNumber}</span>}
                                        </div>
                                    </div>

                                    <div className='content1-form-inputs'>
                                        <div className="form2">
                                            <label>City</label>
                                            <input
                                                className="content-input"
                                                name="city"
                                                placeholder="Enter city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                            />
                                            {errors.city && <span className="error-text">{errors.city}</span>}
                                        </div>
                                        <div className="form2">
                                            <label>Address</label>
                                            <input
                                                className="content-input"
                                                name="address"
                                                placeholder="Enter Address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                            />
                                            {errors.address && <span className="error-text">{errors.address}</span>}
                                        </div>

                                    </div>

                                    <div className='content1-form-inputs'>
                                        <div className="form1">
                                            <label>Country</label>
                                            <select
                                                name="countryId"
                                                value={formData.countryId}
                                                onChange={handleInputChange}
                                                className={`content-input ${errors.countryId ? 'error' : ''}`}
                                            >
                                                <option value="">Select Country</option>
                                                {countryData.map((country) => (
                                                    <option key={country.id} value={country.id}>
                                                        {country.countryName}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.countryId && <span className="error-text">{errors.countryId}</span>}
                                        </div>
                                        <div className="form1">
                                            <label>State</label>
                                            <select
                                                name="stateId"
                                                value={formData.stateId}
                                                onChange={handleInputChange}
                                                className={`content-input ${errors.stateId ? 'error' : ''}`}
                                            >
                                                <option value="">Select State</option>
                                                {stateData
                                                    .filter((state) => state.countryId === parseInt(formData.countryId))
                                                    .map((state) => (
                                                        <option key={state.id} value={state.id}>
                                                            {state.stateName}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.stateId && <span className="error-text">{errors.stateId}</span>}

                                        </div>
                                    </div>


                                    <div className="btn-container">
                                        <div className='content-btn'>
                                            <button type="button" className="cancel-btn" onClick={handleCancel}>
                                                Cancel
                                            </button>
                                            <button type="submit" className="update-btn">
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorPage;
