import { Link } from "react-router-dom";
import about1 from './../../../assets/images/about1.webp'
import about2 from './../../../assets/images/about2.jpeg'
const About = () => {
  return (
    <>
      <div className="banner-home">
        <img
          src="http://fusamate.site/static/anhbanner.jpeg"
          alt=""
          width={"100%"}
          style={{ height: 400, objectFit: "cover" }}
        />
      </div>
      <div className="container delay-[10000ms]">
        <div className="mx-auto mt-5 px-0  sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-10">
          <div className="mb-10 flex w-full flex-col items-center justify-between lg:flex-row">
            <div className=" lg:mb-0 lg:max-w-2xl lg:pr-5">
              <div className="mb-6 max-w-xl">
                <h2 className="mb-6 max-w-lg  font-sans text-xl my-5 lg:text-3xl  font-bold tracking-tight text-gray-800 sm:text-4xl sm:leading-none" data-aos="fade-left" >
                  Fusamate sinh ra để làm gì?
                </h2>
                <p className="text-base text-gray-800 md:text-sm" data-aos="fade-left" >
                  Fusamate kỳ vọng mang lại sản phẩm chất lượng hơn nhờ mô hình
                  quản lý chuỗi cung ứng từ gốc (với ngành may mặc đó là từ
                  sợi), Fusamate cũng có các đối tác ở quy mô toàn cầu, và chất
                  lượng về nguyên liệu đạt tiêu chuẩn cao trong ngành may mặc,
                  có thể so sánh với các thương hiệu lớn và lâu đời. Ngoài ra mô
                  hình bán hàng trực tiếp (Ecommerce D2C) cho phép Fusamate được
                  đầu tư nhiều hơn cho phần sản xuất thay vì phải liên tục cắt
                  giảm giá vốn như các mô hình truyền thống! Thực tế khách hàng
                  sẽ thấy được chất lượng các sản phẩm Fusamate đã cải thiện
                  đáng kể trong năm gần đây và chắc chắn trong tương lai nữa.
                  Fusamate kỳ vọng mang lại giá cả tốt hơn cho khách hàng nhờ
                  vào mô hình bán hàng trực tiếp thông qua nền tảng TMĐT. Thay
                  vì việc phải bán giá sản phẩm x4-x6 lần giá vốn như truyền
                  thống thì Fusamate thường là x1.8-x2.5 lần mà chúng tôi vẫn có
                  phần lời nhất định. Ngoài ra Fusamate còn hướng tới mang lại
                  một trải nghiệm mua sắm tốt hơn dành cho khách hàng nhờ vào
                  việc tập trung rất nhiều vào dịch vụ khách hàng (tham khảo 11
                  cam kết của Fusamate dành cho khách hàng)
                </p>
              </div>
              <div className="" data-aos="fade-up">   
                <Link
                  to="/comingsoon"
                  className="mr-32 flex w-full mb-10 items-center justify-center rounded-lg border  object-cover object-top py-4 font-black leading-6 text-gray-800 sm:mr-64 sm:px-10"
                >
                  Liên hệ
                </Link>
              </div>
            </div>
            <img
            data-aos="fade-up"
              alt="logo"
              width="450"
              height="450"
              src="http://fusamate.site/static/about1.webp"
            />
          </div>
        </div>
        <div className="mx-auto mt-5 px-4  sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-10">
          <div className="mb-10 flex w-full flex-col items-center justify-between lg:flex-row">
           
            <div className=" lg:mb-0 lg:max-w-2xl lg:pr-5 pt-4">
              <div className="mb-6 max-w-xl">
                <h2 className="mb-6 max-w-lg  font-sans text-xl my-5 lg:text-3xl  font-bold tracking-tight text-gray-800 sm:text-4xl sm:leading-none" data-aos="fade-left" >
                  Với Đối Tác Fusamate
                </h2>
                <p className="text-base text-gray-800 md:text-sm" data-aos="fade-left" >
                  Fusamate làm trong ngày may mặc. Một ngành mà là thế mạnh của
                  Việt Nam, tuy nhiên thì đời sống của những người công nhân may
                  chưa bao giờ được đảm bảo đủ tốt. Việc giảm chi phí gia công
                  để tăng sức cạnh tranh cho sản phẩm là chiến lược được các
                  thương hiệu lớn liên tục áp dụng. Fusamate muốn thay đổi điều
                  đó bằng việc luôn cố gắng trả nhiều hơn cho những người thợ
                  may nếu có thể (Yêu cầu các đối tác phải đóng bảo hiểm cho
                  người lao động là một ví dụ). Ngoài ra thì Fusamate cũng có
                  nhiều hoạt động hỗ trợ các bạn công nhân may khác như chăm sóc
                  các bạn F0, hỗ trợ giai đoạn thiếu việc làm, hay là việc theo
                  đuổi mô hình sản xuất chất lượng, thay vì giá rẻ. Fusamate kỳ
                  vọng rằng sẽ góp một phần vào việc thay đổi nhận thức của các
                  thương hiệu về mối quan hệ với các xưởng sản xuất, và đời sống
                  người lao động. Mô hình lao động giá rẻ của ngành dệt may
                  không phải là mô hình bền vững và có giá trị lâu dài trong
                  tương lai.
                </p>
              </div>
            </div>
            <img
            className=""
            data-aos="fade-up" 
              alt="logo"
              width="450"
              height="450"
              src={
                "http://fusamate.site/static/about2.jpeg"
              }
            />
          </div>
        </div>
        <div className="mx-auto mt-5 px-4  sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-10">
          <div className="mb-10 flex w-full flex-col items-center justify-between lg:flex-row">
            <div className=" lg:mb-0 lg:max-w-2xl lg:pr-5">
              <div className="mb-6 max-w-xl">
                <h2 className="mb-6 max-w-lg  font-sans text-xl my-5 lg:text-3xl  font-bold tracking-tight text-gray-800 sm:text-4xl sm:leading-none" data-aos="fade-left" >
                  Với Cộng Đồng Xã Hội
                </h2>
                <p className="text-base text-gray-800 md:text-sm" data-aos="fade-left" >
                  Fusamate cố gắng mở rộng, tạo nhiều việc làm và đóng thuế đầy
                  đủ như một phần đóng góp cho sự phát triển chung của xã hội.
                  Quan điểm của Fusamate về việc làm các hoạt động đóng góp cho
                  cộng đồng: “Một doanh nghiệp không cần phải lớn, mới có thể
                  làm điều ý nghĩa”. Chính vì vậy Fusamate đã mở ra dự án Care &
                  Share với mục tiêu góp phần hỗ trợ cho các trẻ em khó khăn ở
                  Việt Nam ngay từ khi mới thành lập công ty được 1 năm. (tham
                  khảo thêm dự án Care & Share). Chắc chắn trong thời gian tới
                  sẽ được đẩy mạnh hơn và hỗ trợ được nhiều hơn.{" "}
                </p>
              </div>
              <div className=""></div>
            </div>
            <img
              alt="logo"
              width="450"
              height="450"
              data-aos="fade-up" 
              src="http://fusamate.site/static/about1.webp"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
