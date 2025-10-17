import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => (
  <Link to="/">
    <div className="flex gap-4 items-center">
      <img src="/USANA_logo.svg" alt="USANA" width="194" height="40" />
    </div>
  </Link>
);

export default Logo;