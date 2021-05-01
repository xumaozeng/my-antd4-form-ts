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

  // 给用户暴露的API
  getForm = (): FormInstance => ({});
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
