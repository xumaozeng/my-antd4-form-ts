/**
 * 数据仓库-存储form
 */
import React from "react";
import { Store, FieldEntity, Callbacks, FormInstance } from "./types";

class FormStore {
  // 数据仓库
  private store: Store = {};
  // 组件实例数组
  private fieldEntities: FieldEntity[] = [];
  // 保存成功和失败回调函数
  private callbacks: Callbacks = {};
  // 初始值
  private initialValues: Store = {};

  // 存取初始值
  private setInitialValues = (initialStore: Store): void => {
    this.initialValues = Object.assign({}, this.initialValues, initialStore);
  };

  // 存取回调函数-成功或失败
  private setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
  };

  // 存取组件实例
  private setFieldEntities = (field: FieldEntity) => {
    this.fieldEntities.push(field);
    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter(f => f !== field);
      // 删除数据仓库里的数据
      delete this.store[field.props.name];
    };
  };

  // get
  private getFieldsValue = (): Store => {
    return this.store;
  };

  private getFieldValue = (name: string): any => {
    return this.store[name];
  };

  // set
  private setFieldsValue = (newStore: Store): void => {
    // 'name': 'value'
    // 第一步：更新数据仓库
    this.store = Object.assign({}, this.store, newStore);

    // 第二步：更新组件-forceUpdate
    this.fieldEntities.forEach(field => {
      // 更新对应name上的field，而不是每次都全部更新
      Object.keys(newStore).forEach(k => {
        if (k === field.props.name) {
          field.onStoreChange();
        }
      });
    });
  };

  // 重置
  private resetFields = (): void => {
    this.setFieldsValue(this.initialValues);
  };

  // 校验
  private validate = () => {
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
  private submit = () => {
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
  public getForm = (): FormInstance => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    setFieldEntities: this.setFieldEntities,
    setCallbacks: this.setCallbacks,
    resetFields: this.resetFields,
    setInitialValues: this.setInitialValues,
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
      const formStore: FormStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;
