import { FormEvent, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import { useAuthContext } from '@/hooks/useAuthContext';

import { SignIn } from '../services/auth';

function AuthForm() {
  const context = useAuthContext();
  const { isLoading, mutate } = useMutation(SignIn, {
    onSuccess: (data) => {
      context.login?.(data.accessToken, data.user);
    },
  });
  const [state, setState] = useState({
    email: 'dev@developer.dev',
    password: '123456',
  });

  function handleChange(event_: FormEvent<HTMLInputElement>) {
    const { name, value } = event_.currentTarget as HTMLInputElement;
    setState((previousState) => ({ ...previousState, [name]: value }));
  }

  const handleSubmit = (event_: FormEvent<HTMLFormElement>) => {
    event_.preventDefault();
    mutate(state);
  };

  const user = useMemo(() => context.state.user, [context.state.user]);

  if (context.isAuth && user)
    return (
      <div className="flex items-center gap-x-2">
        <h2 className="flex">
          <span>Welcome:</span>
          <div className="ml-1 font-bold">{user.email}</div>
        </h2>
        <div className="flex">
          <Link to="/share" className="px-4 py-2 text-blue-500">
            Share a movie
          </Link>
          <button onClick={context.logout} className="px-4 py-2 text-blue-500">
            Log out
          </button>
        </div>
      </div>
    );

  return (
    <form className="flex gap-x-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        name="email"
        className="flex rounded border px-4 py-2 outline-none transition-all focus:ring"
        onChange={handleChange}
        value={state.email}
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="flex rounded border px-4 py-2 outline-none transition-all focus:ring"
        onChange={handleChange}
        value={state.password}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex cursor-pointer rounded border bg-blue-500 px-4 py-2 text-white outline-none transition-all focus:ring active:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default AuthForm;
