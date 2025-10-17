import { FC, PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`px-3 ${className}`}>
    {children}
  </div>
);

export default Container;