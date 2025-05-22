import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Phone, MapPin, CreditCard, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneValidator = /^\+?[0-9]{1,4}[\s-]?[0-9]{6,10}$/;
const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharValidator = /^[0-9]{12}$/;

// Flexible password strength checker
const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  const strength = score <= 1 ? 'weak' : score <= 3 ? 'medium' : score <= 4 ? 'strong' : 'very-strong';
  
  return { checks, score, strength, isValid: score >= 3 };
};

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"]
};

const FormComponent = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhar: ""
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ checks: {}, score: 0, strength: 'weak', isValid: false });

  useEffect(() => {
    validateForm();
  }, [form]);

  useEffect(() => {
    if (form.password) {
      setPasswordStrength(checkPasswordStrength(form.password));
    } else {
      setPasswordStrength({ checks: {}, score: 0, strength: 'weak', isValid: false });
    }
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!emailValidator.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (!passwordStrength.isValid) newErrors.password = "Password needs at least 3 of: 8+ chars, lowercase, uppercase, number, special character.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!phoneValidator.test(form.phone)) newErrors.phone = "Invalid phone format.";
    if (!form.country) newErrors.country = "Country is required.";
    if (!form.city) newErrors.city = "City is required.";
    if (!form.pan.trim()) newErrors.pan = "PAN number is required.";
    else if (!panValidator.test(form.pan)) newErrors.pan = "Invalid PAN number.";
    if (!form.aadhar.trim()) newErrors.aadhar = "Aadhar number is required.";
    else if (!aadharValidator.test(form.aadhar)) newErrors.aadhar = "Invalid Aadhar number.";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     console.log("form submitted", form)
    if (isFormValid) {
      navigate("/success", { state: form });
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-blue-500';
      case 'very-strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthWidth = (score) => {
    return `${(score / 5) * 100}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "First Name", name: "firstName", icon: User },
            { label: "Last Name", name: "lastName", icon: User },
            { label: "Username", name: "username", icon: User },
            { label: "Email", name: "email", type: "email", icon: Mail },
            { label: "Phone No.", name: "phone", icon: Phone },
            { label: "PAN No.", name: "pan", icon: CreditCard },
            { label: "Aadhar No.", name: "aadhar", icon: Shield }
          ].map(({ label, name, type = "text", icon: Icon }) => (
            <div key={name} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={type}
                  name={name}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
              {errors[name] && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>{errors[name]}</span>
                </div>
              )}
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={form.showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setForm({ ...form, showPassword: !form.showPassword })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {form.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {form.password && (
              <div className="space-y-2 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Password Strength</span>
                  <span className={`text-sm font-medium ${
                    passwordStrength.strength === 'weak' ? 'text-red-500' :
                    passwordStrength.strength === 'medium' ? 'text-yellow-500' :
                    passwordStrength.strength === 'strong' ? 'text-blue-500' :
                    'text-green-500'
                  }`}>
                    {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.strength)}`}
                    style={{ width: getStrengthWidth(passwordStrength.score) }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'length', label: '8+ characters' },
                    { key: 'lowercase', label: 'Lowercase' },
                    { key: 'uppercase', label: 'Uppercase' },
                    { key: 'number', label: 'Number' },
                    { key: 'special', label: 'Special char' }
                  ].map(({ key, label }) => (
                    <div key={key} className={`flex items-center space-x-1 ${passwordStrength.checks[key] ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${passwordStrength.checks[key] ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {errors.password && (
              <div className="flex items-center space-x-2 text-red-500 text-sm">
                <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Country</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  name="country" 
                  value={form.country} 
                  onChange={handleChange} 
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select Country</option>
                  {Object.keys(countries).map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              {errors.country && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>{errors.country}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  name="city" 
                  value={form.city} 
                  onChange={handleChange} 
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  disabled={!form.country}
                >
                  <option value="">Select City</option>
                  {(countries[form.country] || []).map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              {errors.city && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span>{errors.city}</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
              isFormValid 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            {isFormValid ? 'Create Account' : 'Complete All Fields'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account? 
            <button className="text-blue-500 hover:text-blue-600 font-medium ml-1">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;