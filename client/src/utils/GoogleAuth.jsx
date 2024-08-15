import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { logInFailure, logInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resultFromGoogle.user.email,
          name: resultFromGoogle.user.displayName,
          profilePic: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(logInFailure(data));
        console.error("authentication failed");
      }
      if (res.ok) {
        dispatch(logInSuccess(data));
        console.log("authentication successful");
        navigate("/");
      }
    } catch (error) {
      dispatch(logInFailure(error));
      console.error("authentication failed");
    }
  }

  return (
    <Button
      type="button"
      outline
      gradientDuoTone="purpleToBlue"
      onClick={handleGoogleAuth}
    >
      Continue with google
    </Button>
  );
}
