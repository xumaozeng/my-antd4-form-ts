import React, { useEffect } from "react";

interface FormProps {}
const Form: React.FC<FormProps> = ({ children }) => {
  useEffect(() => {}, []);
  return <div>{children}</div>;
};
export default Form;
