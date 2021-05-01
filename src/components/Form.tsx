import React from "react";
import FieldContext from "./FieldContext";
import { Callbacks, FormInstance, Store } from "./types";
import useForm from "./useForm";

type RenderProps = (
  values: Store,
  form: FormInstance
) => JSX.Element | React.ReactNode;
interface FormProps<Values = any> {
  onFinish?: Callbacks<Values>["onFinish"];
  onFinishFailed?: Callbacks<Values>["onFinishFailed"];
  children?: RenderProps | React.ReactNode;
  form?: FormInstance;
}
const Form: React.FC<FormProps> = ({
  children,
  onFinish,
  onFinishFailed,
  form
}: FormProps) => {
  const [formInstance] = useForm(form);

  // 存取回调函数-成功和失败
  formInstance.setCallbacks({ onFinish, onFinishFailed });

  return (
    <form
      onSubmit={e => {
        e.preventDefault(); // 取消默认事件
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
};
export default Form;
