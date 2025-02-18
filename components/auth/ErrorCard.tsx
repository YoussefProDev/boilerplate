import CardWrapper from "@/components/auth/CardWrapper";
import { LuAlertTriangle } from "react-icons/lu";
const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-start">
        <LuAlertTriangle size={50} className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
