import React from "react";
import Form, { Field } from "../components/index";
import Input from "../components/Input";

const TestForm: React.FC = () => {
  return (
    <>
      <h3>Hooks+TS实现Antd4表单</h3>
      <Form>
        <Field label="用户名" name="username">
          <Input placeholder="输入用户名" />
        </Field>
        <Field label="密码" name="password">
          <Input placeholder="输入密码" />
        </Field>

        <button style={{ marginRight: 10 }}>提交</button>
        <button>重置</button>
      </Form>
    </>
  );
};
export default TestForm;
