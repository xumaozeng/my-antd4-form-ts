import { FormInstance } from "./types";
import React from "react";

const warningFunc: any = () => {
  console.log("Cant not find FormContext");
};

const FieldContext = React.createContext<FormInstance>({
  submit: warningFunc,
  setCallbacks: warningFunc
});

export default FieldContext;
