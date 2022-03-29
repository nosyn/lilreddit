import { Context } from "../../../context";
import { COOKIES_NAME } from "../../../../constants";

const signOut = async (
  _parent: unknown,
  _arguments: unknown,
  { req, res }: Context
): Promise<boolean> => {
  return new Promise((resolve) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("err:", err);
        resolve(false);
        return;
      }
    });

    res.clearCookie(COOKIES_NAME);
    resolve(true);
  });
};

export default signOut;
