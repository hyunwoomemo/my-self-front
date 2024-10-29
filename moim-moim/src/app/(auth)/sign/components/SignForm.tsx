// app/auth/Sign/components/SignForm.tsx
import React, { useState } from "react";

interface SignFormProps {
  onSign: (email: string, password: string) => void;
}

const SignForm: React.FC<SignFormProps> = ({ onSign }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSign(email, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign</button>
    </form>
  );
};

export default SignForm;
