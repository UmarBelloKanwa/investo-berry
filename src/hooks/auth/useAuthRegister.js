import * as React from "react";

export default function useAuthRegister() {
    const initialData = {
        fullName: "",
        email: "",
        country: null,
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    };

    const [registerData, setRegisterData] = React.useState({
        data: initialData,
        helperText: { ...initialData }
    });

    const validateInput = (key, value) => {
        switch (key) {
            case 'fullName':
                return value.trim().length < 3 ? "Full name must be at least 3 characters." : "";
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";
            case 'country':
                return !value || typeof value !== 'object' || !value.label
                    ? "Country is required."
                    : "";
            case 'phoneNumber':
                return /^\+?[0-9]{7,15}$/.test(value) ? "" : "Enter a valid phone number.";
            case 'password':
                return value.length < 6 ? "Password must be at least 6 characters." : "";
            case 'confirmPassword':
                // Access password from current state
                return value !== registerData.data.password ? "Passwords do not match." : "";
            default:
                return "";
        }
    };

    const handleSetRegisterData = (key, value) => {
        const helperMessage = validateInput(key, value);
        setRegisterData((prev) => ({
            data: {
                ...prev.data,
                [key]: value
            },
            helperText: {
                ...prev.helperText,
                [key]: helperMessage
            }
        }));
    };

    return {
        registerData,
        handleSetRegisterData
    };
}
