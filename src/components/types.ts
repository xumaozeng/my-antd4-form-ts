// 数据仓库类型
export interface Store {
  [name: string]: any;
}

// 组件实例类型
export interface FieldEntity {
  onStoreChange: () => void;
  props: {
    name: string;
    rules?: any;
    initialValue?: any;
  };
}

// 保存回调函数
export interface Callbacks<Values = any> {
  onFinish: (values: Values) => void;
  onFinishFailed: (errorInfo: Values, message: any) => void;
}

// form实例对象
export interface FormInstance<Values = any> {
  getFieldValue?: (name: string) => any;
  getFieldsValue?: () => Values;
  resetFields?: (fields?: string[]) => void;
  setFieldsValue?: (value: any) => void;
  submit: () => void;
  setCallbacks: (callback: any) => void;
  setFieldEntities?: (field: FieldEntity) => void;
}
