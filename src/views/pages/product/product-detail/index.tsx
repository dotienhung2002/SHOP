import { increaseCart } from "@Redux/reducers/common/cartReducer";
import { RadioGroup, Tab } from "@headlessui/react";
import { useAddCartMutation, useGetCartQuery } from "@Services/cart.service";
import {
  useGetDetailProductQuery,
  useLazyGetAllByKeyQuery,
} from "@Services/product.service";
import {
  Product,
  ProductDetail as ProductDetailType,
  ProductSize,
} from "@Types/product.type";
import { useAppDispatch } from "@Hooks/reduxHook";

import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const numberToCurrencyStyle = (x: any) => {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
interface AddCart {
  cart: {
    name: string;
    image: string;
    color: string;
    size: string;
    price: string;
  };
  navigate: any;
}
export const ToastContent = (props: AddCart) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper p-2 ">
        <p className="text-sm font-bold">Đã thêm vào giỏ hàng</p>
        <div className="my-4 border-t-2 border-t-black"></div>
        <div className="flex flex-row gap-3">
          <img src={props.cart.image} alt="example" className="h-24 w-20" />
          <div className="flex flex-col justify-between">
            <div className="text-sm font-bold">{props.cart.name}</div>
            <div className="text-sm">
              {props.cart.color} / {props.cart.size}
              <br />
            </div>
            <div className="text-sm font-bold">
              {numberToCurrencyStyle(props.cart.price)} đ
              <br />
            </div>
          </div>
        </div>
        <button
          onClick={() => props.navigate("/cart")}
          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-1 px-6 text-base font-medium text-white text-white  hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Xem giỏ hàng
        </button>
      </div>
    </div>
  </Fragment>
);
export default function ProductDetail() {
  const { register, handleSubmit } = useForm();
  const [dataRelation, setDataRelation] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [triggerFindName] = useLazyGetAllByKeyQuery();

  const { data } = useGetDetailProductQuery(id);
  const [product, setProduct] = useState<Product>();
  const [addCart] = useAddCartMutation();
  const cart = useGetCartQuery(localStorage.getItem("device_user"));
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    if (cart.data) {
      localStorage.setItem("count_cart", cart.data?.cartProducts?.length);
    }
  }, [cart.data]);
  useEffect(() => {
    if (data) {
      const init = async () => {
        await triggerFindName(data?.name?.slice(0, 2)).then((res) => {
          setDataRelation(res?.data?.data);
          console.log("res?.data?.data");
          console.log(res?.data?.data);
        });
      };
      init();
    }
  }, [data]);
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<ProductDetailType>();
  const [selectedSize, setSelectSize] = useState<number>();

  const onSubmit = async (data: any) => {
    const device_user = uuidv4();
    const token = localStorage.getItem("device_user");
    console.log(
      selectedProductDetail?.listSize?.find((item) => item.id === selectedSize)
        ?.productDetailId
    );

    const customData = {
      userAuthToken: token || device_user,
      registeredUser: false,
      productDetailId: selectedProductDetail?.listSize?.find(
        (item) => item.id === selectedSize
      )?.productDetailId,
      quantity: data.quantity,
    };

    await addCart(customData).then((res: any) => {
      localStorage.setItem("device_user", customData.userAuthToken);

      const data = res?.data?.data;
      const _cart: any = {
        color: data.color,
        image: data?.image,
        name: data?.itemName,
        price: data.price,
        size: data.size,
      };
      toast.info(<ToastContent cart={_cart} navigate={navigate} />, {
        icon: false,
      });
      cart.refetch();
    });
  };
  useEffect(() => {
    data && setProduct(data);
  }, [data]);

  useEffect(() => {
    if (product) {
      setSelectedProductDetail(product.listProductDetail[0]);
    }
  }, [product]);
  const handleSelectProductDetail = (colorId: number) => {
    product?.listProductDetail.forEach((item) => {
      if (item.color?.id === colorId) {
        setSelectedProductDetail(item);
      }
    });
  };
  const settingsForRelation = {
    autoplaySpeed: 2000,
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleAddCart = async (value: any) => {
    const device_user = uuidv4();
    const token = localStorage.getItem("device_user");
    const customData = {
      userAuthToken: token || device_user,
      registeredUser: localStorage.getItem("is_login") == "1",
      productDetailId: value?.productDetailId,
      quantity: 1,
    };
    await addCart(customData).then((res: any) => {
      localStorage.setItem("device_user", customData.userAuthToken);
      const data = res.data.data;
      const _cart: any = {
        color: data.color,
        image: data?.image,
        name: data?.itemName,
        price: data.price,
        size: data.size,
      };

      toast.info(<ToastContent cart={_cart} navigate={navigate} />, {
        icon: false,
      });
      dispatch(increaseCart(1));
    });
  };
  const settings = {
    customPaging: (i: number) => {
      console.log(i);

      return (
        <div className="ring-2 ring-slate-50">
          <img
            src={selectedProductDetail?.listProductImage[i]?.image}
            alt="example"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    data && (
      <div id="product-detail">
        {
          <>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
              <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-7">
                  <Slider {...settings}>
                    {selectedProductDetail?.listProductImage?.map(
                      (item, index) => (
                        <div key={index}>
                          <img
                            src={item?.image}
                            alt={product?.name}
                            className="object-cover object-center"
                            style={{ height: "600px" }}
                            width={"100%"}
                          />
                        </div>
                      )
                    )}
                  </Slider>
                </div>
                <div className="sm:col-span-8 lg:col-span-5">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {product?.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Thông tin sản phẩm
                    </h3>

                    <p className="text-2xl text-gray-700">
                      <div className="flex flex-row gap-4">
                        <span>
                          {numberToCurrencyStyle(
                            selectedProductDetail?.promotionPrice
                          )}
                          đ
                        </span>
                        {/* <span className="text-red-600"> {product.listProductDetail[0].promotionPrice}đ</span> */}
                        {selectedProductDetail?.promotionPercentage !== 0 && (
                          <>
                            <span className="text-gray-500 line-through ">
                              {" "}
                              {numberToCurrencyStyle(
                                selectedProductDetail?.originPrice
                              )}
                              đ
                            </span>
                            <span className="text-red-600">
                              {" "}
                              -{selectedProductDetail?.promotionPercentage}%
                            </span>
                          </>
                        )}
                      </div>
                    </p>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Màu sắc: {selectedProductDetail?.color?.name}
                        </h4>

                        <RadioGroup
                          value={selectedProductDetail?.color?.id}
                          onChange={(id: any) => {
                            handleSelectProductDetail(id);
                          }}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Chọn màu sắc
                          </RadioGroup.Label>
                          <span className="flex items-center space-x-3">
                            {product?.listProductDetail?.map((detail) => (
                              <RadioGroup.Option
                                key={detail.color?.id}
                                value={detail.color?.id}
                                className={({ active, checked }) =>
                                  classNames(
                                    active && checked
                                      ? "ring ring-offset-1"
                                      : "",
                                    !active && checked ? "ring-2" : "",
                                    "relative -m-0.5 flex cursor-pointer items-center justify-center  p-0.5 focus:outline-none"
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {detail.color?.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  style={{
                                    background: `${detail?.color?.description}`,
                                  }}
                                  className={classNames(
                                    "h-8 w-8 border  border-black border-opacity-10"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </span>
                        </RadioGroup>
                      </div>
                      {/* Sizes */}
                      <div className="mt-10">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            Kích cỡ:{" "}
                            {
                              selectedProductDetail?.listSize.find(
                                (item) => item?.id === selectedSize
                              )?.name
                            }
                          </h4>
                          <Link
                            to={"/size"}
                            className="text-sm font-medium text-black hover:text-indigo-500"
                          >
                            Hướng dẫn chọn size
                          </Link>
                        </div>

                        <RadioGroup
                          value={selectedSize}
                          onChange={(e: any) => {
                            setSelectSize(e);
                          }}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            {" "}
                            Choose a size{" "}
                          </RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4">
                            {selectedProductDetail?.listSize?.map(
                              (size, index) => (
                                <RadioGroup.Option
                                  key={index}
                                  value={size?.id}
                                  disabled={size?.availAmount <= 0}
                                  className={({ active, checked }) =>
                                    classNames(
                                      size.availAmount > 0
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm "
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",

                                      size.availAmount > 0 && checked
                                        ? "ring-2 ring-indigo-500"
                                        : "",
                                      "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">
                                        {size.name}
                                      </RadioGroup.Label>
                                      {size?.availAmount > 0 ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked
                                              ? "border-indigo-500"
                                              : "border-transparent",
                                            "pointer-events-none absolute -inset-px rounded-md"
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line
                                              x1={0}
                                              y1={100}
                                              x2={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </RadioGroup.Option>
                              )
                            )}
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]"></label>
                        <input
                          type="number"
                          id="guest"
                          placeholder="Số lượng"
                          min="1"
                          defaultValue={1}
                          {...register("quantity")}
                          max={
                            selectedProductDetail?.listSize.find(
                              (item) => item?.id === selectedSize
                            )?.availAmount
                          }
                          className="w-full appearance-none rounded-md border border-[black] bg-white py-3 px-6 text-base font-medium text-[black] outline-none focus:border-[#2c2ce0] focus:shadow-md"
                        />
                      </div>
                      <button
                        // transition ease-in-out delay-100 bg-slate-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300
                        type="submit"
                        className="mt-6 flex w-full  items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                      
                      "
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </form>
                  </section>
                  <p className="my-10">
                    Mô tả:
                    <div className="text-md lg:text-base">
                      {" "}
                      {data?.description}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    )
  );
}
