import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  }

  return (
    <>
      <div>
        <div>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <span variant="danger">{error}</span>}
          {message && <span variant="success">{message}</span>}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <div>Email</div>
              <div type="email" ref={emailRef} required />
            </div>
            <button disabled={loading} className="w-100" type="submit">
              Reset Password
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
