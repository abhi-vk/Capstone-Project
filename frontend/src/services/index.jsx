const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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
            'Content-Type': 'application/json'
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
