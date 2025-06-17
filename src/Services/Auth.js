
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const Auth = {
    login: async (email, password) => {
        // Replace this with your actual backend endpoint
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return data;
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem(TOKEN_KEY);
    },
};

export default Auth;
