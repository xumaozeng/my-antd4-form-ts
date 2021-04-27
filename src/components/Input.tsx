const Input = (props: any) => {
  return <input {...props} />;
};

const CustomizeInput = ({ value = "", ...props }: any) => (
  <div style={{ padding: 0 }}>
    <Input style={{ outline: "none" }} defaultValue={value} {...props} />
  </div>
);

export default CustomizeInput;
