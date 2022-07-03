import {useCallback, useEffect, useState} from "react";

const storageName = "user";

const useAuth = () => {
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    const login = useCallback((id, token, role) => {
        setId(id);
        setToken(token);
        setRole(role);

        localStorage.setItem(storageName, JSON.stringify({token}));
    }, []);

    const logout = useCallback(() => {
        setId(null);
        setToken(null);
        setRole(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.id, data.token, data.role);
        }
    }, [login]);

    return {
        id,
        token,
        role,
        login,
        logout
    }
}

export default useAuth;