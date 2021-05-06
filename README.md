### my-antd4-fom-ts

antd4表单自己实现一遍源码，用最新的Hook开发加上TypeScript类型注释

```bash
yarn // 安装依赖

yarn start // 启动项目
```

表单组件

- Form.tsx
- Field.tsx
- Input.tsx

逻辑组件

- useForm.ts
- FieldContext.ts

类型注解

- types.ts

模块导出

- index.tsx



#### useForm存储容器

一个form表单有一个独立的容器，存储field字段的name和value以及一些公共方法如下

- formStore class类
  - store-存储Field组件name和value如[name]:value
  - fieldEntities-存储Field组件实例如{props, onStoreChange}
  - callbacks-存取回调函数如onFinish和onFinishFailed
  - initialValues-存取初始值
  - getFieldValue-获取字段值方法
  - getFieldsValue-获取store
  - setFieldsValue-设置字段值

- useForm 自定义Hook方法
  - 判断传入的form是否存在，保证始终是同一个form对象，使用useRef Hook API
  - 返回form实例的公共方法getForm()

#### FieldContext 隔代传参Context上下文 API

context使用分三步走：

- 第一步，创建context，React.createContext()
- 第二步，创建Provider，传递value
- 第三步，子组件消费value，有三种途径
  - 类组件中static contextType  = context，this.context获取对象
  - 函数组件中使用useContext(context)
  - <Context.Consumer>{context=>{return ReactNode}}</Context.Consumer>不限函数和类组件

#### Form 表单

有以下属性props

- onFinish成功回调函数
- onFinishFailed失败回调函数
- form组件实例，保存了一些公共方存值和取值等

#### Field 组件

属性props

- label
- name-作为store内的key值
- rules-校验规则
- initialValue-初始值