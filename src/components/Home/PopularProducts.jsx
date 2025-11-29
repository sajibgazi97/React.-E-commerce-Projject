import React, { useEffect, useState } from 'react'
import ProductCard from '../UI/ProductCard'
import axios, { all } from 'axios'
import Skeliton from '../UI/Skeliton'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

const PopularProducts = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1200,
  //   });
  //   AOS.refresh();
  // }, []);
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([
    "all",
    "furniture",
    "fragrances",
    "womens-bags",
    "sports-accessories"
  ])
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    axios.get(`https://dummyjson.com/products${selectedCategory && "/category/" + selectedCategory}?limit=10`).then((res) => {
      setProducts(res.data.products);
      setLoading(false)
    })
  }, [selectedCategory])



  return (
    <>
      <section className='mt-[100px] pb-4 bg-background'>
        <div className="container">
          <div className=' flex flex-col items-center text-center'>
            <h2 className='pt-[100px] text-3xl text-primary'>Popular Products</h2>
            <p className='max-w-[750px] pt-7 pb-20 text-base text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod temp incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className='pb-16'>
            <ul className='flex gap-10'>
              {
                categories.map((item) => (
                  <li key={item}><button onClick={() => setSelectedCategory(item == "all" ? "" : item)} className={`${item == selectedCategory && "text-bagde"} capitalize cursor-pointer`}>{item}</button></li>
                ))
              }
            </ul>
          </div>

          {
            loading ? (
              <Skeliton />
            ) : (
              <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-7 gap-y-[60px] '>
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            )
          }

        </div>
      </section>
    </>
  )
}

export default PopularProducts
