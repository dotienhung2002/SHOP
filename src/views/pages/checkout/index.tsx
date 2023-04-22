import { initialCart } from "@Redux/reducers/common/cartReducer";
import {
  useCheckoutMutation,
  useGetCartQuery,
  useLazyGetCartQuery,
  useRemoveCartMutation,
} from "@Services/cart.service";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@Hooks/reduxHook";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cart from "./Cart";
import Payment from "./Payment";
import { usePaymentVnpayMutation } from "@Services/order.service";

export default function Checkout() {
  const [data, setData] = useState<any>();
  const [triggerGetCart] = useLazyGetCartQuery();
  const [selectedVoucher,setSelectedVoucher] = useState<any>()
const [isUse,setIsUse] = useState()
  const [checkout] = useCheckoutMutation();
  const [paymentVnpay] = usePaymentVnpayMutation();
  const [removeCart] = useRemoveCartMutation();
  const dispatch = useAppDispatch();

const location = useLocation()
  const [feeShipp, setFeeShip] = useState(0);
  const navigate = useNavigate();
  const handleGetInfo = async (values: any, selectedPayment: any) => {
    
    const customData = {
      ...values,
      shipType: 1,
      district: values?.district?.DistrictName,
      province: values?.province?.ProvinceName,
      ward: values?.ward?.WardName,
      paymentType: parseInt(selectedPayment?.value),
      shipCost: feeShipp,
      listVoucher: isUse&&selectedVoucher?.code&&[selectedVoucher?.code]||[],
      cartId: data.id,
    };
    await checkout(customData).then(async (res: any) => {
      console.log(res);
      
      if (res?.error?.data?.message||res?.error?.data?.error) {
        toast.info(res?.error?.data?.message||res?.error?.data?.error);
        for (let i = 0; i < res?.error?.data?.list.length; i++) {
          await removeCart({
            productDetailId: res?.error?.data?.list[i].productDetail?.id,
            userAuthToken: localStorage.getItem("device_user"),
          });
        }
        handleGetCart();
        return;
      }
      setData([]);
      dispatch(initialCart(0));
      
      if (selectedPayment?.value == "2") {

        await paymentVnpay({
          orderId: res?.data?.id,
          vnp_OrderInfo: "Thanh toán hoá đơn",
        }).then((res:any) => {
        // navigate("checkout-success", { state: { data: res } });
          window.location.href=res?.data?.data
        });
      }
      else{
        navigate("checkout-success-cod", { state: { data: res } });
      }

    });
  };

  const getFee = (fee: number) => {
    setFeeShip(fee);
  };
  const handleGetCart = async () => {
  // const result:any=  await triggerGetCart(localStorage.getItem("device_user")).then((res) => {
  //     setData(res.data);
  //   }).catch(()=>{
  //     setData([])
  //   });
  const result:any=  await triggerGetCart(localStorage.getItem("device_user"))


    if (result?.error) {
      setData([])
    }
    else{
      setData(result.data);
    }
    console.log("result");
    console.log(result);
    
  };
  useEffect(() => {
    handleGetCart();
  }, [location]);
  return (
    <div className="mx-auto max-w-full px-4 py-10 sm:px-6 lg:px-20">
      <div className="mb-10 md:grid md:grid-cols-7 md:gap-6 divide-y-reverse flex flex-col-reverse">
        <div className="mt-5 md:col-span-4 md:mt-0 ">
          <Payment
            submitInfo={handleGetInfo}
            getFee={getFee}
            feeShip={feeShipp}
          />
        </div>
        <div className="md:col-span-3">
          <Cart
            cart={data}
            refetchCart={() => handleGetCart()}
            feeShip={feeShipp}
            selectedVoucher={selectedVoucher}
            setSelectedVoucher={setSelectedVoucher}
            isUse={isUse}
            setIsUse={setIsUse}
          />
        </div>
      </div>
    </div>
  );
}
