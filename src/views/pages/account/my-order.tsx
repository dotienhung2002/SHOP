import { useCancelOrderMutation } from "@Services/order.service";
import { useNavigate } from "react-router-dom";

const MyOrder = ({
  numberToCurrencyStyle,
  data,
  statusBlock,
  handleGetMyOrder,
}: any) => {
  const [cancelOrder] = useCancelOrderMutation();
  const navigate = useNavigate();
  return (
    <section className="bg-slateGray-50 py-1">
      <div className="mx-auto  mb-12 w-full  xl:mb-0 ">
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-1 flex-grow px-2">
                <h3 className="text-blueGray-700 text-base font-semibold">
                  Đơn hàng của tôi
                </h3>
              </div>
              <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
                {/* <button
                                className="mr-1 mb-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-black text-white"
                                type="button"
                              >
                                See all
                              </button> */}
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse items-center bg-transparent ">
              <thead>
                <tr>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    #
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Ngày đặt
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Số lượng
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Tổng đơn giá
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Trạng thái
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                    Chi tiết
                  </th>
                  <th className="bg-slateGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase"></th>
                </tr>
              </thead>

              <tbody>
                {data?.map((item: any, index: number) => (
                  <tr>
                    <th className="text-blueGray-700 whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs ">
                      {item?.id}
                    </th>
                    <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                      {item?.createdAt}
                    </td>
                    <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                      {item?.listOrderDetail?.length}
                    </td>
                    <td className="align-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs">
                      {numberToCurrencyStyle(item?.totalPayment)} đ
                    </td>
                    <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                      <i className="fas fa-arrow-up mr-4 text-emerald-500"></i>

                      <span style={{ color: statusBlock[item?.status]?.bg }}>
                        {statusBlock[item?.status]?.text}
                      </span>
                    </td>
                    <td className="cursor-pointer whitespace-nowrap border-t-0 border-l-0 border-r-0  p-4 px-6 align-middle text-xs">
                      <i className="fas fa-arrow-up mr-4 text-emerald-500"></i>
                      <span
                        className="text-primary "
                        style={{ textDecoration: "underline" }}
                        onClick={() => navigate("/my-order/" + item?.id)}
                      >
                        Chi tiết
                      </span>
                    </td>
                    {item?.status <= 2 && (
                      <td className="cursor-pointer  whitespace-nowrap border-t-0 border-l-0 border-r-0  p-4 px-6 align-middle text-xs">
                        <i className="fas fa-arrow-up mr-4 text-emerald-500"></i>
                        <span
                          style={{ textDecoration: "underline" }}
                          className="text-red-600"
                          onClick={async () => {
                            const checkCancel = window.confirm(
                              "Bạn có chắc chắn muốn huỷ đơn hàng không?"
                            );
                            if (checkCancel) {
                              await cancelOrder(item?.id).then((res) => {
                                handleGetMyOrder();
                              });
                            }
                          }}
                        >
                          Huỷ đơn
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data?.length == 0 && (
            <div className="p-5 text-center text-sm">
              Không có đơn hàng nào!
            </div>
          )}
        </div>
      </div>
      {/* <footer className="relative mt-16 pt-8 pb-6">
                      <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-center md:justify-between">
                          <div className="mx-auto w-full px-4 text-center md:w-6/12">
                            <div className="text-blueGray-500 py-1 text-sm font-semibold">
                              Made with{" "}
                              <Link
                                to="https://www.creative-tim.com/product/notus-js"
                                className="text-blueGray-500 hover:text-gray-800"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Notus JS
                              </Link>{" "}
                              by{" "}
                              <Link
                                to="https://www.creative-tim.com"
                                className="text-blueGray-500 hover:text-blueGray-800"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {" "}
                                Creative Tim
                              </Link>
                              .
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer> */}
    </section>
  );
};

export default MyOrder;
