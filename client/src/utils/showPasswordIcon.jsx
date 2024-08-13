import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export default function showPasswordIcon({ showPassword, setShowPassword }) {
  if (showPassword)
    return (
      <IoMdEye
        className="cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      />
    );
  else
    return (
      <IoMdEyeOff
        className="cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      />
    );
}
