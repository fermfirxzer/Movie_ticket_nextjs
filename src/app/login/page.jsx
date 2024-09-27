"use client";
import { useState } from "react";

export default function Login() {
    const [login, setLogin] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;
    
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
    
        if (!username || !email || !password || !confirmPassword) {
            setError("Please add all inputs");
            return;
        }
    
        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email }),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                setError("");
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <main className="bg-black h-screen flex justify-center items-center font-Kanit">
            <div className="bg-black border border-white h-[54rem] w-full md:w-3/4 lg:w-2/4 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
                <div className="text-center mb-9">
                    <h1 className="text-red-600 text-9xl">M</h1>
                    <h1 className="text-red-600 text-2xl">Movie Ticket</h1>
                </div>

                <form onSubmit={handleSubmit} className="text-white bg-[#1b181a] rounded-2xl h-3/4 w-full md:w-full lg:w-3/4">
                    <div className="flex justify-center w-full">
                        <span
                            className={`w-1/2 h-9 p-6 flex justify-center items-center rounded-lg ${login ? 'bg-black' : ''}`}
                            onClick={() => setLogin(true)}
                        >
                            เข้าสู่ระบบ
                        </span>
                        <span
                            className={`w-1/2 h-9 p-6 flex justify-center items-center ${!login ? 'bg-black' : ''}`}
                            onClick={() => setLogin(false)}
                        >
                            สมัครสมาชิก
                        </span>
                    </div>
                    <div className="flex flex-col justify-center">
                        {login ? (
                            <>
                                <label className="mx-6 mt-6 mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username || ""}
                                    onChange={handleChange}
                                    className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"
                                />
                                <label className="mx-6 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password || ""}
                                    onChange={handleChange}
                                    className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"
                                />
                                <button type="submit" className="bg-red-900 rounded-2xl w-[90%] py-1 mx-6 mt-5">
                                    เข้าสู่ระบบ
                                </button>
                            </>
                        ) : (
                            <>
                                <label className="mx-6 mt-6 mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username || ""}
                                    onChange={handleChange}
                                    className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"
                                />
                                <label className="mx-6 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"
                                />
                                <label className="mx-6 mb-2">Password</label>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password || ""}
                                    onChange={handleChange}
                                    className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"
                                />
                                <label className="mx-6 mb-2">Confirm Password</label>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword || ""}
                                    onChange={handleChange}
                                    className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"
                                />
                                <div className="mx-6">
                                    <input
                                        type="checkbox"
                                        checked={showPass}
                                        onChange={(e) => setShowPass(e.target.checked)}
                                    />
                                    <label className="ml-4">Show Password</label>
                                </div>
                                <button type="submit" className="bg-red-900 rounded-2xl w-[90%] py-1 mx-6 mt-5">
                                    สมัครสมาชิก
                                </button>
                                {error && <p className="text-red-600">{error}</p>}
                            </>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}
