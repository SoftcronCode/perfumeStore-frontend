// validation.js
export const validateFullname = (fullname) => {
  const onlyAlphabetsRegex = /^[A-Za-z]+$/;

  if (!onlyAlphabetsRegex.test(fullname)) {
    return "Full name must contain only alphabets";
  }
};

export const validateFirstName = (firstname) => {
  const onlyAlphabetsRegex = /^[A-Za-z]+$/;

  if (!onlyAlphabetsRegex.test(firstname)) {
    return "Full name must contain only alphabets";
  }
};

export const validateLastName = (lastname) => {
  const onlyAlphabetsRegex = /^[A-Za-z]+$/;

  if (!onlyAlphabetsRegex.test(lastname)) {
    return "Full name must contain only alphabets";
  }
};

export const validateEmail = (email) => {
  return !/^\S+@\S+\.\S+$/.test(email) ? "Invalid email address" : "";
};

export const validatePassword = (password) => {
  return password.length < 6
    ? "Password must be at least 6 characters long"
    : "";
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword !== password ? "Passwords do not match" : "";
};

export const validateMobileNumber = (mobileNumber) => {
  return !/^\d{10}$/.test(mobileNumber) ? "Invalid mobile number" : "";
};

export const validateZipCode = (zipCode) => {
  return !/^\d+$/.test(zipCode) ? "Please enter numeric characters only" : "";
};

export const validateArea = (area) => {
  return area.trim() === "" ? "This Area field is required" : "";
};

export const validateLandmark = (landmark) => {
  return landmark.trim() === "" ? "This Area field is required" : "";
};

export const validateHouseNo = (houseNo) => {
  return houseNo.trim() === "" ? "This Area field is required" : "";
};


