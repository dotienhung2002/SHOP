import Footer from "@Layout/footer/index";
import Header from "@Layout/header/index";
import { useGetCartQuery } from "@Services/cart.service";
import './../../node_modules/aos/dist/aos.css'
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@Hooks/reduxHook";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initialCart } from "@Redux/reducers/common/cartReducer";
import AOS from 'aos'
const LayoutDefault = () => {
  const cart= useGetCartQuery(localStorage.getItem("device_user"));
  const location = useLocation()
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("device_user")) {
      dispatch(initialCart(Number(cart.data?.cartProducts?.length)));
      
    }
  }, [cart.data,localStorage.getItem("device_user")]);

  useEffect(()=>{
    AOS.init({
      once: true,
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
      disable: function() {
        var maxWidth = 800;
        return window.innerWidth < maxWidth;
      }

    });
  },[])
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])
  return (
    <div className="overflow-hidden" >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default LayoutDefault;
