"use client";

import React, { useState, useEffect } from 'react'; // Add useState and useEffect
import Image from 'next/image'; // Import Next.js Image component
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
// import './FeaturedPageStyles.css';
import { generateClient } from "aws-amplify/data"; // Add generateClient
import type { Schema } from "@/amplify/data/resource"; // Add Schema
// This is the version of the code that is not-hard coded, and will be used for 
//connecting to the backend, continue use next sprint


// Generate the Amplify Data Client
const client = generateClient<Schema>();

//const FeaturedPage: React.FC = () => {
  // Placeholder mode (set to false to enable fetching data later)
  const isPlaceholderMode = true;

//   // Placeholder message
//   if (isPlaceholderMode) {
//     return (
//       <div className="page-container">
//         <CustomNavbar />

//         <main className="featured-page">
//           <h1>Featured Products</h1>
//           <div className="placeholder-message">
//             <p>Coming Soon! Stay tuned for our featured products.</p>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     );
//   }

//   // If not in placeholder mode, fetch and display products
//   const [products, setProducts] = useState<Schema["Product"][]>([]);
//   const [loading, setLoading] = useState(true);

//   // Function to handle size selection
//   const handleSizeClick = (size: string) => {
//     console.log(`Selected size: ${size}`);
//   };

//   // Fetch products from the backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data: products } = await client.models.Product.list({
//           // Include variants in the query
//           selectionSet: ["name", "description", "basePrice", "imageUrl", "slug", "variants.*"],
//         });
//         setProducts(products);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Display skeleton loading while fetching data
//   if (loading) {
//     return <PrimedPage />;
//   }

//   return (
//     <div className="page-container">
//       <CustomNavbar />

//       <main className="featured-page">
//         <h1>Featured Products</h1>
//         <div className="product-grid">
//           {products.map((product: Schema["Product"]) => ( // Add type annotation
//             <div key={product.id} className="product-card">
//               {/* Next.js Image component instead of <img> */}
//               <Image
//                 src={product.imageUrl} // Use imageUrl from the backend
//                 alt={product.name}
//                 width={300} // Adjust width
//                 height={300} // Adjust height
//                 className="product-image"
//                 style={{ borderRadius: '10px' }}
//               />
//               <h3 className="product-name">{product.name}</h3>
//               <p className="product-description">{product.description}</p>
//               <p className="product-price">${product.basePrice.toFixed(2)}</p>

//               {/* Size Buttons */}
//               <div className="size-buttons">
//                 {product.variants?.map((variant) => ( // Use variants from the backend
//                   <button
//                     key={variant.id}
//                     className="size-button"
//                     onClick={() => handleSizeClick(variant.size)}
//                   >
//                     {variant.size}
//                   </button>
//                 ))}
//               </div>

//               <button className="add-to-cart">Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default FeaturedPage;