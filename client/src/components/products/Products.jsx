import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import throttle from "lodash/throttle";
import ProductMini from "./ProductMini";
import Loading from "../layouts/Loading";
import CallToAction from "../CallToAction";

const Products = () => {
  const [limit] = useState(6);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [getMore, setGetMore] = useState(true); //Whether we should load more products from the server
  const [dataToMerge, setDataToMerge] = useState(false); //Whether there is new data to be merged with the existing data
  const { loading, data } = useQuery(gql`
    {
      products(limit:${limit},offset:${offset}) {
        id
        name
        model
        price
        imgUrl
        imgUrl_2
        isNew
      }
    }
  `);

  let productsContainer;
  const handleScroll = throttle(() => {
    //If we scroll to the end of products container
    if (
      window.scrollY + document.documentElement.clientHeight >=
      productsContainer.offsetTop + productsContainer.scrollHeight
    ) {
      setGetMore(true);
    }
  }, 900);

  useEffect(() => {
    productsContainer = document.getElementById("products");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if ((loading || getMore) && !dataToMerge) {
    setOffset(products.length);

    setDataToMerge(true);
    setGetMore(false);
  }

  if (!loading && dataToMerge) {
    setDataToMerge(false);
    if (data && data.products) setProducts([...products, ...data.products]);
  }

  return (
    <React.Fragment>
      <CallToAction
        image="http://injazmediagroups.com/Mtg/jeans-project/jean-pants.jpg"
        imgAlt="Maviuos Jeans"
        overlay="#00000042"
      >
        <div className="row container mx-auto h-100 align-items-center">
          <h2
            className="display-3 text-white col-12  font-weight-bold mt-6"
            data-aos="zoom-in"
          >
            Jeans For Everyone & Every Taste
          </h2>
          <h4
            className="text-white col-lg-9 mt-5"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Discover New & Attractive Fashions For your day-to-day life and get
            the best comfort & quality out of it
          </h4>
        </div>
      </CallToAction>
      <div className="mt-6" id="products">
        {loading && products.length === 0 ? (
          <Loading />
        ) : (
          <React.Fragment>
            <h3 className="text-primary mt-5 mb-0 container  display-3">
              Our Latest Products
            </h3>
            <div className="row my-5 px-3 justify-content-around container mx-auto">
              {products.map(p => {
                return <ProductMini key={p.id} data={p} />;
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

// let handleScrollThrotteled;
// let productsContainer;

// const Products = () => {
//   const [limit] = useState(6);
//   const [addedEventListener, setAddedEventsListener] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [newData, setNewData] = useState(false);
//   const [requestMore, setRequestMore] = useState(false);
//   const { loading, data } = useQuery(gql`
//     {
//       products(limit:${limit},offset:${offset}) {
//         id
//         name
//         model
//         price
//         imgUrl
//         imgUrl_2
//         isNew
//       }
//     }
//   `);
//   console.log(limit, offset);

//   const handleScroll = productsContainer => {
//     //If we scroll to the end of products container
//     if (
//       window.scrollY + document.documentElement.clientHeight >=
//       productsContainer.offsetTop + productsContainer.scrollHeight
//     ) {
//       setOffset(v => v + limit);
//     }
//   };

//   useEffect(() => {
//     console.log("HELO");
//     productsContainer = document.getElementById("products");
//     if (!productsContainer || addedEventListener) return;
//     setAddedEventsListener(true);
//     handleScrollThrotteled = throttle(
//       () => handleScroll(productsContainer),
//       900
//     );
//     window.addEventListener("scroll", handleScrollThrotteled);
//     return () => {
//       window.removeEventListener("scroll", handleScrollThrotteled);
//     };
//   }, [loading]);

//   if (loading) {
//     if (!newData) setNewData(true);
//     if (products.length === 0)
//       return (
//         <React.Fragment>
//           <Carousel />
//           <Loading />
//         </React.Fragment>
//       );
//   }

//   if (newData && !loading) {
//     setProducts([...products, ...data.products]);
//     setNewData(false);
//     gbs++;
//     if (data.products.length <= 0) {
//       // window.removeEventListener("scroll", handleScrollThrotteled);
//     }
//   }

//   return (
//     <React.Fragment>
//       <Carousel />
//       <div className="mt-6"></div>
//       <h3 className="text-primary mt-5 mb-0 container  display-3">
//         Our Latest Products
//       </h3>
//       <div
//         className="row my-5 px-3 justify-content-around container mx-auto"
//         id="products"
//       >
//         {products.map(p => {
//           return <ProductMini key={p.id} data={p} />;
//         })}
//       </div>
//     </React.Fragment>
//   );
// };

export default Products;
