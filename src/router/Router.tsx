import React, { lazy } from "react";
import { BrowserRouter as AppRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("@Views/pages/home/index"));
const About = lazy(() => import("@Views/pages/about/index"));
const Contact = lazy(() => import("@Views/pages/contact/index"));
const Size = lazy(() => import("@Views/pages/choose-size/index"));

const Login = lazy(() => import("@Views/authen/login/Login"));
const Register = lazy(() => import("@Views/authen/register/Register"));
const Account = lazy(() => import("@Views/pages/account/index"));

const Checkout = lazy(() => import("@Views/pages/checkout/index"));
const CheckoutSuccess = lazy(() => import("@Views/notification/checkout"));
const CheckoutSuccessCod = lazy(
  () => import("@Views/notification/checkoutCod")
);
const Collection = lazy(() => import("@Views/pages/product/index"));
const ProductDetail = lazy(
  () => import("@Views/pages/product/product-detail/index")
);
const LayoutDefault = lazy(() => import("@Layout/LayoutDefault"));

const Router = () => {
  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Routes>
        <Route
          path="/"
          key={"/"}
          element={
            <React.Suspense
              fallback={
                <>
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800 transition delay-1000 duration-1000  "
                    ></div>
                  </div>
                </>
              }
            >
              <LayoutDefault />
            </React.Suspense>
          }
        >
          <Route
            path="/"
            key={"/home"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="/product/:id"
            key={"/productDetail"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <ProductDetail />
              </React.Suspense>
            }
          />
          <Route
            path="/about"
            key={"/about"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <About />
              </React.Suspense>
            }
          />
          <Route
            path="/contact"
            key={"/contact"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <Contact />
              </React.Suspense>
            }
          />
          <Route
            path="/size"
            key={"/size"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <Size />
              </React.Suspense>
            }
          />
          <Route
            path="/cart"
            key={"/cart"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <Checkout />
              </React.Suspense>
            }
          />
          <Route
            path="/cart/checkout-success"
            key={"/cart/checkout-success"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <CheckoutSuccess />
              </React.Suspense>
            }
          />{" "}
          <Route
            path="/cart/checkout-success-cod"
            key={"/cart/checkout-success-cod"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <CheckoutSuccessCod />
              </React.Suspense>
            }
          />{" "}
          {(localStorage.getItem("is_login") !== "1" && (
            <Route
              path="/login"
              key={"login"}
              element={
                <React.Suspense
                  fallback={
                    <>
                      <button className="... bg-indigo-500">
                        <svg
                          className="... mr-3 h-5 w-5 animate-spin transition delay-1000 duration-1000  "
                          viewBox="0 0 24 24"
                        ></svg>
                        Processing...
                      </button>
                    </>
                  }
                >
                  <Login />
                </React.Suspense>
              }
            />
          )) || (
            <Route
              path="/account"
              key={"account"}
              element={
                <React.Suspense
                  fallback={
                    <>
                      <button className="... bg-indigo-500">
                        <svg
                          className="... mr-3 h-5 w-5 animate-spin transition delay-1000 duration-1000  "
                          viewBox="0 0 24 24"
                        ></svg>
                        Processing...
                      </button>
                    </>
                  }
                >
                  <Account />
                </React.Suspense>
              }
            />
          )}
          <Route
            path="/my-order/:id"
            key={"my-order"}
            element={
              <React.Suspense
                fallback={
                  <>
                    <button className="... bg-indigo-500">
                      <svg
                        className="... mr-3 h-5 w-5 animate-spin transition delay-1000 duration-1000  "
                        viewBox="0 0 24 24"
                      ></svg>
                      Processing...
                    </button>
                  </>
                }
              >
                <Account />
              </React.Suspense>
            }
          />
          <Route
            path="/my-order"
            key={"my-order"}
            element={
              <React.Suspense
                fallback={
                  <>
                    <button className="... bg-indigo-500">
                      <svg
                        className="... mr-3 h-5 w-5 animate-spin transition delay-1000 duration-1000  "
                        viewBox="0 0 24 24"
                      ></svg>
                      Processing...
                    </button>
                  </>
                }
              >
                <Account />
              </React.Suspense>
            }
          />
          <Route
            path="/register"
            key={"register"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <Register />
              </React.Suspense>
            }
          />
          <Route
            path="/collection"
            key={"collection"}
            element={
              <React.Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-20 w-20 animate-spin rounded-full border-4 border-gray-800   transition delay-1000 duration-1000"
                    ></div>
                  </div>
                }
              >
                <Collection />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </AppRouter>
  );
};
export default Router;
