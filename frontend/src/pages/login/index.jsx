import { useState } from "react";
import styles from "./login.module.css"; // Updated CSS file
import toast from "react-hot-toast";
import { login } from "../../services";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    let errors = false;

    // Reset errors
    setFormErrors({ email: null, password: null });

    // Validate email
    if (!formData.email || !formData.email.includes("@") || !formData.email.includes(".")) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      errors = true;
    }

    // Validate password
    if (!formData.password || formData.password.length < 5) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters.",
      }));
      errors = true;
    }

    if (errors) return;

    try {
      setLoading(true);
      const response = await login(formData);
      toast.success(response.message);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("name", response.name); // Save user's name
        localStorage.setItem("email", response.email || formData.email);

        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
  {/* Left Pane */}
  <div className={styles.leftPane}>
    <div className={styles.centerContent}>
      <img
        src="/assets/LOGO 1.png"
        alt="Order App Logo"
        className={styles.logo}
      />
      <h2 className={styles.welcome}>Welcome Back 👋</h2>
      <p className={styles.subtitle}>
        Today is a new day. It's your day. You shape it. Sign in to start ordering.
      </p>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formErrors.email && (
          <p className={styles.error}>{formErrors.email}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {formErrors.password && (
          <p className={styles.error}>{formErrors.password}</p>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign in"}
        </button>
      </form>
      <div className={styles.footer}>
        <p>
          Don't have an account?{" "}
          <a href="/register" className={styles.link}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>

  {/* Right Pane */}
  <div className={styles.rightPane}>
    <img
      src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172412/foodapp-images/zmhplbpjkkyor9xavngo.png"
      alt="Delicious Burgers"
      className={styles.image}
    />
  </div>
</div>




    </>
  );
}
