const BACKEND_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")
export const register = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status === 200 || response.status === 400) {
        return response.json()
    }
    throw new Error('Something went wrong')
}

export const login = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
            
        },
        body: JSON.stringify(data)
    })
    if (response.status === 200 || response.status === 400) {
        return response.json()
    }
    throw new Error('Something went wrong')
}


// Function to get all categories
export const getCategories = async () => {
    const response = await fetch(`${BACKEND_URL}/api/food/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 200) {
        return response.json();  // Return categories data
    }
    throw new Error('Error fetching categories');
};

// Function to get food items by category ID
export const getFoodItemsByCategory = async (categoryId) => {
    const response = await fetch(`${BACKEND_URL}/api/food/items/${categoryId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 200) {
        return response.json();  // Return food items for the category
    }
    throw new Error('Error fetching food items');
};


// Fetch all addresses
export const getAddresses = async () => {
  const response = await fetch(`${BACKEND_URL}/api/addresses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Error fetching addresses');
};

// Add a new address
export const addAddress = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 201) {
    return response.json();
  }
  throw new Error('Error adding address');
};

// Update an existing address
export const updateAddress = async (id, data) => {
  const response = await fetch(`${BACKEND_URL}/api/addresses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Error updating address');
};

// Delete an address
export const deleteAddress = async (id) => {
  const response = await fetch(`${BACKEND_URL}/api/addresses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Error deleting address');
};
// Fetch all restaurants
export const getRestaurants = async () => {
  const response = await fetch(`${BACKEND_URL}/api/restaurants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    return response.json(); // Return restaurants data
  }
  throw new Error('Error fetching restaurants');
};

export const addCard = async (cardDetails) => {
  const response = await fetch(`${BACKEND_URL}/api/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(cardDetails)
  });
  if (response.status === 201) {
    return response.json(); // Return newly added card
  }
  throw new Error('Error adding card');
};

// Fetch all cards for the user
export const getCards = async () => {
  const response = await fetch(`${BACKEND_URL}/api/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (response.status === 200) {
    return response.json(); // Return all cards
  }
  throw new Error('Error fetching cards');
};

// Edit a card
export const updateCard = async (id, updatedDetails) => {
  const response = await fetch(`${BACKEND_URL}/api/cards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(updatedDetails)
  });
  if (response.status === 200) {
    return response.json(); // Return updated card details
  }
  throw new Error('Error updating card');
};

// Delete a card
export const deleteCard = async (id) => {
  const response = await fetch(`${BACKEND_URL}/api/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (response.status === 200) {
    return response.json(); // Return confirmation of deletion
  }
  throw new Error('Error deleting card');
};