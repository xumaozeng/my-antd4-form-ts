import { cloneElement, Component, ReactElement, ReactNode } from "react";
import FieldContext from "./FieldContext";
import { FieldEntity } from "./types";

interface FieldProps {
  label?: string;
  name: string;
  children?: ReactNode;
  rules?: object[];
}

class FieldClass extends Component<FieldProps, {}> {
  // 使用declare 需要@babel/plugin-transform-typescript
  // declare context: React.ContextType<typeof FieldContext>;
  // 使用context
  public static contextType = FieldContext;

  private unRegister: any = null;

  public componentDidMount() {
    // 注册组件实例，返回一个取消注册函数
    this.unRegister = this.context.setFieldEntities(this);
  }

  public componentWillMount() {
    // 取消注册
    if (this.unRegister) {
      this.unRegister();
    }
  }

  public onStoreChange: FieldEntity["onStoreChange"] = () => {
    // 强制更新组件
    this.forceUpdate();
  };

  public getControlled = () => {
    // 使input变为受控组件
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;

    return {
      value: getFieldValue(name), // get
      onChange: (e: any) => {
        // set
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
      }
    };
  };

  public render() {
    const { children, label, name } = this.props;
    // 克隆组件，给其添加一些额外属性在返回
    const returnChildNode = cloneElement(
      children as ReactElement,
      this.getControlled()
    );
    return (
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ flex: "none", width: 50 }}>{label || name}</label>
          {returnChildNode}
        </div>
      </div>
    );
  }
}
export default FieldClass;
