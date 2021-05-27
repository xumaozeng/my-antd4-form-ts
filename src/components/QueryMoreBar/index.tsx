import {
  Button,
  CheckBox,
  ColorPicker,
  Currency,
  DataSet,
  DatePicker,
  DateTimePicker,
  EmailField,
  Form,
  IntlField,
  Lov,
  MonthPicker,
  NumberField,
  Output,
  Select,
  TextField,
  TimePicker,
  UrlField,
  WeekPicker,
  YearPicker
} from "choerodon-ui/pro";
import React, {
  ReactElement,
  useState,
  cloneElement,
  isValidElement
} from "react";
import { isObject, isString } from "lodash";
import { FieldType } from "choerodon-ui/pro/lib/data-set/enum";
import { ButtonColor } from "choerodon-ui/pro/lib/button/enum";

interface QueryMoreBarProps {
  dataSet: DataSet;
  queryFunction: () => void;
  buttons?: Array<ReactElement>;
  queryFieldsLimit?: number; // 一行几列，默认4列
  labelWidth?: number; // label-width默认100
}
const QueryMoreBar: React.FC<QueryMoreBarProps> = ({
  dataSet,
  queryFunction,
  buttons,
  queryFieldsLimit = 4,
  labelWidth = 100
}: QueryMoreBarProps) => {
  const [hidden, setHidden] = useState(true);
  // 查询的字段数组
  const queryFields = getQueryFields(dataSet);
  // 更多查询
  const handleToggle = () => {
    setHidden(!hidden);
  };
  const { queryDataSet } = dataSet;
  // 校验通过则返回调用查询函数
  const query = async () => {
    if (queryDataSet) {
      return (await queryDataSet.validate()) && queryFunction();
    }
  };
  return (
    <div>
      {queryDataSet ? (
        <div
          style={{
            display: "flex",
            marginBottom: "3px",
            alignItems: "flex-start"
          }}
        >
          <Form
            style={{ flex: "auto" }}
            columns={queryFieldsLimit}
            dataSet={queryDataSet}
            labelWidth={labelWidth}
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) return query();
            }}
          >
            {hidden ? queryFields.slice(0, queryFieldsLimit) : queryFields}
          </Form>
          <div
            style={{
              marginTop: "10px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            {queryFields.length > queryFieldsLimit && (
              <Button onClick={handleToggle}>
                {hidden ? "更多查询" : "收起查询"}
              </Button>
            )}
            <Button
              onClick={() => {
                if (queryDataSet.current) queryDataSet.current.reset();
                dataSet.fireEvent("queryBarReset", {
                  dataSet,
                  queryFields
                });
              }}
            >
              重置
            </Button>
            <Button color={ButtonColor.primary} onClick={query}>
              查询
            </Button>
          </div>
        </div>
      ) : null}
      {buttons && buttons.length ? (
        <div style={{ marginBottom: 4 }}>{buttons}</div>
      ) : null}
    </div>
  );
};

// 获取查询列
function getQueryFields(dataSet: DataSet, queryFields: any = {}): any {
  const { queryDataSet } = dataSet;
  const result: any = [];
  if (queryDataSet) {
    const { fields } = queryDataSet;
    return [...fields.entries()].reduce((list, [name, field]) => {
      if (!field.get("bind")) {
        const props = {
          key: name,
          name,
          dataSet: queryDataSet
        };
        const element = queryFields[name];
        list.push(
          isValidElement(element)
            ? cloneElement(element, props)
            : cloneElement(getEditorByField(field), {
                ...props,
                ...(isObject(element) ? element : {})
              })
        );
      }
      return list;
    }, result);
  }
}

// 根据type匹配搜索框
function getEditorByField(field: any): any {
  const lookupCode = field.get("lookupCode");
  const lookupUrl = field.get("lookupUrl");
  const lovCode = field.get("lovCode");
  const multiLine = field.get("multiLine");
  const { type } = field;
  if (
    lookupCode ||
    isString(lookupUrl) ||
    (type !== FieldType.object && (lovCode || field.options))
  ) {
    return <Select />;
  }
  if (lovCode) return <Lov />;
  if (multiLine) return <Output />;
  switch (type) {
    case FieldType.boolean:
      return <CheckBox />;
    case FieldType.number:
      return <NumberField />;
    case FieldType.currency:
      return <Currency />;
    case FieldType.date:
      return <DatePicker />;
    case FieldType.dateTime:
      return <DateTimePicker />;
    case FieldType.time:
      return <TimePicker />;
    case FieldType.week:
      return <WeekPicker />;
    case FieldType.month:
      return <MonthPicker />;
    case FieldType.year:
      return <YearPicker />;
    case FieldType.intl:
      return <IntlField />;
    case FieldType.email:
      return <EmailField />;
    case FieldType.url:
      return <UrlField />;
    case FieldType.color:
      return <ColorPicker />;
    case FieldType.string:
      return <TextField />;
    default:
      return <TextField />;
  }
}

export default QueryMoreBar;
