import React, { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();
  const reg = useRegister();
  const [isConfirmPasswordCorrect, setIsConfirmPasswordCorrect] =
    useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmPasswordCorrect(true);
    if (form.password !== form.confirm)
      return setIsConfirmPasswordCorrect(false);
    reg.mutate({ name: form.name, email: form.email, password: form.password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <div className="space-y-4">
          <Input
            placeholder="Name"
            required
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            required
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            type="password"
            required
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
          <p className="text-sm text-red-600">
            {!isConfirmPasswordCorrect &&
              "Password & Confirm Password should match"}
          </p>
          {reg.isError && (
            <p className="text-sm text-red-600">
              {reg.error?.response?.data?.error + "" || "Registration failed."}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
