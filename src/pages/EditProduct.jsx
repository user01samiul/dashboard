import { getDatabase, ref, update } from "firebase/database";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const { state } = useLocation();
  const { product } = state;
  const [edit, setEdit] = useState(false);
  const [productDetails, setProductDetails] = useState(product);
  console.log(productDetails);
  function handleChange(e) {
    const name = e.target.name;
    setProductDetails((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  }

  function handleEditClick() {
    setEdit(true);
  }

  //updating a specific data (an object in the array)
  async function handleDone(productDetails) {
    const db = getDatabase();
    const dataRef = ref(db, "products");

    // Assuming productDetails has a unique identifier, replace 'uniqueId' with the actual property name
    const id = productDetails.id - 1;

    // Create an object with the paths to update
    const updates = {
      [`${id}`]: productDetails, // in array => id of the object in firebase (index/ custom id)
    };

    try {
      await update(dataRef, updates);
      setEdit(false); // Set edit mode to false after successfully updating
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-100% w-100%">
      <div onClick={handleEditClick} className="edit p-2 bg-green-600 w-28">
        Edit product
      </div>
      <div className="productPhoto w-full flex justify-center">
        <div className="photoConatiner mr-[10%]">
          <img src={product.photo} alt={product.title} />
        </div>
      </div>
      <div className="productDetails">
        <table className=" my-6 w-[90%]">
          <thead>
            <tr>
              <td className=" text-center bg-white text-black font-bold border">
                Brand
              </td>
              <td className=" text-center bg-white text-black font-bold border">
                Product
              </td>
              <td className=" text-center bg-white text-black font-bold border">
                Price
              </td>
              <td className=" text-center bg-white text-black font-bold border">
                Status
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" text-center bg-white text-black border">
                {product.brand}
              </td>
              <td className=" text-center bg-white text-black border">
                {product.title}
              </td>
              <td className=" text-center bg-white text-black border">
                {product.price}
              </td>
              <td className=" text-center bg-white text-black border">
                {product.status}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="description w-[90%] ">
          <h1 className="text-2xl">Product Details</h1>
          <p className="text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad nobis
            error excepturi commodi minima exercitationem recusandae numquam
            totam et magni nisi laboriosam laudantium sapiente, labore voluptate
            architecto alias, pariatur quasi vero quidem accusamus fugit quam
            sint non. Nobis sed illum expedita cum quas corporis eos quod
            eligendi voluptas vitae unde, earum iste aperiam consequatur veniam,
            at repudiandae! Qui eaque quis alias dicta, numquam voluptas facere
            nam pariatur eligendi debitis maxime cum tempora, quas, praesentium
            corporis consequuntur sed sint iste quam officia vel aspernatur
            aliquid ducimus beatae? Enim, excepturi recusandae magnam veniam
            aspernatur fugit sapiente, dolorem provident beatae ipsum aliquam
            necessitatibus!
          </p>
        </div>
      </div>
      <div
        className={`${
          edit ? "flex" : "hidden"
        } box-border absolute top-0 left-0 h-screen w-full justify-center items-center editPage`}
      >
        <div className="h-[80%] w-[70%] bg-white opacity-100 text-black flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center my-3">
            Edit product details
          </h1>
          <table className="ml-4 editTable w-[95%] ">
            <tbody className=" ">
              <tr>
                <td className="px-4">Product name </td>
                <td className="px-4">
                  <input
                    type="text"
                    className="border h-[35px] w-[100%] focus:outline-none"
                    name="title"
                    onChange={(e) => handleChange(e)}
                    value={productDetails.title}
                  />
                </td>
              </tr>
              <tr>
                <td className="px-4">Brand </td>
                <td className="px-4">
                  <input
                    type="text"
                    className="border h-[35px] w-[100%] focus:outline-none"
                    name="brand"
                    onChange={(e) => handleChange(e)}
                    value={productDetails.brand}
                  />
                </td>
              </tr>
              <tr>
                <td className="px-4">Price </td>
                <td className="px-4">
                  <input
                    type="text"
                    className="border h-[35px] w-[100%] focus:outline-none"
                    name="price"
                    onChange={(e) => handleChange(e)}
                    value={productDetails.price}
                  />
                </td>
              </tr>
              <tr>
                <td className="px-4">status </td>
                <td className="px-4">
                  <select
                    name="status"
                    onChange={(e) => handleChange(e)}
                    value={productDetails.status}
                  >
                    <option value="In stock">In stock</option>
                    <option value="Stock out">Stock out</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className=" m-6 flex gap-4">
            <button
              className="py-2 px-5  bg-red-500  active:scale-[0.98]"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-8  bg-green-500 active:scale-[0.98]"
              onClick={() => handleDone(productDetails)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
