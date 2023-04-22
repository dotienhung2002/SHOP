import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const CheckoutSuccessCod = () => {
  const { state, search } = useLocation();
  const [data, setData] = useState(state?.data?.data);
  const location = useLocation();

  console.log(data);
  
  const navigate = useNavigate();
  const numberToCurrencyStyle = (x: any) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    (
      <div className="container py-5">
        <h1 className="text-xl lg:text-2xl font-semibold uppercase">
          Đặt hàng thành công
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
            <div className="text-center ">
              {" "}
              <p className="text-lg">
                Cuộc sống có nhiều lựa chọn. Cảm ơn bạn đã chọn FUSAMATE, Kenny!
              </p>
              <div className="my-5 text-sm">
                Đơn hàng của bạn CHẮC CHẮN đã được chuyển tới hệ thống xử lí đơn
                hàng của FUSAMATE.
                <br />
                Trong quá trình xử lý FUSAMATE sẽ liên hệ lại nếu như cần thêm
                thông tin từ bạn.
                <br />
                Ngoài ra FUSAMATE cũng sẽ có gửi xác nhận đơn hàng bằng Email và
                tin nhắn
              </div>
            </div>
            <div className="grid grid-flow-col  grid-cols-3 gap-10">
              <div className=" col-span-full lg:col-span-2  ">
                <h2 className="py-5 text-xl lg:text-2xl text-center lg:text-start font-bold">Thông tin đơn hàng</h2>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-left text-sm text-white">
                    <thead className="bg-gray-500 text-xs uppercase text-white dark:text-white">
                      <tr>
                        <th scope="col" className="py-3 text-xs  px-4 lg:px-2 " style={{fontSize:"13px"}}>
                          Tên sản phẩm
                        </th>
                        <th scope="col" className="py-3 text-xs  px-4 lg:px-2 " style={{fontSize:"13px"}}>
                          Số lượng
                        </th>
                        <th scope="col" className="py-3 text-xs  px-4 lg:px-2 " style={{fontSize:"13px"}}>
                          Giá bán
                        </th>
                        <th scope="col" className="py-3 text-xs  px-4 lg:px-2 " style={{fontSize:"13px"}}>
                          Biến thể
                        </th>
                        <th scope="col" className="py-3 text-xs  px-4 lg:px-2 " style={{fontSize:"13px"}}>
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {state?.data?.data?.listOrderDetail?.map(
                        (item: any, index: number) => (
                          <tr
                            className="border-b b dark:border-gray-700 bg-gray-800"
                            key={index}
                          >
                            <th
                              scope="row"
                              className="whitespace-nowrap py-4 text-xs  px-4 lg:px-2 font-medium text-white  dark:text-white"
                              style={{
                                
                                fontSize:"13px",
                              }}
                            >
                              {item?.name}
                            </th>
                            <td className="py-4 text-xs  px-4 lg:px-2 text-white" style={{fontSize:"13px"}}>
                              {item?.quantity}
                            </td>
                            <td className="py-4 text-xs  px-4 lg:px-2 text-white" style={{fontSize:"13px",minWidth:"100px"}}>
                              {numberToCurrencyStyle(item?.listedPrice)} đ
                              {/* <span className="line-through">{item?.subPrice}</span> */}
                            </td>
                            <td className="py-4 text-xs  px-4 lg:px-2 text-white" style={{fontSize:"13px",minWidth:"100px"}}>
                              {item?.variant}
                            </td>
                            <td className="py-4 text-xs  px-4 lg:px-2 text-white" style={{fontSize:"13px",minWidth:"100px"}}>
                              {numberToCurrencyStyle(item?.subPrice)} đ
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                
                </div>
             
                  <div className="grid grid-flow-col  lg:grid-cols-6   border-b-2 border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 ">
                    <div className=" px-5 lg:px-0   col-start-1 lg:col-start-4" style={{fontSize:"13px"}}>Tổng tiền</div>
                    <div className="col-end-7 " style={{fontSize:"13px"}}>
                      {numberToCurrencyStyle(data?.totalPrice)} đ
                    </div>
                  </div>
                 
                  <div className="grid grid-flow-col  lg:grid-cols-6   border-b-2 border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 ">
                    <div className=" px-5 lg:px-0   col-start-1 lg:col-start-4" style={{fontSize:"13px"}}>Phiếu quà tặng</div>
                    <div className="col-end-7 " style={{fontSize:"13px"}}>
                      {numberToCurrencyStyle(data?.totalPayment-data?.totalPrice-data?.shipCost)} đ
                    </div>
                  </div>
                  <div className="grid grid-flow-col  lg:grid-cols-6   border-b-2 border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 ">
                    <div className=" px-5 lg:px-0   col-start-1 lg:col-start-4" style={{fontSize:"13px"}}>Phí giao hàng</div>
                    <div className="col-end-7 " style={{fontSize:"13px"}}>
                      +{numberToCurrencyStyle(data?.shipCost)} đ
                    </div>
                  </div>
                  <div className="grid grid-flow-col  lg:grid-cols-6   border-b-2 border-l-2 border-r-2 border-b-gray-200 border-l-gray-200 border-r-gray-200 py-4 ">
                    <div className=" px-5 lg:px-0   col-start-1 lg:col-start-4" style={{fontSize:"13px"}}>Tổng thanh toán</div>
                    <div className="col-end-7 " style={{fontSize:"13px"}}>
                      {numberToCurrencyStyle(data?.totalPayment)} đ
                    </div>
                  </div>
              </div>
              <div className="col-span-full lg:col-span-1 px-9 lg:px-0 ">
                <h2 className="py-5 text-xl lg:text-2xl font-bold">Thông tin nhận hàng</h2>
                <p className="mt-1" style={{fontSize:"13px"}}>Tên người nhận: {data?.name}</p>
                <p className="mt-1" style={{fontSize:"13px"}}>Email: {data?.email}</p>
                <p className="mt-1" style={{fontSize:"13px"}}>Số điện thoại: {data?.phone}</p>
                <p className="mt-1" style={{fontSize:"13px"}}>Hình thức thanh toán:  SHIP COD</p>
                <p className="mt-1" style={{fontSize:"13px"}}>Địa chỉ nhận hàng: {data?.address}</p>
              </div>
            </div>
          </>
        }
      </div>
    ) || <div></div>
  );
};

export default CheckoutSuccessCod;
