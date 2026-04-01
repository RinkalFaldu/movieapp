import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function handleLogin(formValues) {
    await login(formValues);
    navigate(location.state?.from || "/", { replace: true });
  }

  return (
    <AuthForm
      title="Welcome back"
      submitLabel="Login"
      emailLabel="Email or username"
      emailInputType="text"
      onSubmit={handleLogin}
      footer={
        <>
          New here? <Link to="/signup">Create an account</Link>
        </>
      }
    />
  );
}
