function AuthForm() {
  return (
    <form className="flex gap-x-2">
      <input
        type="text"
        placeholder="Email"
        className="flex rounded border px-4 py-2 outline-none transition-all focus:ring"
      />
      <input
        type="password"
        placeholder="Password"
        className="flex rounded border px-4 py-2 outline-none transition-all focus:ring"
      />
      <input
        type="button"
        value="Submit"
        className="flex cursor-pointer rounded border bg-blue-500 px-4 py-2 text-white outline-none transition-all focus:ring active:bg-blue-600"
      />
    </form>
  );
}

export default AuthForm;
