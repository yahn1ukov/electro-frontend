import {useCallback, useEffect, useState} from "react";

const userInfo = "user";

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    const login = useCallback((token, role) => {
        setToken(token);
        setRole(role);

        localStorage.setItem(userInfo, JSON.stringify({token, role}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setRole(null);

        localStorage.removeItem(userInfo);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userInfo));

        if (data && data.token && data.role) {
            login(data.token, data.role);
        }
    }, [login]);

    return {
        token,
        role,
        login,
        logout
    }
}

export default useAuth;