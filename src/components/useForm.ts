/**
 * 数据仓库-存储form
 */
import React from "react";
import { Store, FieldEntity, Callbacks, FormInstance } from "./types";

class FormStore {
  store: Store;
  fieldEntities: FieldEntity[];
  callbacks: Callbacks;

  constructor() {
    // 数据仓库
    this.store = {};
    // 组件实例数组
    this.fieldEntities = [];
    // 保存成功和失败回调函数
    this.callbacks = {};
  }

  // 存取回调函数-成功或失败
  setCallbacks = (newCallbacks: Callbacks): void => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks
    };
  };

  // 存取组件实例
  setFieldEntities = (field: FieldEntity) => {
    this.fieldEntities.push(field);
    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter(f => f !== field);
      // 删除数据仓库里的数据
      delete this.store[field.props.name];
    };
  };

  // get
  getFieldsValue = (): Store => {
    return { ...this.store };
  };

  getFieldValue = (name: string): any => {
    return this.store[name];
  };

  // set
  setFieldsValue = (newStore: Store): void => {
    // 'name': 'value'
    // 更新数据仓库
    this.store = {
      ...this.store,
      ...newStore
    };

    // 更新组件-forceUpdate
    this.fieldEntities.forEach(field => {
      // 更新对应name上的field，而不是每次都全部更新
      Object.keys(newStore).forEach(k => {
        if (k === field.props.name) {
          field.onStoreChange();
        }
      });
    });
  };

  // 校验
  validate = () => {
    let err: object[] = [];
    // 实现基础功能，如输入信息就通过
    this.fieldEntities.forEach(field => {
      const { name, rules } = field.props;
      let rule = rules && rules[0];
      let value = this.getFieldValue(name);
      if (rule && rule.required && (value === undefined || value === "")) {
        err.push({
          [name]: rule.message,
          value
        });
      }
    });

    return err;
  };

  // 提交
  submit = () => {
    const err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;

    if (err.length === 0) {
      // 校验成功onFinish
      onFinish?.(this.getFieldsValue());
    } else {
      // 校验失败onFinishFailed
      onFinishFailed?.(err, this.getFieldsValue());
    }
  };

  // 给用户暴露的API
  getForm = (): FormInstance => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    setFieldEntities: this.setFieldEntities,
    setCallbacks: this.setCallbacks,
    submit: this.submit
  });
}

function useForm<Values = any>(
  form?: FormInstance<Values>
): [FormInstance<Values>] {
  // 保证始终用到同一个对象
  const formRef = React.useRef<FormInstance>();
  if (!formRef.current) {
    if (form) {
      // 默认值
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;
