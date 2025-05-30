import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { isLoading,data,isSuccess,isError,error }] =
    useCreateCheckoutSessionMutation();
  const purchaseCheckoutHandler = async () => {
    await createCheckoutSession(courseId);
  };
  useEffect(() => {
    if(isSuccess){
      if(data?.url){
        window.location.href = data.url
      }
    }else{
      toast.error("Invalid response from server")
    }
    if(isError){
      toast.error(error?.data?.message || "Failed to create Checkout")
    }
  },[data,isSuccess,isError,error]);
  return (
    <Button
      disabled={isLoading}
      className="w-full"
      onClick={purchaseCheckoutHandler}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
