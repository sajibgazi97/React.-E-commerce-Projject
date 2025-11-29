import React, { useEffect, useState } from 'react'
import ProductCard from '../UI/ProductCard'
import axios from 'axios'


const ProductItem = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories] = useState([
    "all",
    "furniture",
    "fragrances",
    "womens-bags",
    "sports-accessories"
  ])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [pagination, setPagination] = useState({
    total: 0,
    skip: 0,
    limit: 20,
  })

  useEffect(() => {

    const categoryPath = selectedCategory ? "/category/" + selectedCategory : "";

    axios.get(`https://dummyjson.com/products${categoryPath}?limit=${pagination.limit}&skip=${pagination.skip}`).then((res) => {
      setProducts(res.data.products);
      setPagination({
        total: res.data.total,
        skip: res.data.skip,
        limit: res.data.limit,
      })
      setLoading(false)
    }).catch(err => {
      console.error("Error fetching products:", err);
      setLoading(false);
    });
  }, [selectedCategory, pagination.skip, pagination.limit])

  const handleCategoryClick = (item) => {

    setSelectedCategory(item === "all" ? "" : item);
    setPagination((prev) => ({ ...prev, skip: 0 }));
  };


  const handlePrev = () => {
    const newSkip = Math.max(0, pagination.skip - pagination.limit);
    setPagination((prev) => ({ ...prev, skip: newSkip }));
  };

  const handleNext = () => {
    const maxSkip = pagination.total - pagination.limit;
    const newSkip = Math.min(maxSkip, pagination.skip + pagination.limit);
    setPagination((prev) => ({ ...prev, skip: newSkip }));
  };


  return (
    <>

      <section className='my-[50px] md:my-[100px] bg-background'>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">


          <div className='pt-10 md:pt-32 pb-4'>


            <div className='pb-8 md:pb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-5'>


              <ul className='flex gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap pb-2 text-secondary font-medium'>
                {
                  categories.map((item) => (
                    <li key={item} className="flex-shrink-0">
                      <button
                        onClick={() => handleCategoryClick(item)}
                        className={`capitalize cursor-pointer transition-colors duration-200 ${(selectedCategory === item || (selectedCategory === "" && item === "all"))
                          ? "text-bagde font-semibold"
                          : "hover:text-bagde"
                          }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))
                }
              </ul>


              <select
                className='text-primary outline-none bg-white border p-1 rounded-md flex-shrink-0 w-full md:w-auto shadow-sm'
                onChange={(e) => setPagination((prev) => ({ ...prev, limit: Number(e.target.value), skip: 0 }))}
                value={pagination.limit}
              >
                <option value="20">20 / items</option>
                <option value="60">60 / items</option>
                <option value="100">100 / items</option>
              </select>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-7 gap-y-[40px] sm:gap-y-[60px] '>
              {
                products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))
              }

              {loading && <p className="col-span-full text-center py-10">Loading products...</p>}
            </div>


            <div className='mt-10 sm:mt-14 w-full flex justify-center items-center gap-3'>
              <button
                onClick={handlePrev}
                className={`px-3 py-1.5 border rounded-[6px] text-secondary cursor-pointer transition-colors ${pagination.skip === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                disabled={pagination.skip === 0}
              >
                Previous
              </button>


              <span className="text-sm text-secondary hidden sm:inline">
                Page {Math.floor(pagination.skip / pagination.limit) + 1} of {Math.ceil(pagination.total / pagination.limit)}
              </span>

              <button
                onClick={handleNext}
                className={`px-3 py-1.5 border rounded-[6px] text-secondary cursor-pointer transition-colors ${pagination.skip + pagination.limit >= pagination.total ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                disabled={pagination.skip + pagination.limit >= pagination.total}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductItem