const API_URL = process.env.REACT_APP_API_URL;

export const getUser = async () => {
  console.log("inside get user");
  console.log("API_URL", API_URL);
  try {
    const response = await fetch(`${API_URL}/users/1`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user (${response.status})`);
    }

    const data = await response.json();
    console.log("data is here", data);
    return data;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  console.log("inside getUserById");
  console.log("userId", userId);
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user (${response.status})`);
    }

    const data = await response.json();
    console.log("Profile data is here donkey", data);
    return data;
  } catch (error) {
    console.error("Error in getUserById", error);
    throw error;
  }
};

export const registerUser = async (
  username,
  email,
  password,
  confirmPassword
) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`failed to register user (${response.status})`);
    }
  } catch (error) {
    console.error("error in registerUser:", error);
    throw error;
  }
};

export const loginUser = async (usernameOrEmail, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username_or_email: usernameOrEmail,
        password: password,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`failed to log in user (${response.status})`);
    }
  } catch (error) {
    console.error("error in loginUser:", error);
    throw error;
  }
};

export const getUsersGameSessions = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/games`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.games;
    } else {
      throw new Error(`failed to log in user (${response.status})`);
    }
  } catch (error) {
    console.error("error in getGameSessions:", error);
    throw error;
  }
};

export const getGameSessionById = async (userId, gameId) => {
  try {
    console.log("userId, gameId:", userId, gameId)
    const response = await fetch(`${API_URL}/users/${userId}/games/${gameId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("API response data:", data);
      console.log("API response data.attributes.collected_states:", data.attributes.collected_states);
      return data;
      } else {
        throw new Error(`failed to fetch data (${response.status})`);
      }
  } catch (error) {
    console.error("error in getUsersGameById:", error);
    throw error;
  }
};
