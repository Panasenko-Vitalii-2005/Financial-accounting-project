import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const RegisterForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = "Email обов'язковий";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Невірний формат email";
    if (!form.username || form.username.length < 3)
      errs.username = "Мінімум 3 символи";
    if (!form.password || form.password.length < 6)
      errs.password = "Мінімум 6 символів";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const data = await authService.register(
        form.email,
        form.username,
        form.password,
      );
      login(data.access_token, data.user);
      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Помилка реєстрації";
      setErrors({ general: Array.isArray(msg) ? msg.join(", ") : msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
        placeholder="user@example.com"
        autoComplete="email"
      />
      <Input
        label="Ім'я користувача"
        type="text"
        value={form.username}
        onChange={handleChange("username")}
        error={errors.username}
        placeholder="johndoe"
        autoComplete="username"
      />
      <Input
        label="Пароль"
        type="password"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
        placeholder="••••••"
        autoComplete="new-password"
      />
      {errors.general && (
        <p className="text-sm text-neon-pink tracking-wide">{errors.general}</p>
      )}
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Зареєструватися
      </Button>
      <p className="text-center text-sm font-mono text-muted-foreground">
        Вже є акаунт?{" "}
        <Link to="/login" className="text-neon-cyan hover:underline">
          Увійти
        </Link>
      </p>
    </form>
  );
};
