import { useNavigate } from "react-router-dom";
import { useState } from "react";
import routes from "../constants/routes";
import TextField from "../components/TextField";
import useAuthStore from "../store/authStore";
import NavBar from "../components/NavBar";

function Login() {
  const navigation = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loginInfo, setLogInInfo] = useState({
    userName: "",
    passWord: "",
  });
  const [error, setError] = useState<string>("");

  function handleChange(event: any, key: any) {
    setLogInInfo((prevInfo) => {
      return { ...prevInfo, [key]: event.target.value };
    });
  }
  function handleVerify() {
    if (
      loginInfo.userName === import.meta.env.VITE_USERNAME &&
      loginInfo.passWord === import.meta.env.VITE_PASSWORD
    ) {
      setError("");
      login();
      navigation(routes.setting);
    } else {
      setError("Please enter correct login credentials.");
    }
  }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <NavBar />
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full sm:max-w-md px-4">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand text-center mb-10">
            Login
          </h2>
          <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700">
            <div className="mb-4 space-y-8">
              <TextField
                type="text"
                name="userName"
                label="Username"
                value={loginInfo.userName}
                onChange={(e) => handleChange(e, "userName")}
                placeholder=""
              />
              <TextField
                type="password"
                name="passWord"
                label="Password"
                value={loginInfo.passWord}
                onChange={(e) => handleChange(e, "passWord")}
                placeholder=""
              />
            </div>
            <div className="mt-10">
              <button
                className="w-full btn btn-primary"
                type="button"
                onClick={handleVerify}
              >
                Login
              </button>
              {error && (
                <p className="text-red-500 text-xs italic mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
