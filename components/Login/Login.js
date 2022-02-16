import React from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    const viewTodoHandler = () => {
      router.push("/home");
    };
    return (
      <div>
        <h1> Welcome {session.user.name}</h1>
        <button onClick={viewTodoHandler}>View Todo List</button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default Login;
