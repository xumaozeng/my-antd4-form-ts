import React, {
  ReactNode,
  useContext,
  useLayoutEffect,
  useReducer
} from "react";
import FieldContext from "./FieldContext";

interface FieldProps {
  label?: string;
  name: string;
  children?: ReactNode;
  rules?: object[];
}
const Field: React.FC<FieldProps> = (props: FieldProps) => {
  const { children, label, name } = props;
  // 获取context对象
  const fieldContext = useContext(FieldContext);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // 使用useEffect可能会使订阅延迟
  useLayoutEffect(() => {
    // 函数组件没有实例对象this，把props和onStoreChange当做对象传过去
    const unRegister: any = fieldContext.setFieldEntities({
      props,
      onStoreChange
    });

    // 组件销毁取消订阅
    return () => {
      unRegister();
    };
    // eslint-disable-next-line
  }, []);

  // 强制更新组件
  function onStoreChange() {
    forceUpdate();
  }

  // 额外的属性-input
  function getControlled() {
    const { getFieldValue, setFieldsValue } = fieldContext;

    return {
      value: getFieldValue(name), // get
      onChange: (e: any) => {
        // set
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
      }
    };
  }

  // 克隆组件，给其添加一些属性返回，使Field=>Input变成受控组件
  const returnChildNode = React.cloneElement(
    children as React.ReactElement,
    getControlled()
  );

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ flex: "none", width: 50 }}>{label || name}</label>
        {returnChildNode}
      </div>
    </div>
  );
};
export default Field;
