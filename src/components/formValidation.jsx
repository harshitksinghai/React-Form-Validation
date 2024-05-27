import { Country } from 'country-state-city';

export default function validate(formData) {
    const errors = {};
    const namePattern = /^[a-zA-Z]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneNumberPattern = /^\d{10}$/;
    const panNoPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const aadharNoPattern = /^\d{12}$/;

    if (formData.firstName === "") {
        errors.firstName = "First Name is Required!";
    } else if (!namePattern.test(formData.firstName)) {
        errors.firstName = "Invalid First Name Format"
    }
    if (formData.lastName === "") {
        errors.lastName = "Last Name is Required!";
    } else if (!namePattern.test(formData.lastName)) {
        errors.lastName = "Invalid Last Name Format"
    }
    if (formData.username === "") {
        errors.username = "Username is Required!";
    } else if (!namePattern.test(formData.username)) {
        errors.username = "Invalid Username Format"
    }
    if (formData.email === "") {
        errors.email = "Email is Required";
    } else if (!emailPattern.test(formData.email)) {
        errors.email = "Invalid Email Format"
    }
    if (formData.password === "") {
        errors.password = 'Password is Required';
    } else if (!passwordPattern.test(formData.password)) {
        errors.password = "Invalid Password Format"
    }
    if (!validatePhoneCode(formData.phoneCode)) {
        errors.phoneCode = "Invalid Phone Code";
    }
    if(!phoneNumberPattern.test(formData.phoneNumber)){
        errors.phoneNumber = "Invalid Phone Number"
    }
    if (formData.country === "") {
        errors.country = "Country is Required!";
    }
    if (formData.city === "") {
        errors.city = "City is Required!";
    }
    if(!panNoPattern.test(formData.panNo.toUpperCase())){
        errors.panNo = "Invalid Pan Card Number"
    }
    if(!aadharNoPattern.test(formData.aadharNo)){
        errors.aadharNo = "Invalid Aadhar Card Number"
    }
    return errors;
}
function validatePhoneCode(code){
    const countries = Country.getAllCountries();
    console.log("countries: ", countries);
    return countries.some(country => country.phonecode === code);
}