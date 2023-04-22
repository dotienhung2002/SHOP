import { useLazyGetOrderDetailQuery } from "@Services/order.service";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderDetail = ({ id, numberToCurrencyStyle, statusBlock }: any) => {
  const navigate = useNavigate();
  const [triggerGetDetail] = useLazyGetOrderDetailQuery();
  const [data, setData] = useState<any>([]);
  const handleGetDetail = async () => {
    await triggerGetDetail(id).then((res) => {
      setData(res?.data);
    });
  };
  useEffect(() => {
    handleGetDetail();
  }, []);

  console.log(data);

  return (
    <section className="bg-slateGray-50 py-1">
      <div className="mx-auto  mb-12 w-full  xl:mb-0 ">
        <button className="p-3 underline" onClick={() => navigate("/my-order")}>
          Quay lại
        </button>
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <h3 className="text-blueGray-700 my-3 justify-center text-center text-2xl font-semibold">
              Thông tin đơn hàng của bạn
            </h3>
            <div className="grid grid-flow-row grid-cols-3 items-center justify-center ">
              <div className="relative col-span-2 w-full max-w-full flex-grow px-2 text-end">
                <h3 className="text-blueGray-700 my-5 justify-center text-end text-base font-semibold">
                  Đơn hàng: #{data?.id}{" "}
                  <span
                    style={{ color: statusBlock[data?.status]?.bg }}
                    className={"rounded-lg border-2 p-2"}
                  >
                    {statusBlock[data?.status]?.text}
                  </span>
                </h3>
              </div>
              <div className="relative col-span-1 w-full max-w-full  flex-grow px-2 text-end">
                <span className="text-sm">Ngày đặt: {data?.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse items-center bg-transparent ">
              <thead>
                <tr>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Tên sản phẩm
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Số lượng
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Giá niêm yết
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Biến thể
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Tổng tiền
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.listOrderDetail?.map((item: any, index: number) => (
                  <tr>
                    <th className="text-blueGray-700 whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs ">
                      {item?.name}
                    </th>
                    <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-center align-middle text-xs">
                      {item?.quantity}
                    </td>
                    <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                      {numberToCurrencyStyle(item?.listedPrice)} đ
                    </td>
                    <td className="align-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs">
                      {item?.variant}
                    </td>
                    <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                      {numberToCurrencyStyle(item?.subPrice)} đ
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                    Tổng tiền
                  </td>
                  <td colSpan={3}></td>

                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                    {numberToCurrencyStyle(data?.totalPrice)} đ
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                    Phiếu quà tặng
                  </td>
                  <td colSpan={3}></td>
                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                    - {numberToCurrencyStyle(data?.voucher)} đ
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                    Phí giao hàng
                  </td>
                  <td colSpan={3}></td>

                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                    + {numberToCurrencyStyle(data?.shipCost)} đ
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-sm font-bold ">
                    Tổng thanh toán
                  </td>
                  <td colSpan={3}></td>

                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-sm font-bold">
                    {numberToCurrencyStyle(data?.totalPayment)} đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer className="relative mt-4 pt-8 pb-6">
        <h3 className="text-blueGray-700 my-3 justify-center text-center text-2xl font-semibold">
          Thông tin nhận hàng
        </h3>
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <ul className="p-5">
              <li className="text-sm " style={{ lineHeight: "30px" }}>
                Tên người nhận: <span className="font-bold">{data?.name}</span>{" "}
              </li>
              <li className="text-sm " style={{ lineHeight: "30px" }}>
                Địa chỉ email: <span className="font-bold">{data?.email}</span>{" "}
              </li>
              <li className="text-sm " style={{ lineHeight: "30px" }}>
                Số điện thoại: <span className="font-bold">{data?.phone}</span>{" "}
              </li>
              <li className="text-sm " style={{ lineHeight: "30px" }}>
                Hình thức thanh toán:{" "}
                <span className="font-bold">
                  {(data?.paymentType == 1 && "SHIP COD") || "VNPAY"}
                </span>{" "}
              </li>
              <li className="text-sm " style={{ lineHeight: "30px" }}>
                Địa chỉ giao hàng:{" "}
                <span className="font-bold">{data?.address}</span>{" "}
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default OrderDetail;
