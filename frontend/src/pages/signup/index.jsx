import { useState } from "react"
import styles from "./signup.module.css"
import toast from "react-hot-toast"
import { register } from "../../services"
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
        <div>
            <header>
                <h1>Create an account</h1>
                <h3>Your personal job finder is here</h3>
            </header>
            <form className={styles.form} onSubmit={handleRegister}>
                <input value={formData.email} type="text" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
                <input value={formData.name} type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
                <input value={formData.phone} type="text" placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                {formErrors.phone && <p className={styles.error}>{formErrors.phone}</p>}
                <input value={formData.password} type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
                <div>
                    <input type="checkbox" name="tos" id="tos" />
                    <label htmlFor="tos">I agree to the Terms and Conditions</label>
                </div>
                <button disabled={loading} type="submit">{loading ? "Loading..." : "Sign Up"}</button>
            </form>
        </div>
    )
}