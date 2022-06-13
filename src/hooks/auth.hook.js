import {useCallback, useEffect, useState} from "react";

const storageName = "userData";

const useAuth = () => {
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    const login = useCallback((id, email, token, role) => {
        setId(id);
        setEmail(email);
        setToken(token);
        setRole(role);

        localStorage.setItem(storageName, JSON.stringify({id, email, token, role}));
    }, []);

    const logout = useCallback(() => {
        setId(null);
        setEmail(null);
        setToken(null);
        setRole(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.id, data.email, data.token, data.role);
        }
    }, [login]);

    return {
        id,
        email,
        token,
        role,
        login,
        logout
    }
}

export default useAuth;