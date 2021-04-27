import React, { ReactNode, useEffect } from "react";

interface FieldProps {
  children?: ReactNode;
}
const Field: React.FC<FieldProps> = ({ children }: FieldProps) => {
  useEffect(() => {}, []);
  return <div>{children}</div>;
};
export default Field;
