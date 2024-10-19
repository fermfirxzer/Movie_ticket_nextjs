"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const { data: session } = useSession();
    if (session) redirect("/");

    const [login, setLogin] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [usernamelogin, setUsernamelogin] = useState("");
    const [emaillogin, setEmail] = useState("");
    const [passwordlogin, setPasswordlogin] = useState("");

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
            setError("Please add all inputs");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                username: usernamelogin,
                password: passwordlogin,
                redirect: false,
            })
            if (res.error) {
                setError("Invalid credentials");
                return;
            }
            router.replace("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="bg-black h-screen flex justify-center font-Kanit">
            <div className="bg-black h-[54rem] w-full md:w-3/4 lg:w-[40%] flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
                <div className="text-center mb-9">
                    <h1 className="text-red-600 text-9xl">M</h1>
                    <h1 className="text-red-600 text-2xl">Movie Ticket</h1>
                </div>
                <div className="w-full">
                    <div className="flex justify-center">
                        <span
                            className={`w-1/2 h-9 p-6 flex justify-center items-center rounded-t-lg   ${login ? 'bg-black' : 'bg-[#1B181A]'}`}
                            onClick={() => setLogin(true)}>
                            เข้าสู่ระบบ
                        </span>
                        <span
                            className={`w-1/2 h-9 p-6 flex justify-center items-center rounded-t-lg ${!login ? 'bg-black' : 'bg-[#1B181A]'}`}
                            onClick={() => setLogin(false)}
                        >
                            สมัครสมาชิก
                        </span>
                    </div>
                    <div className="">
                    {/*login form*/}
                    {login && (
                        <form onSubmit={handleLoginSubmit} className="text-white bg-[#1b181a] w-full flex flex-col justify-start h-[24rem]">
                            <label className="mx-6 mt-6 mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={usernamelogin}
                                onChange={(e) => setUsernamelogin(e.target.value)}
                                className="login-input"
                            />
                            <label className="mx-6 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={passwordlogin}
                                onChange={(e) => setPasswordlogin(e.target.value)}
                                className="login-input"
                            />
                            <div className="flex-grow"></div>
                            <button type="submit" className="login-btn">
                                เข้าสู่ระบบ
                            </button>
                            {error && <p className="text-red-600">{error}</p>}
                        </form>
                    )}

                    {/* Registration Form */}
                    {!login && (
                        <form onSubmit={handleSubmit} className="text-white bg-[#1b181a] w-full flex flex-col justify-center">
                            <label className="mx-6 mt-6 mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username || ""}
                                onChange={handleChange}
                                className="login-input"
                            />
                            <label className="mx-6 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                className="login-input"
                            />
                            <label className="mx-6 mb-2">Password</label>
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChange}
                                className="login-input"
                            />
                            <label className="mx-6 mb-2">Confirm Password</label>
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword || ""}
                                onChange={handleChange}
                                className="login-input"
                            />
                            <div className="mx-6">
                                <input
                                    type="checkbox"
                                    checked={showPass}
                                    onChange={(e) => setShowPass(e.target.checked)}
                                />
                                <label className="ml-4">Show Password</label>
                            </div>
                            <button type="submit" className="login-btn mt-12">
                                สมัครสมาชิก
                            </button>
                            {error && <p className="text-red-600">{error}</p>}
                        </form>
                    )}
                    </div>
                </div>
            </div>
        </main>
    );
}
