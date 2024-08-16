import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../utils/GoogleAuth";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Alert,
  Spinner,
} from "flowbite-react";

import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../redux/user/userSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [showPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      dispatch;
    }
    try {
      dispatch(logInStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(logInFailure(data));
        console.error("signup failed");
      }
      if (res.ok) {
        dispatch(logInSuccess(data));
        console.log("signup successful");
        navigate("/");
      }
    } catch (error) {
      dispatch(logInFailure(error));
      console.error("signup failed");
    }
  }

  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-center">
        <form className="flex basis-full flex-col rounded-xl border-gray-500 px-[4%] pb-5 pt-10 md:basis-3/4 md:border lg:basis-1/2">
          <h1 className="self-center pb-10 text-5xl font-bold">Sign up</h1>
          <div className="flex flex-col gap-3">
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Enter your username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Enter your Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Enter your password"
                id="password"
                onChange={handleChange}
                rightIcon={showPassword ? IoMdEyeOff : IoMdEye}
              />
              <Label className="mt-2 flex items-center gap-[0.4rem]">
                <Checkbox className="size-4" id="accept" defaultChecked />
                <span>Remember Me</span>
              </Label>
            </div>
            <Button
              className="my-2"
              gradientDuoTone="pinkToOrange"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {!loading ? (
                "Sign Up"
              ) : (
                <div className="flex items-center">
                  <Spinner />
                  <span>&nbsp; Signing up...</span>
                </div>
              )}
            </Button>
            <GoogleAuth />
            <div className="pb-3 text-sm">
              <span>Already have an account? </span>
              <Link className="text-red-800 dark:text-red-400" to="/login">
                Login
              </Link>
            </div>
          </div>
          {error && (
            <Alert className="-mx-3" color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Error! &nbsp;</span>
              {error.message}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
