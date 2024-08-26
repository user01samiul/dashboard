import { ref as databaseRef, getDatabase, set } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageReference,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct({ setShow, show, rows }) {
  const navigate = useNavigate();
  const [newProductDetails, setNewProductDetails] = useState({
    id: "",
    title: "",
    brand: "",
    model: "",
    price: "",
    description: "",
    category: "",
    photo: "",
    status: "In stock",
    file: null,
  });

  function handleChange(e) {
    const type = e.target.type;
    const name = e.target.name;
    const file = e.target.files && e.target.files[0];

    setNewProductDetails((prev) => {
      return {
        ...prev,
        [name]: type === "file" ? file : e.target.value,
        id: rows.length + 1,
      };
    });
  }

  const uploadReady = [...rows];

  // Upload new product
  async function uploadNewProduct(data, newProductDetails) {
    const db = getDatabase();
    const dataRef = databaseRef(db, "products/");

    const storage = getStorage();
    const productStorageRef = storageReference(
      storage,
      `products/${newProductDetails.file.name}`
    );

    try {
      // Upload file to Firebase Storage
      const uploadResult = await uploadBytes(
        productStorageRef,
        newProductDetails.file
      );
      console.log("File uploaded:", uploadResult);

      // Get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("File available at:", downloadURL);

      // Add the download URL to newProductDetails
      const someData = { ...newProductDetails };
      someData.photo = downloadURL;

      uploadReady.push(someData);

      // Save product details to the database
      await set(dataRef, uploadReady);

      window.location.assign("https://dashboard-eta-beryl-68.vercel.app/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="add-product" style={{ display: show ? "flex" : "none" }}>
      <div className="addProductContainer">
        <div className="cross-icon" onClick={() => setShow(false)}>
          X
        </div>
        <h1>Add a new product</h1>
        <div className="new-product-details">
          <form className="w-full">
            <table className="w-full newProduct-table">
              <tbody>
                <tr>
                  <td> Product title</td>
                  <td>
                    <input
                      placeholder="Enter product title"
                      name="title"
                      className="newProduct-input"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      value={newProductDetails.title}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Company</td>
                  <td>
                    <input
                      placeholder="Enter product company"
                      name="brand"
                      className="newProduct-input"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      value={newProductDetails.company}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td> Model</td>
                  <td>
                    <input
                      placeholder="Enter product model"
                      name="model"
                      className="newProduct-input"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      value={newProductDetails.model}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td> Price ($)</td>
                  <td>
                    <input
                      placeholder="Enter product price"
                      name="price"
                      className="newProduct-input"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      value={newProductDetails.price}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td> Description</td>
                  <td>
                    <textarea
                      placeholder="Enter product details"
                      name="description"
                      className="text-area-for-new-product"
                      onChange={(e) => handleChange(e)}
                      value={newProductDetails.description}
                      required
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td> Category</td>
                  <td>
                    <select
                      name="category"
                      className="selectbox-newProduct"
                      onChange={(e) => handleChange(e)}
                      value={newProductDetails.category}
                      required
                    >
                      <option value={null}>---Choose an option---</option>
                      <option value="Smart phone">Smart phone</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Gadget">Gadget</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td> Product photo</td>
                  <td>
                    <input
                      name="file"
                      className="newProduct-photo"
                      type="file"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div>
          <button
          type="submit"
            onClick={() => uploadNewProduct(uploadReady, newProductDetails)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
