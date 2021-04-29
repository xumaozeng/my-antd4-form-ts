import React, { ReactNode } from "react";

interface FieldProps {
  label?: string;
  name: string;
  children?: ReactNode;
}
const Field: React.FC<FieldProps> = ({ children, label, name }: FieldProps) => {
  const getControlled = () => {
    return {
      value: "",
      onChange: () => {}
    };
  };

  // 克隆组件，给其添加一些属性返回，使Field=>Input变成受控组件
  const returnChildNode = React.cloneElement(
    children as React.ReactElement,
    getControlled()
  );

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ flex: "none", width: 50 }}>{label || name}</label>
        {returnChildNode}
      </div>
    </div>
  );
};
export default Field;
