import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({ session, isLogged: true });
  } else {
    res.status(401);
  }
  res.end();
};
export default handler;
