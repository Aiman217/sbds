import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function SlideShow({ slideList }) {
  return (
    <>
      <div className="carousel w-full h-[70vh] rounded-2xl">
        {slideList.map((item, index) => (
          <div key={index} id={index} className="carousel-item relative w-full">
            <img
              src={item.src_image}
              alt="Slide Images"
              className="w-full h-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={
                  index == 0 ? "#" + (slideList?.length - 1) : "#" + (index - 1)
                }
                className="btn btn-circle"
              >
                <AiOutlineArrowLeft size={20} />
              </a>
              <a
                href={index == slideList.length - 1 ? "#0" : "#" + (index + 1)}
                className="btn btn-circle"
              >
                <AiOutlineArrowRight size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
