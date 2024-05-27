import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { Country, City } from 'country-state-city';
import validate from './formValidation.jsx';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        phoneCode: "",
        phoneNumber: "",
        country: "",
        city: "",
        panNo: "",
        aadharNo: ""
    });

    const [countryCode, setCountryCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [countryObj, setCountryObj] = useState(null);
    const [cityObj, setCityObj] = useState(null);
    const [errors, setErrors] = useState({});


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleCountryChange = (selectedOption) => {
        const code = selectedOption ? selectedOption.value : '';
        setCountryCode(code);
        setFormData((prevFormData) => ({
            ...prevFormData,
            country: selectedOption.label,
            city: ""
        }));
        setCountryObj(selectedOption);
        setCityObj(null);
    };

    const handleCityChange = (selectedOption) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            city: selectedOption.label
        }));
        setCityObj(selectedOption);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validate(formData);
        console.log("formErrors:", formErrors);
        if (Object.keys(formErrors).length === 0) {
            navigate('/home', {
                state: { formData }
            });
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block">First Name:</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.firstName && <p className="text-red-700">{errors.firstName}</p>}
                </div>

                <div>
                    <label htmlFor="lastName" className="block">Last Name:</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type='text'
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.lastName && <p className="text-red-700">{errors.lastName}</p>}
                </div>

                <div>
                    <label htmlFor="username" className="block">Username:</label>
                    <input
                        id="username"
                        name="username"
                        type='text'
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.username && <p className="text-red-700">{errors.username}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type='email'
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.email && <p className="text-red-700">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block">Password:</label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md pl-3 py-2 pr-10 w-full focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-2 text-gray-500"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        {errors.password && <p className="text-red-700">{errors.password}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="phoneCode" className="block">Phone Code:</label>
                    <input
                        id="phoneCode"
                        name="phoneCode"
                        type='text'
                        placeholder="Phone Code"
                        value={formData.phoneCode}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.phoneCode && <p className="text-red-700">{errors.phoneCode}</p>}
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block">Phone Number:</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type='text'
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.phoneNumber && <p className="text-red-700">{errors.phoneNumber}</p>}
                </div>

                <div>
                    <label htmlFor="country" className="block">Country:</label>
                    <Select
                        value={countryObj}
                        onChange={handleCountryChange}
                        options={Country.getAllCountries().map((country) => ({
                            value: country.isoCode,
                            label: country.name
                        }))}
                        placeholder="Select country"
                    />
                    {errors.country && <p className="text-red-700">{errors.country}</p>}
                </div>

                <div>
                    <label htmlFor="city" className="block">City:</label>
                    <Select
                        value={cityObj}
                        onChange={handleCityChange}
                        options={
                            countryCode
                                ? City.getCitiesOfCountry(countryCode).map((city) => ({
                                    value: city.name,
                                    label: city.name
                                }))
                                : []
                        }
                        placeholder="Select city"
                        isDisabled={!countryCode}
                    />
                    {errors.city && <p className="text-red-700">{errors.city}</p>}
                </div>


                <div>
                    <label htmlFor="panNo" className="block">Pan No:</label>
                    <input
                        id="panNo"
                        name="panNo"
                        type='text'
                        placeholder="Pan No"
                        value={formData.panNo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.panNo && <p className="text-red-700">{errors.panNo}</p>}
                </div>

                <div>
                    <label htmlFor="aadharNo" className="block">Aadhar No:</label>
                    <input
                        id="aadharNo"
                        name="aadharNo"
                        type='text'
                        placeholder="Aadhar No"
                        value={formData.aadharNo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {errors.aadharNo && <p className="text-red-700">{errors.aadharNo}</p>}
                </div>

                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
