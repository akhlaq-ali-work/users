import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const login = useLogin();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password: pw });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            required
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          {login.isError && (
            <p className="text-sm text-red-600">Incorrect Credentials</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
