import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Alert,
  Spinner,
} from "flowbite-react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../redux/user/userSlice";
import GoogleAuth from "../utils/GoogleAuth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [showPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(logInFailure("Please fill all the fields!"));
    }
    try {
      dispatch(logInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.error("login failed");
        dispatch(logInFailure(data));
      }
      if (res.ok) {
        dispatch(logInSuccess(data));
        console.log("login successful");
        navigate("/");
      }
    } catch (error) {
      dispatch(logInFailure(error));
      console.error("login failed");
    }
  }

  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-center">
        <form className="flex basis-full flex-col rounded-xl border-gray-500 px-[4%] pb-5 pt-10 dark:bg-gray-700 md:basis-3/4 md:border lg:basis-1/2">
          <h1 className="self-center pb-10 text-5xl font-bold">Log in</h1>
          <div className="flex flex-col gap-3">
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
              <div className="mt-2 flex justify-between">
                <Label className="flex items-center gap-[0.4rem]">
                  <Checkbox className="size-4" id="accept" defaultChecked />
                  <span>Remember Me</span>
                </Label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-800 dark:text-blue-400"
                >
                  Forgot Password
                </a>
              </div>
            </div>
            <Button
              className="my-2"
              gradientDuoTone="pinkToOrange"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {!loading ? (
                "Log In"
              ) : (
                <div className="flex items-center">
                  <Spinner />
                  <span>&nbsp; Logging in...</span>
                </div>
              )}
            </Button>
            <GoogleAuth />
            <div className="pb-3 text-sm">
              <span>Don&apos;t have an account? </span>
              <Link className="text-red-800 dark:text-red-400" to="/signup">
                Signup
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
