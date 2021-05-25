import React from "react";
import { DataSet, Form, Select, TextField } from "choerodon-ui/pro";

import "./testC7N.less";
import FormDS from "./stores/FormDS";

interface TestC7NProps {}
const TestC7N: React.FC<TestC7NProps> = () => {
  const formDS = new DataSet(FormDS());
  return (
    <div className="testC7N">
      <h1>封装表单</h1>
      <Form dataSet={formDS}>
        <TextField name="name" />
        <Select name="sex" />
      </Form>
    </div>
  );
};
export default TestC7N;
