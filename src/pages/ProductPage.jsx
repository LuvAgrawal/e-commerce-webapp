// import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import ProductContext from "../component/contextApi/ProductContext";
const ProductPage = () => {
  const fetchedData = useSelector((state) => state.product.product)
  // console.log("Fetch data", fetchedData)
  const { id } = useParams();
  // const param = useParams();
  // console.log("param",param)

  // console.log("id",id)

  let selectedProduct = fetchedData.find((item) => {
    // console.log("item",item)
    return item._id ==id 
  });
  // console.log(item)
  console.log("Selected Prod", selectedProduct);

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <div className="m-2 overflow-hidden md:p-4">
          <div className="flex justify-center">
            <img
              src={selectedProduct?.thumbnail}
              className="h-60 md:h-80"
              alt="main Product"
            />
          </div>
          <div className="flex justify-center my-3 gap-4 overflow-auto border-2 border-gray-400 bg-white rounded-lg w-fit">
            {selectedProduct?.images.length > 0 ? (
              selectedProduct?.images?.map((imageSrc, i) => (
                <img
                  // onClick={(e) => setSelectedImage(e.target.src)}
                  key={i}
                  className="h-32"
                  src={imageSrc}
                  alt="main Product"
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="md:p-4 flex flex-col items-center justify-center md:m-2 md:max-w-sm">
          <h2 className="text-4xl uppercase text-center font-bold">
            {selectedProduct?.title}
          </h2>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              {selectedProduct?.description}
            </span>
            <span className="my-1 block">
              <strong>Category: </strong>
              {selectedProduct?.category}
            </span>
            <span className="text-2xl font-semibold">
              ${selectedProduct?.price}
            </span>
          </div>
          <div className="my-3 flex items-center">
            <button className="border rounded-lg px-3 bg-gray-200 py-1">
              -
            </button>
            <span className="border px-3 py-2">{selectedProduct?.minimumOrderQuantity}</span>
            <button className="border rounded-lg px-3 bg-gray-200 py-1">
              +
            </button>
            <button className="mx-5 rounded-lg bg-[#24333e] py-1 px-3 text-white font-semibold">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
