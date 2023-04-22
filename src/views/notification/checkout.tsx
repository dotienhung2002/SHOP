import { useVnpayIpnQuery } from "@Services/order.service";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const CheckoutSuccess = () => {
  const [data, setData] = useState<any>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const status = useVnpayIpnQuery(location.search);



  // window.location.replace(`http://localhost:3000/cart/checkout-success}`);

  
  // http://localhost:3000/cart/checkout-success?vnp_Amount=24677500&vnp_BankCode=VNPAY&vnp_CardType=QRCODE&vnp_OrderInfo=Thanh+to%3Fn+ho%3F+%3F%3Fn&vnp_PayDate=20221221154503&vnp_ResponseCode=24&vnp_TmnCode=GYMYTYLT&vnp_TransactionNo=0&vnp_TransactionStatus=02&vnp_TxnRef=171&vnp_SecureHash=123d38174a392bd4fc2cc8c25c48cff1914339dbe82569df9248e61c20732a14206ccca3b327177f5f0ba32e4e1b730f3d2de6689092bab938321c139cabe616
  // document.location.replace("")
// location.search.replace(location.search,"")
  useEffect(() => {
    if (status) {
      setData(status?.data?.data);
    }
  }, [status]);
  
  
  const numberToCurrencyStyle = (x: any) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
//   useEffect(()=>{
// navigate("/cart/checkout-success")
//   },[])
  return (
    (
      ((
        <div className="container py-5">
          <h1 className="text-xl font-semibold uppercase lg:text-2xl">
            {(status?.data?.status == 200 && "đặt hàng thành công") ||
              "đặt hàng thất bại"}
          </h1>
         
          <div className="mb-3 flex justify-center text-center text-sm text-gray-500">
            <p>
              <button
                type="button"
                className="font-medium text-black hover:text-indigo-500"
                onClick={() => {
                  navigate("/");
                }}
              >
                Tiếp tục mua sắm
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
          {
            <>
              {status?.data?.status == 200 && (
                <>
                  <div className="text-center ">
                    {" "}
                    <p className="text-lg">
                      Cuộc sống có nhiều lựa chọn. Cảm ơn bạn đã chọn FUSAMATE,
                      Kenny!
                    </p>
                    <div className="my-5 text-sm">
                      Đơn hàng của bạn CHẮC CHẮN đã được chuyển tới hệ thống xử
                      lí đơn hàng của FUSAMATE.
                      <br />
                      Trong quá trình xử lý FUSAMATE sẽ liên hệ lại nếu như cần
                      thêm thông tin từ bạn.
                      <br />
                      Ngoài ra FUSAMATE cũng sẽ có gửi xác nhận đơn hàng bằng
                      Email và tin nhắn
                    </div>
                  </div>
                  <div className="grid grid-flow-col  grid-cols-3 gap-10">
                    <div className=" col-span-full lg:col-span-2  ">
                      <h2 className="py-5 text-center text-xl font-bold lg:text-start lg:text-2xl">
                        Thông tin đơn hàng
                      </h2>

                      <div className="relative overflow-x-auto">
                        <table className="w-full text-left text-sm text-white">
                          <thead className="bg-gray-500 text-xs uppercase text-white ">
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-4  text-xs lg:px-2 "
                                style={{ fontSize: "13px" }}
                              >
                                Tên sản phẩm
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-4  text-xs lg:px-2 "
                                style={{ fontSize: "13px" }}
                              >
                                Số lượng
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-4  text-xs lg:px-2 "
                                style={{ fontSize: "13px" }}
                              >
                                Giá bán
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-4  text-xs lg:px-2 "
                                style={{ fontSize: "13px" }}
                              >
                                Biến thể
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-4  text-xs lg:px-2 "
                                style={{ fontSize: "13px" }}
                              >
                                Thành tiền
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.listOrderDetail?.map(
                              (item: any, index: number) => (
                                <tr
                                  className="border-b  dark:border-gray-700 bg-gray-800"
                                  key={index}
                                >
                                  <th
                                    scope="row"
                                    className="whitespace-nowrap py-4 px-4  text-xs font-medium text-white dark:text-white lg:px-2"
                                    style={{
                                      fontSize: "13px",
                                    }}
                                  >
                                    {item?.name}
                                  </th>
                                  <td
                                    className="py-4 px-4  text-xs text-white lg:px-2"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {item?.quantity}
                                  </td>
                                  <td
                                    className="py-4 px-4  text-xs text-white lg:px-2"
                                    style={{
                                      fontSize: "13px",
                                      minWidth: "100px",
                                    }}
                                  >
                                    {numberToCurrencyStyle(item?.listedPrice)} đ
                                    {/* <span className="line-through">{item?.subPrice}</span> */}
                                  </td>
                                  <td
                                    className="py-4 px-4  text-xs text-white lg:px-2"
                                    style={{
                                      fontSize: "13px",
                                      minWidth: "100px",
                                    }}
                                  >
                                    {item?.variant}
                                  </td>
                                  <td
                                    className="py-4 px-4  text-xs text-white lg:px-2"
                                    style={{
                                      fontSize: "13px",
                                      minWidth: "100px",
                                    }}
                                  >
                                    {numberToCurrencyStyle(item?.subPrice)} đ
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    
                      <div className="grid grid-flow-col  border-b-2   border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 lg:grid-cols-6 ">
                        <div
                          className=" col-start-1 px-5   lg:col-start-4 lg:px-0"
                          style={{ fontSize: "13px" }}
                        >
                          Tổng tiền
                        </div>
                        <div
                          className="col-end-7 "
                          style={{ fontSize: "13px" }}
                        >
                          {numberToCurrencyStyle(data?.totalPrice)} đ
                        </div>
                      </div>
                   


 
                      <div className="grid grid-flow-col  lg:grid-cols-6   border-b-2 border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 ">
                    <div className=" px-5 lg:px-0   col-start-1 lg:col-start-4" style={{fontSize:"13px"}}>Phiếu quà tặng</div>
                    <div className="col-end-7 " style={{fontSize:"13px"}}>
                      {numberToCurrencyStyle(data?.totalPayment-data?.totalPrice-data?.shipCost)} đ
                    </div>
                  </div>

                      <div className="grid grid-flow-col  border-b-2   border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 lg:grid-cols-6 ">
                        <div
                          className=" col-start-1 px-5   lg:col-start-4 lg:px-0"
                          style={{ fontSize: "13px" }}
                        >
                          Phí giao hàng
                        </div>
                        <div
                          className="col-end-7 "
                          style={{ fontSize: "13px" }}
                        >
                          + {numberToCurrencyStyle(data?.shipCost)} đ
                        </div>
                      </div>
                      <div className="grid grid-flow-col  border-b-2   border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 lg:grid-cols-6 ">
                        <div
                          className=" col-start-1 px-5   lg:col-start-4 lg:px-0"
                          style={{ fontSize: "13px" }}
                        >
                          Tổng thanh toán
                        </div>
                        <div
                          className="col-end-7 "
                          style={{ fontSize: "13px" }}
                        >
                          {numberToCurrencyStyle(data?.totalPayment)} đ
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full px-9 lg:col-span-1 lg:px-0 ">
                      <h2 className="py-5 text-xl font-bold lg:text-2xl">
                        Thông tin nhận hàng
                      </h2>
                      <p className="mt-1" style={{ fontSize: "13px" }}>
                        Tên người nhận: {data?.name}
                      </p>
                      <p className="mt-1" style={{ fontSize: "13px" }}>
                        Email: {data?.email}
                      </p>
                      <p className="mt-1" style={{ fontSize: "13px" }}>
                        Số điện thoại: {data?.phone}
                      </p>
                      <p className="mt-1" style={{ fontSize: "13px" }}>
                        Hình thức thanh toán:{" "}
                        VNPAY
                        {/* {(data?.paymentType && "SHIP COD") || "VNPAY"} */}
                      </p>
                      <p className="mt-1" style={{ fontSize: "13px" }}>
                        Địa chỉ nhận hàng: {data?.address}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          }
        </div>
      ) || <div></div>)) || <div></div>
  );
};

export default CheckoutSuccess;
