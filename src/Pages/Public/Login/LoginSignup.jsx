import React,{ useState, useContext } from "react"; // Remove 'React' from this import
import { useNavigate } from "react-router-dom";
// Example: update in your components
import { UserContext, UserProvider } from '../../../UserContext.jsx';
import "./LoginSignup.css";
import user_icon from "../../../assets/person.png";
import email_icon from "../../../assets/email.png";
import password_icon from "../../../assets/password.png";
import phone_icon from "../../../assets/phone.png"; 

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, loading: userContextLoading } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (action === "Login") {
      // Validate login fields
      if (!formData.phone || !formData.password) {
        setError("Please enter both phone number and password");
        return;
      }
      
      try {
        setLoading(true);
        
        // Call the backend API to verify login
        const response = await fetch(`http://localhost:8080/api/public/verifyLogin?phone=${encodeURIComponent(formData.phone)}&password=${encodeURIComponent(formData.password)}`);
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result === true) {
          // Login successful - call the login function from context
          // This will trigger the fetching of user details
          await login(formData.phone);
          
          // Redirect to home page
          navigate('/');
        } else {
          // Login failed
          setError("Invalid phone number or password");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Failed to connect to the server. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Sign Up logic would go here
      // For now just show a message
      alert("Sign up functionality will be implemented soon!");
    }
  };

  // Determine if we're in any loading state
  const isLoading = loading || userContextLoading;

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
              />
            </div>
          )}

          <div className="input">
            <img src={phone_icon || email_icon} alt="Phone Icon" />
            <input 
              type={action === "Login" ? "tel" : "email"}
              name={action === "Login" ? "phone" : "email"}
              value={action === "Login" ? formData.phone : formData.email}
              onChange={handleChange}
              placeholder={action === "Login" ? "Phone Number" : "Email Id"}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
            />
          </div>
        </div>

        {action === "Login" && (
          <div className="forgot-password">
            Lost password? <span>Click Here</span>
          </div>
        )}

        {isLoading && <div className="loading-spinner">Verifying...</div>}

        <div className="submit-container">
          <button
            type="button"
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => setAction("Sign Up")}
            disabled={isLoading}
          >
            Sign Up
          </button>

          <button
            type="submit"
            className={action === "Sign Up" ? "submit gray" : "submit"}
            disabled={isLoading}
          >
            {action === "Login" ? "Login" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
