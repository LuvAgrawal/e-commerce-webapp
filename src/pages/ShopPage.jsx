import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopPage = () => {
  const fetchedData = useSelector((state) => state.product.product);
  console.log(fetchedData)
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [rangeVal, setRangeVal] = useState(0);

  const priceRange = useMemo(
    () => [...new Set(fetchedData?.map((item) => item?.price))],
    [fetchedData]
  );

  useEffect(() => {
    if (priceRange.length) {
      const minPrice = Math.min(...priceRange);
      const maxPrice = Math.max(...priceRange);
      setMinVal(minPrice);
      setMaxVal(maxPrice);
      setRangeVal(maxPrice); // Set rangeVal to maxPrice initially
    }
  }, [priceRange]);

  const filteredProducts = useMemo(() => {
    return fetchedData?.filter((item) => item.price <= parseInt(rangeVal));
  }, [fetchedData, rangeVal]);

  return (
    <section className="grid grid-cols-12 max-w-[100dvw] ">
      <div id="filter-section" className="col-span-2 w-full lg:mt-20 lg:p-2 m-4">
        <h3 className="text-center text-xl font-bold">Filter By Price</h3>
        <input
          className="w-full"
          type="range"
          onChange={(e) => setRangeVal(e.target.value)}
          min={minVal}
          max={maxVal}
          value={rangeVal}
        />
        <div className="flex justify-between text-gray-600 text-sm items-center">
          <span>${minVal}</span>
          <span>${maxVal}</span>
        </div>
      </div>

      <div id="shop-page" className="col-span-10">
        <div className="heading text-center sticky top-0 md:block">
          <h1 className="text-3xl font-bold">Shop Page</h1>
          <span className="text-sm text-gray-500">
            Showing {filteredProducts?.length} of {fetchedData?.length} results
          </span>
        </div>
        <div className="my-4 border-2 p-2 min-h-[60vh] flex justify-center rounded-3xl">
          {filteredProducts?.length ? (
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {filteredProducts.map((product, index) => (
                <Link
                  key={index}
                  className="h-fit"
                  to={`/product/${product.product}`}
                >
                  <ProductCard
                    img={product?.thumbnail}
                    title={product?.product}
                    price={product?.price}
                    rating={product?.rating}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <h4 className="text-5xl h-full my-auto font-extrabold text-center">
              No Products Found!
            </h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
