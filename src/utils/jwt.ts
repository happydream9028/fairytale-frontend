import { jwtDecode } from "jwt-decode";
import { verify, sign } from "jsonwebtoken";
import axios from "./axios";

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const isTokenValid = (token: string | null) => {
  if (!token) return false;
  return verify(token, process.env.REACT_APP_JWT_SECRET as string, (err, decoded) => {
    if (err) return false;
    else return true;
  });
};

const getUserIdFromToken = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!isTokenValid(accessToken)) return 0;
  const decode = jwtDecode<{ exp: number; iat: number; userId: number }>(accessToken as string);
  return decode.userId;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    sessionStorage.setItem("accessToken", accessToken);
  } else {
    sessionStorage.removeItem("accessToken");
  }
};

export { verify, sign, isValidToken, setSession, getUserIdFromToken, isTokenValid };
