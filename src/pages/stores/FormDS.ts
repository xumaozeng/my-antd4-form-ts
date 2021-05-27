import DataSet, { DataSetProps } from "choerodon-ui/pro/lib/data-set/DataSet";
import { FieldType } from "choerodon-ui/pro/lib/data-set/enum";

const FormDS = (): DataSetProps => {
  return {
    queryDataSet: new DataSet({
      autoCreate: true,
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
        },
        {
          name: "email",
          type: FieldType.email,
          label: "邮箱"
        },
        {
          name: "phone",
          type: FieldType.string,
          label: "联系方式"
        }
      ]
    })
  };
};

export default FormDS;
