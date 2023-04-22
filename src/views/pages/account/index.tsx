import { Tab } from "@headlessui/react";
import { useLazyGetMyOrderQuery } from "@Services/order.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetail from "./detail-order";
import Info from "./info";
import MyOrder from "./my-order";

const statusBlock: any = {
  0: {
    text: "Chờ tiếp nhận",
    bg: "#342e2e",
  },
  1: {
    text: "Đã tiếp nhận",
    bg: "#152eff",
  },
  2: {
    text: "Đang xử lý",
    bg: "#ffad15",
  },
  3: {
    text: "Đang vận chuyển",
    bg: "#2dbfe6",
  },

  4: {
    text: "Đã giao",
    bg: "#5fda24",
  },
  5: {
    text: "Đã huỷ",
    bg: "red",
  },
};
export default function Account() {
  const [triggerGetMyOrder] = useLazyGetMyOrderQuery();
  const { id } = useParams();
  console.log(id);
  const [activeTab, setActiveTab] = useState(() =>
    window.location.pathname?.includes("/my-order") ? 1 : 0
  );
  const [data, setData] = useState<[]>();

  useEffect(() => {
    handleGetMyOrder();
  }, []);
  const handleGetMyOrder = async () => {
    const user_data: any = JSON.parse(
      localStorage.getItem("user_data") || "{}"
    );
    await triggerGetMyOrder(user_data?.email).then((res) => {
      setData(res?.data);
    });
  };
  const classNames = (...classNamees: any) => {
    return classNamees.filter(Boolean).join(" ");
  };

  const numberToCurrencyStyle = (x: any) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  console.log(data);

  let [categories] = useState({
    "Thông tin cá nhân": [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    "Đơn hàng": [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });
  console.log();

  return (
    <>
      <div className="container py-12">
        <Tab.Group selectedIndex={activeTab} onChange={(e) => setActiveTab(e)}>
          <div className="grid grid-cols-11 gap:0 lg:gap-12 ">
            <div className=" col-span-11 ">
              <Tab.List className="m-auto flex max-w-md flex-col lg:flex-row   space-x-1 rounded-xl p-1">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-800 ",
                        "border-b- mt-2 ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                        selected
                          ? " border-2  border-gray-800 bg-white shadow"
                          : "text-gray-800   hover:text-gray-500 "
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
                 <button
                className="border-b- mt-2 w-full rounded-lg py-2.5 text-sm font-medium  leading-5 text-gray-800  ring-white ring-opacity-60 ring-offset-2 hover:text-gray-500 focus:outline-none   focus:ring-2 "
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Thoát
              </button>
              </Tab.List>
             
            </div>
            <div className="col-span-full ">
              <Tab.Panels className="mt-6">
                <Tab.Panel>
                  <Info {...{ classNames }} />
                </Tab.Panel>
                <Tab.Panel>
                  {(id && (
                    <OrderDetail
                      {...{ id, numberToCurrencyStyle, statusBlock }}
                    />
                  )) || (
                    <MyOrder
                      {...{
                        numberToCurrencyStyle,
                        data,
                        statusBlock,
                        handleGetMyOrder,
                      }}
                    />
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </div>
        </Tab.Group>
      </div>
    </>
  );
}
