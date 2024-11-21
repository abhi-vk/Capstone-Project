import { useState } from "react"
import styles from "./signup.module.css"
import toast from "react-hot-toast"
import { register } from "../../services"
import Footer from "../../components/footer";
export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: null,
        name: null,
        phone: null,
        password: null,
    })
    const handleRegister = async (e) => {
        e.preventDefault()
        let errors = false;
        setFormErrors((formErrors) => { return { ...formErrors, email: null, name: null, phone: null, password: null } })
        if (!formData.email || formData.email.length < 1 || !formData.email.includes("@") || !formData.email.includes(".")) {
            setFormErrors((formErrors) => { return { ...formErrors, email: "Email is invalid" } })
            errors = true
        }
        if (!formData.name || formData.name.length === 0) {
            setFormErrors((formErrors) => { return { ...formErrors, name: "Name is required" } })
            errors = true
        }
        if (!formData.phone || formData.phone.length < 10) {
            setFormErrors((formErrors) => { return { ...formErrors, phone: "Phone number is invalid" } })
            errors = true
        }
        if (!formData.password) {
            setFormErrors((formErrors) => { return { ...formErrors, password: "Password is required" } })
            errors = true
        }
        if (errors) {
            return
        }
        try {
            setLoading(() => true)
            const response = await register(formData)
            toast.success(response.message)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(() => false)
        }
    }
    return (
        <>
        
        <div className={styles.container}>
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
  
        <div className={styles.rightPane}>
          <img
            src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172412/foodapp-images/zmhplbpjkkyor9xavngo.png"
            alt="Delicious Burgers"
            className={styles.image}
          />
        </div>
      </div>
      <Footer/>
      </>
    )
}