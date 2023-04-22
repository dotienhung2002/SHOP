import { REGEX_EMAIL, REGEX_PHONE } from "@Constants/regex";
import { Combobox, RadioGroup, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  useGetDistrictsMutation,
  useGetProvincesQuery,
  useGetWardsMutation,
} from "@Services/common.service";
import {
  useGetShipFeeMutation,
  useGetShipServiceMutation,
} from "@Services/order.service";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface PropsPayment {
  submitInfo: (data: any, selectedPayment: any) => void;
  getFee: (data: any) => void;
  feeShip: number;
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

export default function Payment(props: PropsPayment) {
  const [selectedProvince, setSelectedProvince] = useState<any>();
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState<any>();
  const [selectedPayment, setSelectedPayment] = useState(plans[0]);
  const [user_data, setUserData] = useState<any>(() => {
    try {
      if (localStorage.getItem("user_data")) {
        // console.log(JSON.parse( || "{}") || null);
        let payload = JSON.parse(localStorage.getItem("user_data") || "{}");
        return payload;
      }
    } catch (error) {}
  });

  const provinces = useGetProvincesQuery(undefined);
  const [triggerWard, wards] = useGetWardsMutation();
  const [triggerDistricts, districts] = useGetDistrictsMutation();

  const [getShipService, shipService] = useGetShipServiceMutation<any>();
  const [getShipFee, shipFee] = useGetShipFeeMutation();

  useEffect(() => {
    if (selectedProvince) {
      triggerDistricts(selectedProvince.ProvinceID);
    }
    if (selectedDistrict) {
      triggerWard(selectedDistrict?.DistrictID);
      getShipService({
        shop_id: 3153358,
        from_district: 3440,
        to_district: selectedDistrict?.DistrictID,
      });
    }
  }, [selectedDistrict, selectedProvince]);

  useEffect(() => {
    if (shipFee?.data?.data?.total) {
      props.getFee(shipFee?.data?.data?.total);
    }
  }, [shipFee?.data?.data?.total]);
  useEffect(() => {
    if (shipService?.isSuccess) {
      getShipFee({
        service_id: shipService?.data?.data[0]?.service_id,
        from_district_id: 3440,
        to_district_id: selectedDistrict?.DistrictID,
        weight: 1000,
      });
    }
  }, [shipService]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user_data?.name || "",
      email: user_data?.email || "",
      phone: user_data?.phone || "",
      address: "",
      note: "",
      province: "",
      district: "",
      ward: "",
    },
  });

  const onSubmit = (data: any) => {
    props.submitInfo(data, selectedPayment);
  };

  const [queryProvinces, setQueryProvinces] = useState("");
  const [queryDistricts, setQueryDistricts] = useState("");
  const [queryWards, setQueryqueryWards] = useState("");
  const filter = (query: string, array: any, by: string) =>
    query === ""
      ? array
      : array?.filter((item: any) => {
          return item[by]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query?.toLowerCase()?.replace(/\s+/g, ""));
        });

  const filteredProvinces = filter(
    queryProvinces,
    provinces.data?.data,
    "ProvinceName"
  );
  const filteredDistricts = filter(
    queryDistricts,
    districts.data?.data,
    "DistrictName"
  );
  const filteredWards = filter(queryWards, wards.data?.data, "WardName");

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <h2 className="pb-7 text-center  indent-5 text-lg font-bold leading-6 text-gray-900">
        Thông tin vận chuyển
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Vui lòng nhập thông tin này",
                  })}
                  autoComplete="given-name"
                  className={classNames(
                    "mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                    errors["name"] && "border-red-600 focus:ring-red-600 "
                  )}
                />
                <span className="text-xs text-red-500">
                  {(user_data?.name && "") || errors?.name?.message}
                </span>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Vui lòng nhập thông tin này",
                    pattern: {
                      value: REGEX_PHONE,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                  autoComplete="family-name"
                  className={classNames(
                    "mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                    errors["phone"] && "border-red-600 focus:ring-red-600 "
                  )}
                />
                <span className="text-xs text-red-500">
                  {(user_data?.phone && "") || errors?.phone?.message}
                </span>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Vui lòng nhập thông tin này",
                    pattern: {
                      value: REGEX_EMAIL,
                      message: "Email không hợp lệ",
                    },
                  })}
                  disabled={user_data?.email && true}
                  className={classNames(
                    "mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                    errors["email"] && "border-red-600 focus:ring-red-600 "
                  )}
                />
                <span className="text-xs text-red-500">
                  {(user_data?.email && "") || errors?.email?.message}
                </span>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  placeholder="Địa chỉ (ví dụ: 103 Vạn Phúc, phường Vạn Phúc)"
                  {...register("address", {
                    required: "Vui lòng nhập thông tin này",
                  })}
                  autoComplete="street-address"
                  className={classNames(
                    "mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                    errors["address"] && "border-red-600 focus:ring-red-600 "
                  )}
                />
                <span className="text-xs text-red-500">
                  {errors?.address?.message}
                </span>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chọn tỉnh/Thành
                </label>
                <Controller
                  name="province"
                  control={control}
                  rules={{ required: "Vui lòng nhập trường này" }}
                  render={({ field }) => (
                    <Combobox
                      // value={selectedProvince}
                      // onChange={setSelectedProvince}
                      {...field}
                      onChange={(e: any) => {
                        field.onChange(e);
                        setSelectedProvince(e);
                      }}
                    >
                      <div className="relative mt-1">
                        <div className="border-1 border-gray relative w-full cursor-default bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                          <Combobox.Input
                            className={classNames(
                              "w-full  rounded-lg border-gray-300 py-2 pl-3 pr-10 text-sm  leading-5  text-gray-900 focus:ring-0",
                              errors["province"] &&
                                "border-red-600 focus:ring-red-600 "
                            )}
                            displayValue={(person: any) => person?.ProvinceName}
                            onChange={(event) =>
                              setQueryProvinces(event.target.value)
                            }
                            placeholder="Chọn tỉnh/thành"
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQueryProvinces("")}
                        >
                          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
                            {filteredProvinces?.length === 0 &&
                            queryProvinces !== "" ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Không tìm thấy dữ liệu
                              </div>
                            ) : (
                              filteredProvinces?.map(
                                (item: any, index: number) => (
                                  <Combobox.Option
                                    key={index}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-gray-800 text-white"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={item}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`lg:text-md block truncate text-sm ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {item.ProvinceName}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                              active
                                                ? "text-white"
                                                : "text-teal-600"
                                            }`}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Combobox.Option>
                                )
                              )
                            )}
                          </Combobox.Options>
                        </Transition>
                        <span className="text-xs text-red-500">
                          {errors?.province?.message}
                        </span>
                      </div>
                    </Combobox>
                  )}
                />

                {/* <select
                  {...register("province", { required: true })}

                  autoComplete="country-name"
                  className="border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
                >
                  <option>Chọn tỉnh thành</option>
                  {provinces.data?.data?.map((province: any, index: number) => (
                    <option key={index} value={province?.ProvinceID}>
                      {province?.ProvinceName}
                    </option>chọ
                  ))}
                </select> */}
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chọn quận/huyện
                </label>

                <Controller
                  name="district"
                  control={control}
                  rules={{ required: "Vui lòng nhập trường này" }}
                  render={({ field }) => (
                    <Combobox
                      // value={selectedDistrict}
                      // onChange={setSelectedDistrict}
                      {...field}
                      onChange={(e: any) => {
                        field.onChange(e);
                        setSelectedDistrict(e);
                      }}
                    >
                      <div className="relative mt-1">
                        <div className="border-1 border-gray relative w-full cursor-default bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                          <Combobox.Input
                            className={classNames(
                              "w-full  rounded-lg border-gray-300 py-2 pl-3 pr-10 text-sm  leading-5  text-gray-900 focus:ring-0",
                              errors["district"] &&
                                "border-red-600 focus:ring-red-600 "
                            )}
                            displayValue={(person: any) => person?.DistrictName}
                            onChange={(event) =>
                              setQueryDistricts(event.target.value)
                            }
                            placeholder="Chọn quận/huyện"
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQueryDistricts("")}
                        >
                          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredDistricts?.length === 0 &&
                            queryDistricts !== "" ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Không tìm thấy dữ liệu
                              </div>
                            ) : (
                              filteredDistricts?.map(
                                (item: any, index: number) => (
                                  <Combobox.Option
                                    key={index}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-gray-800 text-white"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={item}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`block truncate text-sm lg:text-md${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {item.DistrictName}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                              active
                                                ? "text-white"
                                                : "text-teal-600"
                                            }`}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Combobox.Option>
                                )
                              )
                            )}
                          </Combobox.Options>
                        </Transition>
                        <span className="text-xs text-red-500">
                          {errors?.district?.message}
                        </span>
                      </div>
                    </Combobox>
                  )}
                />
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Chọn phường xã
                </label>

                <Controller
                  name="ward"
                  control={control}
                  rules={{ required: "Vui lòng nhập trường này" }}
                  render={({ field }) => (
                    <Combobox {...field}>
                      <div className="relative mt-1">
                        <div className="border-1 border-gray relative w-full cursor-default bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                          <Combobox.Input
                            className={classNames(
                              "w-full  rounded-lg border-gray-300 py-2 pl-3 pr-10 text-sm  leading-5  text-gray-900 focus:ring-0",
                              errors["ward"] &&
                                "border-red-600 focus:ring-red-600 "
                            )}
                            displayValue={(person: any) => person?.WardName}
                            onChange={(event) =>
                              setQueryqueryWards(event.target.value)
                            }
                            placeholder="Chọn phường xã"
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQueryqueryWards("")}
                        >
                          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredWards?.length === 0 &&
                            queryWards !== "" ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Không tìm thấy dữ liệu
                              </div>
                            ) : (
                              filteredWards?.map((item: any, index: number) => (
                                <Combobox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={item}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate text-sm lg:text-md${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {item.WardName}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active
                                              ? "text-white"
                                              : "text-teal-600"
                                          }`}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>

                        <span className="text-xs text-red-500">
                          {errors?.ward?.message}
                        </span>
                      </div>
                    </Combobox>
                  )}
                />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ghi chú
                </label>
                <textarea
                  rows={3}
                  {...register("note")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)"
                ></textarea>
              </div>
            </div>
          </div>
          {/* <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="border-transparent bg-black text-white text-white  hover:opacity-70 focus:ring-indigo-500 inline-flex justify-center rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div> */}
        </div>
        <div className="mt-8 md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-full md:mt-0">
            <h1 className="mb-7 text-center text-lg font-bold leading-6  text-gray-900">
              Hình thức thanh toán
            </h1>
            {/* <form action="#" method="POST" className="my-2 ">
            <div className="overflow-hidden shadow sm:rounded-md">
              <label className="hover:bg-gray-50 bg-gray-50 group relative flex cursor-pointer rounded-md border py-3 px-4 text-sm font-medium uppercase text-c2i-light focus:outline-none sm:flex-1 sm:py-4">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  className="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Thanh toán bằng Momo</span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-c2i-light"
                ></span>
              </label>
            </div>
          </form>
          <form action="#" method="POST" className="my-2 ">
            <div className="overflow-hidden shadow sm:rounded-md">
              <label className="hover:bg-gray-50 bg-gray-50 group relative flex cursor-pointer rounded-md border py-3 px-4 text-sm font-medium uppercase text-c2i-light focus:outline-none sm:flex-1 sm:py-4">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  className="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Thanh toán bằng Momo</span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-c2i-light"
                ></span>
              </label>
            </div>
          </form>
          <form action="#" method="POST" className="my-2 ">
            <div className="overflow-hidden shadow sm:rounded-md">
              <label className="hover:bg-gray-50 bg-gray-50 group relative flex cursor-pointer rounded-md border py-3 px-4 text-sm font-medium uppercase text-c2i-light focus:outline-none sm:flex-1 sm:py-4">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  className="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Thanh toán bằng Momo</span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-c2i-light"
                ></span>
              </label>
            </div>
          </form>
          <form action="#" method="POST" className="my-2 ">
            <div className="overflow-hidden shadow sm:rounded-md">
              <label className="hover:bg-gray-50 bg-gray-50 text-gray-200  group relative flex cursor-pointer rounded-md border border-c2i-light py-3 px-4 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-4">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  className="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">
                  Thanh toán tài khoản ngân hàng
                </span>

                <span
                  aria-hidden="true"
                  className="border-gray-200 pointer-events-none absolute -inset-px
rounded-md
border-2
"
                ></span>
              </label>
            </div>
          </form> */}
            <RadioGroup value={selectedPayment} onChange={setSelectedPayment}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <RadioGroup.Option
                    key={plan.name}
                    value={plan}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? "ring-2 ring-white ring-opacity-60 ring-offset-2 "
                          : ""
                      }
                  ${checked ? "bg-gray-900 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {plan.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked ? "text-sky-100" : "text-gray-500"
                                }`}
                              >
                                <span>{plan.ram}</span>{" "}
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <div className="mt-6">
              <button className="m-auto flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white text-white shadow-sm  hover:opacity-70">
                Thanh toán
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                hoặc{" "}
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
          </div>
        </div>
      </form>
    </>
  );
}
function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="white" opacity="1" />
      <path
        d="M7 13l3 3 7-7"
        stroke="green"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
