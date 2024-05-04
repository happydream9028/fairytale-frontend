import React from "react";

interface WrapperProps {
  children?: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => <div className="wrapper">{children}</div>;

export default Wrapper;
