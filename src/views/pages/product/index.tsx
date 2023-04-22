import { Listbox, Tab, Transition } from "@headlessui/react";
import {
  useGetProductsMutation,
  useLazyGetMadeInQuery,
  useLazyGetProductBrandsQuery,
  useLazyGetProductCategoriesQuery,
} from "@Services/product.service";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@Hooks/reduxHook";
import { Product, ProductDetail, ProductSize } from "@Types/product.type";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCartMutation } from "@Services/cart.service";
import { toast } from "react-toastify";
import { ToastContent } from "./product-detail";
import { increaseCart } from "@Redux/reducers/common/cartReducer";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const initialParams = {
  name: null,
  gender: null,
  brand: {
    id: null,
  },
  category: {
    id: null,
  },
  madeIn: {
    id: null,
  },
  status: null,
  available: null,

  pageNumber: 0,
  pageSize: 10,
  sortBy: "id",
  sortDirection: "ASC",
};
const Collection = () => {
  const [triggerCategory] = useLazyGetProductCategoriesQuery();
  const [triggerMadein] = useLazyGetMadeInQuery();
  const [triggerBrand] = useLazyGetProductBrandsQuery();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [addCart] = useAddCartMutation();

  const [data, setData] = useState<any>([]);

  const search = useLocation().search;
  const [params] = useState(initialParams);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const init = async () => {
      const categoryId: any = query.get("category");
      const madeinId: any = query.get("madeIn");
      const brandId: any = query.get("brand");
      if (categoryId) {
        await triggerCategory(categoryId).then((res: any) => {
          res?.data?.data && setData(res?.data?.data);
        });
      } else if (madeinId) {
        await triggerMadein(madeinId).then((res: any) => {
          res?.data?.data && setData(res?.data?.data);
        });
      } else if (brandId) {
        await triggerBrand(brandId).then((res: any) => {
          res?.data?.data && setData(res?.data?.data);
        });
      }
    };
    init();
  }, [search, params]);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
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
  const numberToCurrencyStyle = (x: any) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const people = [
    { name: "Mới nhất" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];

  const [selected, setSelected] = useState(people[0]);
  return (
    <div className="bg-white pb-20 ">
      <div className="mx-auto max-w-2xl py-10 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* <h2 className=" text-black pb-5 pl-5 text-xl">{data&&data[0]?.category?.name}</h2> */}
        {/* <ComboTest/> */}
        <div className="z-50 pt-5">
          {/* <Listbox value={selected} onChange={setSelected} >
        <div className="relative mt-1">
          <Listbox.Button className="relative  cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox> */}
        </div>
        <hr className="mt-5" />
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((product: Product, index: number) => (
            <div
              key={product.id}
              className="relative   py-5 "
              data-aos="fade-up"
            >
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
                          <ul className="flex flex-row gap-1">
                            {detail?.listSize?.map(
                              (size: ProductSize, sizeIndex) => (
                                <li
                                  key={sizeIndex}
                                  onClick={(e) => handleAddCart(size)}
                                  className="w-10  cursor-pointer rounded-lg  bg-white p-2 text-center text-xs transition delay-100 duration-300 ease-in-out hover:bg-slate-900  hover:text-white"
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
                          className="my-3 cursor-pointer rounded-lg object-cover"
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
                          "rounded-xl bg-white p-3",
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
                            product?.listProductDetail[0]?.promotionPercentage
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
        </div>
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
    </div>
  );
};
export default Collection;
