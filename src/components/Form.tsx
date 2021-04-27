import React, { ReactNode, useEffect } from "react";

interface FormProps {
  children?: ReactNode;
}
const Form: React.FC<FormProps> = ({ children }: FormProps) => {
  useEffect(() => {}, []);
  return <div>{children}</div>;
};
export default Form;
