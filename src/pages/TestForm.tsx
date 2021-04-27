import React from "react";
import Form, { Field } from "../components/index";
import Input from "../components/Input";

const TestForm: React.FC = () => {
  return (
    <>
      <h3>Hooks+TS实现Antd4表单</h3>
      <Form>
        <Field>
          <Input placeholder="输入用户名" />
        </Field>
      </Form>
    </>
  );
};
export default TestForm;
