import { FormInstance } from "./types";
import React from "react";

const warningFunc: any = () => {
  console.log("Cant not find FormContext");
};

const FieldContext = React.createContext<FormInstance>({
  submit: warningFunc,
  setCallbacks: warningFunc,
  setFieldEntities: warningFunc,
  setFieldsValue: warningFunc,
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
});

export default FieldContext;
