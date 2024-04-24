import { MutatingDots } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <MutatingDots
      visible={true}
      height="150"
      width="150"
      color="#F9B233"
      secondaryColor="#F9B233"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass="d-flex justify-content-center align-items-center h-100"
    />
  );
};

export default LoadingSpinner;