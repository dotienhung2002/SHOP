import { XMarkIcon } from "@heroicons/react/24/outline";
import { Combobox, RadioGroup, Transition } from "@headlessui/react";

import {
  useRemoveAllCartMutation,
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "@Services/cart.service";
import { useVoucherQuery } from "@Services/order.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Payment {
  coupon: number;
  ship_cost: number;
  total_price: number;
  total_payment: number;
}
interface ICart {
  cart: any;
  refetchCart: any;
  feeShip: any;
  setSelectedVoucher: any;
  selectedVoucher: any;
  isUse: any;
  setIsUse: any;
}
const plans = [
  {
    name: "COD",
    ram: "Thanh toán khi nhận hàng",
    value: "1",
  },
  // {
  //   name: "Thanh toán bằng VNPAY",
  //   ram: "",
  //   value: "2",
  // },
];
export default function Cart(props: ICart) {
  const [payment, setPayment] = useState<Payment>();
  const [removeCart] = useRemoveCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [removeAll] = useRemoveAllCartMutation();
  const voucher = useVoucherQuery("");

  useEffect(() => {
    let total_payment = 0;
    let total_price = 0;
    let coupon = 0;
    props.cart?.cartProducts?.forEach((item: any) => {
      total_payment += item?.quantity * item?.productDetail?.promotionPrice;
      total_price += item?.quantity * item?.productDetail?.originPrice;
      coupon = total_price - total_payment;
    });
    setPayment({
      coupon: coupon,
      ship_cost: 0,
      total_price: total_price - coupon,
      total_payment:
        total_payment + props.feeShip - (props.selectedVoucher?.money || 0),
    });
  }, [props.cart, props.feeShip, props.isUse]);

  const numberToCurrencyStyle = (x: any) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleUpdateCart = async (item: any, action: string) => {
    let quantity = item.quantity;
    switch (action) {
      case "+":
        quantity += 1;
        break;

      case "-":
        quantity -= 1;

        break;

      default:
        break;
    }
    await updateCart({
      productDetailId: item.productDetailId,
      userAuthToken: localStorage.getItem("device_user"),
      registeredUser: false,
      quantity: quantity,
    }).then(() => {
      props.refetchCart();
    });
  };
  return (
    <div className="pointer-events-auto  mb-10">
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl lg:mt-10">
        <div className="overflow-y-auto py-6 px-4 sm:px-6">
          <div className="">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {/* {products.map((product) => (
                <li key={product?.id} className="flex py-6">
                  <div className="border-gray-200 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={product?.imageSrc}
                      alt={product?.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="text-gray-900 flex justify-between text-base font-medium">
                        <h3>
                          <Link href={product?.href}>{product?.name}</a>
                        </h3>
                        <p className="ml-4 w-36 text-end">{product?.price}</p>
                      </div>
                      <p className="text-gray-500 mt-1 text-sm">
                        {product?.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Qty {product?.quantity}
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          className="text-black hover:text-indigo-500 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))} */}
                {(props.cart?.cartProducts &&
                  props.cart?.cartProducts?.map((item: any, index: number) => (
                    <li key={index} className="flex py-6">
                      <div className="h-28 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Link to={"/product/" + item?.productDetail?.productId}>
                          <img
                            src={
                              item?.productDetail?.listProductImage?.length >
                                0 &&
                              item?.productDetail?.listProductImage[0].image
                            }
                            className="h-full w-full object-cover object-center"
                            alt="example"
                          />
                        </Link>
                      </div>

                      <div className="ml-10 flex flex-1 flex-col">
                        <div>
                          <div className="flex flex-col justify-between text-base font-medium text-gray-900 lg:flex-row">
                            <h3>
                              <Link
                                to={
                                  "/product/" + item?.productDetail?.productId
                                }
                                className="text-xs lg:text-base"
                              >
                                {item?.productName}
                              </Link>
                              <br />
                              <span className="text-xs">
                                {item?.productDetail?.color?.name +
                                  " / " +
                                  item?.productDetail?.size?.name}
                              </span>
                            </h3>
                            <div>
                              {item?.productDetail?.promotionPrice !=
                                item?.productDetail?.originPrice && (
                                <p className="w-36 pt-2 text-sm text-gray-400 line-through lg:ml-4 lg:text-end lg:text-base">
                                  {numberToCurrencyStyle(
                                    item?.productDetail?.originPrice
                                  )}{" "}
                                  đ
                                </p>
                              )}

                              <p className="w-36 pt-2 text-sm lg:ml-4 lg:text-end lg:text-base">
                                {numberToCurrencyStyle(
                                  item?.productDetail?.promotionPrice
                                )}{" "}
                                đ
                              </p>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {/* {product?.color} */}
                          </p>
                        </div>
                        {/* <div className="mt-5 flex gap-2">
                        <select
                          id="color"
                          className="w-15 h-8 rounded-lg border border-gray-300 bg-gray-50  py-1 px-2 text-xs text-gray-900 "
                        >
                          <option value="US">xám</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                        <select
                          id="size"
                          className="w-15 h-8 rounded-lg border border-gray-300 bg-gray-50  py-1 px-2 text-xs text-gray-900 "
                        >
                          <option value="US">XXL</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                      </div> */}
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="mt-1 flex h-5 flex-row rounded-lg bg-white text-xs">
                            <button
                              data-action="decrement"
                              onClick={() => handleUpdateCart(item, "-")}
                              className=" h-full w-5 cursor-pointer rounded-l bg-gray-200 text-gray-600 outline-none"
                            >
                              <span className="m-auto  font-thin">−</span>
                            </button>
                            <input
                              type="text"
                              className=" md:text-basecursor-default  flex w-10 items-center border-none bg-gray-200 text-center text-xs font-semibold  text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none"
                              name="custom-input-number"
                              value={item?.quantity}
                              disabled
                            ></input>
                            <button
                              data-action="increment"
                              className="text-gray-60 h-full w-5 cursor-pointer rounded-r bg-gray-200"
                              onClick={() => handleUpdateCart(item, "+")}
                            >
                              <span className="m-auto  font-thin">+</span>
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={async () => {
                                await removeCart({
                                  productDetailId: item.productDetailId,
                                  userAuthToken:
                                    localStorage.getItem("device_user"),
                                }).then(() => {
                                  props.refetchCart();
                                });
                              }}
                              className="font-medium text-black "
                            >
                              Xoá
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))) || (
                  <div className="text-center">
                    Không có sản phẩm nào trong giỏ hàng!
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <RadioGroup
          value={props.selectedVoucher}
          onChange={(e) => {
            if (!props.isUse) {
              props.setSelectedVoucher(e);
            }
          }}
        >
          <div className="flex gap-5 space-y-2 overflow-scroll p-5">
            {voucher.data?.data?.map((plan: any) => (
              <RadioGroup.Option
                key={plan?.code}
                value={plan}
                style={{ width: "500px", padding: "10px" }}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 "
                      : ""
                  }
                  ${checked ? "bg-gray-900 text-white" : "bg-white"}
                    relative  cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className=" items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`  ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          <span className="font-bold ">{plan.code}</span> (
                          <span className="text-xs ">còn {plan?.slot}</span>)
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-sky-100" : "text-black"
                          }`}
                        >
                          <span className="py-4 text-xs">{plan.name} </span>{" "}
                          <div className="py-2 text-xs ">
                            Giảm{" "}
                            <span className="font-bold">
                              {numberToCurrencyStyle(plan.money)}
                            </span>{" "}
                          </div>{" "}
                        </RadioGroup.Description>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        {(!props.isUse && (
          <button
            onClick={() => {
              if (props.selectedVoucher) {
                props.setIsUse(true);
              }
            }}
            className="my-4  mx-5   ml-auto flex items-center rounded-md border border-transparent bg-black py-2  px-5 text-center text-base font-medium text-white  hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Áp dụng
          </button>
        )) || (
          <button
            onClick={() => {
              props.setIsUse(false);
              props.setSelectedVoucher(null);
            }}
            className="my-4  mx-5   ml-auto flex items-center rounded-md border border-transparent bg-black py-2  px-5 text-center text-base font-medium text-white  hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Huỷ
          </button>
        )}
        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Tạm tính</p>
            <p>{numberToCurrencyStyle(payment?.total_price) || 0} đ</p>
          </div>
          {/* <div className="my-4 flex justify-between text-base font-medium text-gray-900">
            <p>Giảm giá</p>
            <p>- {numberToCurrencyStyle(payment?.coupon) || 0} đ</p>
          </div> */}
          <div className="my-4 flex justify-between text-base font-medium text-gray-900">
            <p>Phiếu quà tặng</p>
            <p>
              -{" "}
              {(props.isUse &&
                numberToCurrencyStyle(props.selectedVoucher?.money)) ||
                0}{" "}
              đ
            </p>
          </div>
          <div className="my-4 flex justify-between text-base font-medium text-gray-900">
            <p>Phí giao hàng</p>
            <p>+ {numberToCurrencyStyle(props.feeShip) || 0} đ</p>
          </div>
          <div className="my-7 flex justify-between border-t pt-7 text-base font-medium text-gray-900">
            <p>Tổng</p>
            <p className="text-2xl">
              {numberToCurrencyStyle(payment?.total_payment) || 0} đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
