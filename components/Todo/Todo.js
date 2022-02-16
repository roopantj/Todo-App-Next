import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import TodoItems from "../TodoItems/TodoItems";

const Todo = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading</p>;
  if (session) {
    return (
      <div>
        <Link href="/">Go home</Link>
        <button onClick={() => signOut()}>Sign out</button>
        <TodoItems UID={session.user} />
      </div>
    );
  } else {
    return (
      <>
        <h1>Access denied</h1>
        <Link href="/">Go home</Link>
      </>
    );
  }
};

export default Todo;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  return { props: session };
}
