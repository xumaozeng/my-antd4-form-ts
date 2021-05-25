import DataSet, { DataSetProps } from "choerodon-ui/pro/lib/data-set/DataSet";
import { FieldType } from "choerodon-ui/pro/lib/data-set/enum";

const FormDS = (): DataSetProps => {
  return {
    fields: [
      { name: "name", type: FieldType.string, label: "姓名" },
      {
        name: "sex",
        type: FieldType.string,
        label: "年龄",
        options: new DataSet({
          paging: false,
          data: [{ value: "F", meaning: "女" }, { value: "M", meaning: "男" }]
        })
      }
    ]
  };
};

export default FormDS;
