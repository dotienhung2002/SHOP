import { Tab } from "@headlessui/react";
import { useAppDispatch } from "@Hooks/reduxHook";
import { increaseCart } from "@Redux/reducers/common/cartReducer";
import { useAddCartMutation } from "@Services/cart.service";
import { useGetAllProductQuery } from "@Services/product.service";
import { Product, ProductDetail, ProductSize } from "@Types/product.type";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import BannerFooter from "@Views/pages/BannerFooter";
import { ToastContent } from "../product/product-detail";

export default function FastSellingProduct() {
  const { data } = useGetAllProductQuery("");
  const dispatch = useAppDispatch();
  const [addCart] = useAddCartMutation();
  const navigate = useNavigate();
  const settings = {
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

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  // const [selected, setSelected] = useState<any>();
  // const [selectedSize, setSelectedSize] = useState<any>();
  const numberToCurrencyStyle = (x: any) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <div className="container w-full  lg:px-2 ">
        <h1 className="my-10 font-bold">Xỏ ngay, yêu luôn</h1>
        {data?.data?.length > 0 && (
          <div>
            <Slider {...settings}>
              {data?.data?.map((product: Product, index: number) => (
                <div key={product.id} className="relative px-2  py-5 ">
                  <Tab.Group>
                    <Tab.Panels className="mt-2">
                      {product.listProductDetail?.map(
                        (detail: ProductDetail, indexDetail: number) => (
                          <Tab.Panel
                            key={indexDetail}
                            className={classNames(
                              "rounded-xl bg-white ",
                              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            )}
                          >
                            <div className="absolute bottom-44 left-5">
                              <ul className="flex flex-row gap-1 ">
                                {detail?.listSize?.map(
                                  (size: ProductSize, sizeIndex) => (
                                    <li
                                      key={sizeIndex}
                                      onClick={(e) => handleAddCart(size)}
                                      className="w-10  cursor-pointer rounded-lg bg-white p-2 text-center text-xs transition delay-100 duration-300 ease-in-out hover:bg-slate-900    hover:text-white"
                                    >
                                      {size?.name}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <img
                              src={detail?.listProductImage[0]?.image}
                              alt=""
                              style={{ width: "100%", height: "400px" }}
                              className="my-3 cursor-pointer rounded-lg object-cover
                          "
                              onClick={() => navigate("/product/" + product.id)}
                            />
                          </Tab.Panel>
                        )
                      )}
                      {product.listProductDetail[index]?.listSize?.map(
                        (size: ProductSize, indexSize: number) => (
                          <Tab.Panel
                            key={indexSize}
                            className={classNames(
                              "rounded-xl bg-white p-3 ",
                              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            )}
                          >
                            {size.name}
                          </Tab.Panel>
                        )
                      )}
                    </Tab.Panels>
                    <Tab.List className="flex space-x-1 rounded-xl  p-1">
                      {product.listProductDetail?.map(
                        (detail: ProductDetail, indexDetail: number) => (
                          <Tab
                            key={indexDetail}
                            className={({ selected }) =>
                              classNames(
                                "w-10  rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                                "ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2",
                                selected
                                  ? "bg-white shadow "
                                  : "text-blue-100  hover:text-white "
                              )
                            }
                            style={{
                              background: detail.color?.description,
                              border: "1px solid #d9cece",
                            }}
                          ></Tab>
                        )
                      )}
                    </Tab.List>
                    <h3 className="text-box my-3 mx-1 text-sm font-semibold">
                      <span aria-hidden="true" />
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      <div className="flex flex-row gap-4">
                        <span className="text-red-600">
                          {" "}
                          {numberToCurrencyStyle(
                            product?.listProductDetail[0]?.promotionPrice
                          )}
                          đ
                        </span>
                        {product?.listProductDetail[0]?.promotionPercentage !==
                          0 && (
                          <>
                            <span className="line-through">
                              {" "}
                              {numberToCurrencyStyle(
                                product?.listProductDetail[0]?.originPrice
                              )}
                              đ
                            </span>
                            <span className="text-red-600">
                              {" "}
                              -
                              {numberToCurrencyStyle(
                                product?.listProductDetail[0]
                                  ?.promotionPercentage
                              )}
                              %
                            </span>
                          </>
                        )}
                      </div>
                    </p>
                  </Tab.Group>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      {!data && (
        <div className="grid grid-cols-4 gap-5 px-10 lg:px-28">
          <div className="col-span-full lg:col-span-1">
            <div className="border-black-300 mx-auto w-full max-w-sm rounded-md border p-4 shadow">
              <div
                className=" w-100 mb-10 animate-pulse bg-gray-200 py-10"
                style={{ height: "300px" }}
              ></div>

              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1">
            <div className="border-black-300 mx-auto w-full max-w-sm rounded-md border p-4 shadow">
              <div
                className=" w-100 mb-10 animate-pulse bg-gray-200 py-10"
                style={{ height: "300px" }}
              ></div>

              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1">
            <div className="border-black-300 mx-auto w-full max-w-sm rounded-md border p-4 shadow">
              <div
                className=" w-100 mb-10 animate-pulse bg-gray-200 py-10"
                style={{ height: "300px" }}
              ></div>

              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1">
            <div className="border-black-300 mx-auto w-full max-w-sm rounded-md border p-4 shadow">
              <div
                className=" w-100 mb-10 animate-pulse bg-gray-200 py-10"
                style={{ height: "300px" }}
              ></div>

              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container my-14   w-full px-2  sm:px-0">
        <div className="bg-gray-100">
          <div className="">
            <div className="grid grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <div className="py-10 px-14">
                  <h1 className="text-black">Dành cho chính bạn</h1>
                  <p className="text-sm text-black">
                    Người đàn ông tốt là người tự biết chăm sóc bản thân anh ấy.
                    Vì đàn ông cũng có quyền được nhận quà, và nếu như bạn chưa
                    có QUÀ, thì hãy tự tin tự sắm cho mình một hộp đồ cửa hàng
                    giày của chúng tôi.
                  </p>
                  <button
                    type="submit"
                    className="mt-6  items-center justify-center rounded-md border border-transparent bg-black py-1 px-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Tìm hiểu thêm
                  </button>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <img
                  width={"100%"}
                  height={300}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_9nUTgn7S27advSTpj46kLIpepYFaqKv2Q&usqp=CAU"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container my-14   w-full px-2  sm:px-0">
        <h1 className="mt-20 text-4xl font-bold">FUSAMATE BASIC</h1>
        <div className="bg-white">
          <div className="">
            <nav aria-label="Breadcrumb">
              <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li className="text-sm"></li>
              </ol>
            </nav>

            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                  alt={"name"}
                  className="h-full w-full object-cover object-center
                  "
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                    alt="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                    alt="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-w-4 aspect-h-5 lg:aspect-w-3 lg:aspect-h-4 sm:overflow-hidden sm:rounded-lg">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
                  alt="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container my-14   w-full px-2  sm:px-0">
        <BannerFooter />
      </div> */}
      <div className="container my-14   w-full px-2  sm:px-0">
        <div className="">
          <div className="">
            <div className="grid grid-cols-2 gap-10">
              <div className=" col-span-2 lg:col-span-1">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxWG0mi-MaUCV5AbM8rZH6QrSHIRvc7KhiMw&usqp=CAU"
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <div className=" col-span-2 lg:col-span-1">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaZxpvUFYANT2TMyhTmmBo03IJiIjXl-n2jw&usqp=CAU"
                  alt=""
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-14   w-full px-2  sm:px-0">
        <div className="bg-gray-100">
          <div className="">
            <div className="grid grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFARo6r_WSKQtRmYXRZQ1PigkfmK6SnNqwLw&usqp=CAU"
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="py-10 px-14">
                  <h1
                    className="text-start text-6xl text-black "
                    style={{ lineHeight: "75px" }}
                  >
                    Trải nghiệm mua sắm hài lòng với cửa hàng giày của chúng tôi
                  </h1>
                  <p className="text-sm text-black">Giá cả hợp lý</p>
                  <p className="text-sm text-black">Dịch vụ 100% hài lòng</p>
                  <p className="text-sm text-black">60 ngày đổi trả</p>
                  <p className="text-sm text-black">
                    Tự hào sản xuất tại Việt Nam
                  </p>
                  <button
                    type="submit"
                    className="mt-6  items-center justify-center rounded-md border border-transparent bg-black py-1 px-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Tìm hiểu thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
