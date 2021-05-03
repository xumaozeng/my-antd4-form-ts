import React from "react";
import Form, { FieldHook as Field, useForm } from "../components/index";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

const TestForm: React.FC = () => {
  const [form] = useForm();

  // 表单检验成功
  const onFinish = (val: any) => {
    console.log("onFinish", val);
  };

  // 表单校验失败
  const onFinishFailed = (val: any) => {
    console.log("onFinishFailed", val);
  };
  return (
    <>
      <h3>Hooks+TS实现Antd4表单</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field label="用户名" name="username" rules={[nameRules]}>
          <Input placeholder="输入用户名" />
        </Field>
        <Field label="密码" name="password" rules={[passwordRules]}>
          <Input placeholder="输入密码" />
        </Field>

        <button style={{ marginRight: 10 }}>提交</button>
        <button>重置</button>
      </Form>
    </>
  );
};
export default TestForm;
