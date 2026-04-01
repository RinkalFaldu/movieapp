import { useState } from "react";

const emptyState = {
  name: "",
  email: "",
  password: "",
};

export default function AuthForm({
  title,
  submitLabel,
  includeName = false,
  emailLabel = "Email",
  emailInputType = "email",
  onSubmit,
  footer,
}) {
  const [form, setForm] = useState(emptyState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await onSubmit(form);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">CineStack account</p>
        <h1>{title}</h1>
        {includeName && (
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        )}
        <input
          type={emailInputType}
          placeholder={emailLabel}
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
          minLength={6}
        />
        {error ? <p className="form-error">{error}</p> : null}
        <button className="primary-button submit-button" disabled={submitting}>
          {submitting ? "Please wait..." : submitLabel}
        </button>
        <p className="auth-footer">{footer}</p>
      </form>
    </div>
  );
}
