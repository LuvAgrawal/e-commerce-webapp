import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopPage = () => {
  const fetchedData = useSelector((state) => state.product.product) || []; // Ensure it's always an array

  // Pagination States
  const [page, setPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Price Filter States
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [rangeVal, setRangeVal] = useState(0);

  // Calculate Price Range
  const priceRange = useMemo(() => {
    if (!Array.isArray(fetchedData)) return [];
    return [...new Set(fetchedData.map((item) => item?.price))];
  }, [fetchedData]);

  useEffect(() => {
    if (priceRange.length) {
      const minPrice = Math.min(...priceRange);
      const maxPrice = Math.max(...priceRange);
      setMinVal(minPrice);
      setMaxVal(maxPrice);
      setRangeVal(maxPrice); // Default to max price
    }
  }, [priceRange]);

  // Filter Products
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(fetchedData)) return [];
    return fetchedData.filter((item) => item.price <= parseInt(rangeVal, 10));
  }, [fetchedData, rangeVal]);

  return (
    <section className="max-w-[100dvw] lg:grid lg:grid-cols-12">
      {/* Filter Section */}
      <div id="filter-section" className="p-4 w-full lg:mt-20 lg:p-2 lg:col-span-2">
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

      {/* Shop Section */}
      <div id="shop-page" className="lg:col-span-10">
        <div className="heading text-center sticky top-0 md:block">
          <h1 className="text-3xl font-bold">Shop Page</h1>
          <span className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {fetchedData.length} results
          </span>
        </div>

        <div className="m-4 border-2 p-2 min-h-[60vh] flex justify-center rounded-3xl">
          {filteredProducts.length ? (
            <div className="grid gap-4 grid-cols-1 px-2 w-full lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {filteredProducts
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((product, index) => (
                  <Link
                    key={index}
                    className="h-fit"
                    to={`/product/${product._id}`}
                  >
                    <ProductCard
                      img={product?.thumbnail}
                      title={product?.title}
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

        {/* Pagination */}
        <div className="flex justify-center">
          <button
            className={`size-fit w-fit px-3 py-1.5 border rounded-full cursor-pointer ${
              page === 1 ? "text-gray-400" : ""
            }`}
            onClick={() => {
              page <= 1 ? setPage(1) : setPage(page - 1);
            }}
          >
            Previous 👈🏻
          </button>

          <p
            className={`size-fit w-fit px-3 py-1.5 border rounded-full cursor-pointer ${
              page - 1 === 0 ? "hidden" : ""
            }`}
            onClick={() => setPage(page - 1)}
          >
            {page - 1}
          </p>
          <p
            className={`size-fit w-fit px-3 py-1.5 border rounded-full cursor-pointer ${
              selectedPage === page ? "bg-blue-500" : ""
            }`}
            onClick={() => {
              setPage(page);
              setSelectedPage(page);
            }}
          >
            {page}
          </p>
          <p
            className="size-fit w-fit px-3 py-1.5 border rounded-full cursor-pointer"
            onClick={() => setPage(page + 1)}
          >
            {page + 1}
          </p>

          <button
            className="size-fit w-fit px-3 py-1.5 border rounded-full cursor-pointer"
            onClick={() => setPage(page + 1)}
          >
            👉🏻 Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
