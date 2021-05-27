import React from "react";
import { DataSet } from "choerodon-ui/pro";

import "./testC7N.css";
import FormDS from "./stores/FormDS";
import QueryMoreBar from "../components/QueryMoreBar";

interface TestC7NProps {}
const TestC7N: React.FC<TestC7NProps> = () => {
  const formDS = new DataSet(FormDS());

  // 查询
  const handleQuery = () => {
    console.log("handleQuery");
  };

  return (
    <div className="testC7N">
      <h1>封装表单</h1>
      <QueryMoreBar
        dataSet={formDS}
        queryFunction={handleQuery}
        queryFieldsLimit={2}
        labelWidth={80}
      />
    </div>
  );
};
export default TestC7N;
