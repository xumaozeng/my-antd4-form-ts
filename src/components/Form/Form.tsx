import React, { FormEvent } from "react";
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

  // 提交
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // 取消默认事件
    e.stopPropagation(); // 阻止事件冒泡
    formInstance.submit();
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
};
export default Form;
