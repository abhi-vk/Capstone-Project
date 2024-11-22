import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import toast from "react-hot-toast";
import { register } from "../../services";
import Footer from "../../components/footer";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: null,
    name: null,
    phone: null,
    password: null,
  });



  const handleRegister = async (e) => {
    e.preventDefault();
    let errors = false;

    // Reset errors
    setFormErrors({ email: null, name: null, phone: null, password: null });

    // Validate form data
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      errors = true;
    }
    if (!formData.name.trim()) {
      setFormErrors((prev) => ({ ...prev, name: "Name is required" }));
      errors = true;
    }
    if (formData.phone.length < 10) {
      setFormErrors((prev) => ({ ...prev, phone: "Invalid phone number" }));
      errors = true;
    }
    if (formData.password.length < 8) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
      errors = true;
    }

    if (errors) return;

    try {
      setLoading(true);
      const response = await register(formData);

      // Save user info to localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.id);
      localStorage.setItem("name", formData.name);

      toast.success(response.message);
      navigate("/"); // Redirect to homepage
    } catch (error) {
      toast.error("Registration failed. Please try again.");
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
          <div className={styles.content}>
            <img src="/assets/LOGO 1.png" alt="Order Logo" className={styles.logo} />
            <h2 className={styles.welcome}>Create an account 👋</h2>
            <p className={styles.subtitle}>Your personal job finder is here.</p>
            <form className={styles.form} onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}

              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {formErrors.phone && <p className={styles.error}>{formErrors.phone}</p>}

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <div className={styles.footer}>
              <p>
                Already have an account?{" "}
                <a href="/login" className={styles.link}>
                  Sign in
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
      <Footer />
    </>
  );
}
