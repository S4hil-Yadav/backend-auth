import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
        {children}
      </div>
    </div>
  );
}
