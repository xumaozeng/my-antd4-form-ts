import { Button } from "choerodon-ui/pro";
import { ButtonColor } from "choerodon-ui/pro/lib/button/enum";

import "./testC7N.css";

interface TestC7NProps {}
const TestC7N: React.FC<TestC7NProps> = () => {
  return (
    <div className="testC7N">
      <Button color={ButtonColor.primary}>猪齿鱼</Button>
    </div>
  );
};
export default TestC7N;
