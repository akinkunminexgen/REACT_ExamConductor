
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const USER_ROLE = "Admin";

const Auth = {
    login: async (email, password) => {
        // Replace this with your actual backend endpoint
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include" //to send jwt token inorder to elimante the use of token here
        });
        if (!response.ok) throw new Error("Login failed");        

        const data = await response.json();
        //localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        localStorage.setItem(USER_ROLE, JSON.stringify(data.role));
        return data;
    },

    logout: () => {
        //localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(USER_ROLE);
    },

   /* getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },*/

    getCurrentUser: () => {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    getRole: () => {
        const role = localStorage.getItem(USER_ROLE);
        return role ? JSON.parse(role) : null;
    },

    isAuthenticated: async () => {
        try {
            const res = await fetch("/api/auth/me", {
                method: "GET",
                credentials: "include", // sends cookie
            });

            if (!res.ok) return false;

            return true;
        } catch (err) {
            return false;
        }

        //return !!localStorage.getItem(TOKEN_KEY);
    },
};

export default Auth;
