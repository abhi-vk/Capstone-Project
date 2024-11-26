import React, { useEffect, useState } from "react";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../services";
import styles from "./address.module.css";
import Navbar from "../../components/navbar";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing an address
  const [currentEditId, setCurrentEditId] = useState(null); // Store ID of address being edited
  const [formData, setFormData] = useState({
    name: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    isDefault: false,
  });

  // Fetch all addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add a new address
  const handleAddAddress = async () => {
    try {
      const data = await addAddress(formData);
      setAddresses((prevAddresses) => [...prevAddresses, data.address]);
      setShowModal(false);
      setFormData({
        name: "",
        addressLine: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        isDefault: false,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // Update an existing address
  // Update an existing address
  const handleUpdateAddress = async () => {
    try {
      const updatedAddress = await updateAddress(currentEditId, formData);

      // Update the local state with the new address data
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === currentEditId
            ? { ...address, ...updatedAddress }
            : data.address
        )
      );

      // Optionally keep the modal open with updated data
      setFormData(updatedAddress);

      // Close the modal
      setShowModal(false);
      setIsEditing(false);
      setCurrentEditId(null);

      // Automatically refresh the page to fetch latest data
      window.location.reload();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  // Delete an address
  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== id)
      );
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // Open the modal for editing and populate the form
  const handleEditClick = (address) => {
    setIsEditing(true);
    setCurrentEditId(address._id);
    setFormData({
      name: address.name,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <div className={styles.addressPage}>
        <h2>Your Addresses</h2>
        <div className={styles.addressContainer}>
          {addresses.length === 0 ? (
            <div
              className={styles.addAddressCard}
              onClick={() => setShowModal(true)}
            >
              <p>+ Add Address</p>
            </div>
          ) : (
            <>
              <div
                className={styles.addAddressCard}
                onClick={() => {
                  setIsEditing(false);
                  setShowModal(true);
                }}
              >
                <p>+ Add Address</p>
              </div>
              {addresses.map((address) => (
                <div key={address._id} className={styles.addressCard}>
                  <h4>
                    {address.name}
                    {address.isDefault && (
                      <span className="defaultBadge">(Default)</span>
                    )}
                  </h4>

                  <p>{address.addressLine}</p>
                  <p>
                    {address.city}, {address.state}, {address.postalCode}
                  </p>
                  <p>Phone: {address.phone}</p>
                  <button onClick={() => handleEditClick(address)}>Edit</button>
                  <button onClick={() => handleDeleteAddress(address._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {showModal && (
          <div className={styles.modal}>
            <h3>{isEditing ? "Edit Address" : "Add Address"}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isEditing ? handleUpdateAddress() : handleAddAddress();
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="addressLine"
                placeholder="Full Address"
                value={formData.addressLine}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Pin Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                />{" "}
                Set as default
              </label>
              <button type="submit">{isEditing ? "Update" : "Save"}</button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setCurrentEditId(null);
                  setFormData({
                    name: "",
                    addressLine: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    phone: "",
                    isDefault: false,
                  });
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressPage;
