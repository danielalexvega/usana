import { FC } from "react";
import { Link } from "react-router-dom";

const Login: FC = () => {
  return (
    <div className="flex justify-end items-center gap-3">
      <Link to="/" className="text-white uppercase font-medium hover:text-gray-300">
        LOGIN
      </Link>
      {/* US Flag Icon */}
      <div className="w-6 h-4 bg-blue-600 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* Simplified US flag representation */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-red-500"></div>
          <div className="absolute top-0 right-0 w-3 h-full bg-white"></div>
          <div className="absolute top-0 right-0 w-3 h-2 bg-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
