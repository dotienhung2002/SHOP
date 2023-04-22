import { useAppSelector } from "@Hooks/reduxHook";
import {
  useGetBrandsQuery,
  useGetClassifysQuery,
  useGetMadeInQuery,
} from "@Services/common.service";
import { useLazyGetAllByKeyQuery } from "@Services/product.service";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const navigation = {
  // about: [{ name: "Giới thiệu", href: "/about" }],
  about: [{ name: "", href: "" }],
  categories: [
    {
      id: "product",
      name: "Sản phẩm",
      featured: [
        {
          name: "",
          href: "#",
          imageSrc:
            "data:image/jpeg;base64,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",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "",
          href: "#",
          imageSrc:
            "data:image/jpeg;base64,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",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Liên hệ", href: "/contact" },
    // { name: "Chọn size", href: "/size" },
  ],
};

interface Menu {
  name: string;
  id: number;
}
interface MenuClassify {
  name: string;
  categoryList: [];
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<any>();
  const listBrand = useGetBrandsQuery("");
  const listClassify = useGetClassifysQuery("");
  const listMadeIn = useGetMadeInQuery("");
  const [showSearch, setShowSearch] = useState(false);
  const [triggerFindName] = useLazyGetAllByKeyQuery();
  const amount = useAppSelector((state) => state.cartChange.amount);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const numberToCurrencyStyle = (x: any) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  console.log("listBrand");
  console.log(listBrand);
  console.log("listBrand");

  //   useEffect(()=>{
  // console.log("duoc goij");
  // console.log(localStorage.getItem('count_cart'));

  //   },[localStorage.getItem('count_cart')])

  console.log(search);
  const handleSearch = async () => {
    if (search) {
      await triggerFindName(search).then((res) => {
        setData(res.data?.data);
      });
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);

  console.log(data);

  return (
    <div className="bg-white ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative  flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <Tab.Panels as={Fragment}>
                    <div className="space-y-6 border-t border-gray-200 py-6 px-6">
                      {navigation.about.map((page) => (
                        <div key={page.name} className="flow-root">
                          <Link
                            onClick={() => setOpen(false)}
                            to={page.href}
                            className="-m-2 block p-2 text-sm font-medium text-gray-900"
                          >
                            {page.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6  border-gray-200 px-6 pb-6">
                      {navigation.pages.map((page) => (
                        <div key={page.name} className="flow-root">
                          <Link
                            to={page.href}
                            onClick={() => setOpen(false)}
                            className="-m-2 block p-2 text-sm font-medium text-gray-900"
                          >
                            {page.name}
                          </Link>
                        </div>
                      ))}
                    </div>

                    <div className="gap-y-10 gap-x-8 p-5 text-sm">
                      <div className="mt-2">
                        <p
                          // id={`-heading`}
                          className="font-extrabold text-gray-900"
                        >
                          Thương hiệu
                        </p>
                        <ul
                          // aria-labelledby={`${section.name}-heading`}
                          className="mt-6 space-y-6 px-3 sm:mt-4 sm:space-y-4"
                        >
                          {listBrand.data?.map((item: Menu) => (
                            <li className="flex">
                              <Link
                                to={"/collection?brand=" + item.id}
                                onClick={() => setOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-6" />

                      <div className="mt-2">
                        <p
                          // id={`-heading`}
                          className="font-extrabold text-gray-900"
                        >
                          Danh mục
                        </p>
                        <ul
                          // aria-labelledby={`${section.name}-heading`}
                          className="mt-6 space-y-6 px-3 sm:mt-4 sm:space-y-4"
                        >
                          {listClassify.data?.map(
                            (item: MenuClassify, index: number) => (
                              <>
                                <li className="flex" key={index}>
                                  <Link to={"#"} className="font-semibold">
                                    {item.name}
                                  </Link>
                                </li>
                                {item.categoryList?.map((item: Menu, index) => (
                                  <li className="flex" key={index}>
                                    <Link
                                      onClick={() => setOpen(false)}
                                      to={"/collection?category=" + item.id}
                                      className="text-c2i-gray"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </>
                            )
                          )}
                        </ul>
                      </div>
                      <hr className="my-6" />

                      <hr className="my-6" />
                      <div className="mt-2">
                        <p
                          // id={`-heading`}
                          className="font-extrabold text-gray-900"
                        >
                          Xuất xứ
                        </p>
                        <ul
                          // aria-labelledby={`${section.name}-heading`}
                          className="mt-6 space-y-6 px-3 sm:mt-4 sm:space-y-4"
                        >
                          {listMadeIn.data?.map((item: Menu) => (
                            <li className="flex">
                              <Link
                                to={"/collection?madeIn=" + item.id}
                                onClick={() => setOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <Link
                      to="/account"
                      onClick={() => setOpen(false)}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Tài khoản
                    </Link>
                  </div>
                </div>
                {/* 
                <div className="border-t border-gray-200 py-6 px-4">
                  <Link to="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Pc menu */}

      <header className="relative bg-white">
        <p className="text-c2i-light flex h-10 items-center justify-center bg-slate-800 px-4 text-sm font-medium text-neutral-200 sm:px-6 lg:px-8">
          Chào mừng bạn đến với website bán giày uy tín số 1 Việt Nam
        </p>

        {/* <nav
          aria-label="Top"
          className="mx-auto max-w-full px-4 sm:px-6 lg:px-20"
        > */}
        <Transition show={showSearch}>
          <nav aria-label="Top" className="container relative">
            <div className="mt-3 flex justify-center border-b border-gray-200">
              <div className="relative mb-3 xl:w-96">
                <input
                  type="search"
                  className="
        form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
      "
                  id="exampleSearch2"
                  placeholder="Tìm kiếm"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {data?.length > 0 ? (
                  <ul
                    className=" absolute  z-50  rounded-xl border-2 bg-white  py-1 px-5"
                    style={{
                      width: "400px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {data?.map((item: any, index) => {
                      return (
                        <li
                          key={index}
                          className="mt-5 flex cursor-pointer gap-3"
                          onClick={() => {
                            navigate("product/" + item?.id);
                            setShowSearch(false);
                            setSearch(null);
                          }}
                        >
                          <div>
                            <img
                              src={item?.image}
                              className={"h-10 w-10 object-cover"}
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="text-sm font-bold">
                              {" "}
                              {item?.name}
                            </div>
                            <div className="text-sm">
                              <p className="mt-1 text-sm text-gray-500">
                                <div className="flex flex-row gap-4">
                                  <span className="text-red-600">
                                    {" "}
                                    {numberToCurrencyStyle(item.promotionPrice)}
                                    đ
                                  </span>
                                  <span className="line-through">
                                    {" "}
                                    {numberToCurrencyStyle(item?.originPrice)}đ
                                  </span>
                                </div>
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="text-center">
                    {search && (
                      <span className="left-25 text-center text-sm">
                        Không tìm thấy dữ liệu
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </Transition>
        <nav aria-label="Top" className="container">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center text-slate-800">
              <button
                type="button"
                className="rounded-md  bg-white p-2 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex hidden lg:ml-0 lg:block">
                <Link to={"/"}>
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto object-cover"
                    style={{ width: "142px" }}
                    src={
                      "data:image/png;base64,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"
                    }
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.about.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-500"
                    >
                      {page.name}
                    </Link>
                  ))}
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-black"
                                  : "border-transparent text-gray-800 hover:text-gray-500",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div
                                className=" relative"
                                style={{ background: "white", zIndex: 999 }}
                              >
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link
                                            to={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </Link>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-4 gap-y-10 gap-x-8 text-sm">
                                      <div>
                                        <p
                                          // id={`-heading`}
                                          className="font-extrabold text-gray-900"
                                        >
                                          Thương hiệu
                                        </p>
                                        <ul
                                          // aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {listBrand.data?.map((item: Menu) => (
                                            <li
                                              className="flex"
                                              onClick={() => close()}
                                            >
                                              <Link
                                                to={
                                                  "/collection?brand=" + item.id
                                                }
                                              >
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <p
                                          // id={`-heading`}
                                          className="font-extrabold text-gray-900"
                                        >
                                          Danh mục
                                        </p>
                                        <ul
                                          // aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {listClassify.data
                                            ?.slice(
                                              0,
                                              listClassify.data?.length / 2
                                            )
                                            ?.map(
                                              (
                                                item: MenuClassify,
                                                index: number
                                              ) => (
                                                <>
                                                  <li
                                                    className="flex"
                                                    key={index}
                                                  >
                                                    <Link
                                                      to={"#"}
                                                      className="font-semibold"
                                                    >
                                                      {item.name}
                                                    </Link>
                                                  </li>
                                                  {item.categoryList?.map(
                                                    (item: Menu, index) => (
                                                      <li
                                                        className="flex"
                                                        key={index}
                                                        onClick={() => close()}
                                                      >
                                                        <Link
                                                          to={
                                                            "/collection?category=" +
                                                            item.id
                                                          }
                                                          className="text-c2i-gray"
                                                        >
                                                          {item.name}
                                                        </Link>
                                                      </li>
                                                    )
                                                  )}
                                                </>
                                              )
                                            )}
                                        </ul>
                                      </div>
                                      <div className="mt-2">
                                        <ul
                                          // aria-labelledby={`${section.name}-heading`}
                                          className="mt-10 space-y-6 sm:mt-4 sm:space-y-4 "
                                        >
                                          {listClassify.data
                                            ?.slice(
                                              listClassify.data?.length / 2,
                                              listClassify.data?.length
                                            )
                                            ?.map(
                                              (
                                                item: MenuClassify,
                                                index: number
                                              ) => (
                                                <>
                                                  <li
                                                    className="mt-8 flex"
                                                    key={index}
                                                  >
                                                    <Link
                                                      to={"#"}
                                                      className="font-semibold"
                                                    >
                                                      {item.name}
                                                    </Link>
                                                  </li>
                                                  {item.categoryList?.map(
                                                    (item: Menu, index) => (
                                                      <li
                                                        className="flex"
                                                        key={index}
                                                        onClick={() => close()}
                                                      >
                                                        <Link
                                                          to={
                                                            "/collection?category=" +
                                                            item.id
                                                          }
                                                          className="text-c2i-gray"
                                                        >
                                                          {item.name}
                                                        </Link>
                                                      </li>
                                                    )
                                                  )}
                                                </>
                                              )
                                            )}
                                        </ul>
                                      </div>

                                      <div>
                                        <p
                                          // id={`-heading`}
                                          className="font-extrabold text-gray-900"
                                        >
                                          Xuất xứ
                                        </p>
                                        <ul
                                          // aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {listMadeIn.data?.map(
                                            (item: Menu) => (
                                              <li
                                                className="flex"
                                                onClick={() => close()}
                                              >
                                                <Link
                                                  to={
                                                    "/collection?madeIn=" +
                                                    item.id
                                                  }
                                                >
                                                  {item.name}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-500"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* Search */}
                <div
                  className="flex lg:ml-4"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Link
                    to="#"
                    className="p-2 text-gray-800 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                {/*Account*/}
                <div className="flex lg:ml-2">
                  <Link
                    to={
                      (localStorage.getItem("is_login") !== "1" && "/login") ||
                      "/account"
                    }
                    className="p-2 text-gray-800 hover:text-gray-500"
                  >
                    <span className="sr-only">Account</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-4">
                  <Link
                    to={"/cart"}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-800 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-800 group-hover:text-gray-500">
                      {amount || 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
