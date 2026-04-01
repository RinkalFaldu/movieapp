import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignupPage() {
  const { isAuthenticated, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function handleSignup(formValues) {
    await signup(formValues);
    navigate("/", { replace: true });
  }

  return (
    <AuthForm
      title="Create your profile"
      submitLabel="Sign up"
      includeName
      onSubmit={handleSignup}
      footer={
        <>
          Already a member? <Link to="/login">Login instead</Link>
        </>
      }
    />
  );
}
