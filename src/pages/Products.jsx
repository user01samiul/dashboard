import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { getDatabase, ref, set } from "firebase/database";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ConfirmDeletion from "../components/ConfirmDeletion";
import useProducts from "../hooks/useProducts";

export default function Users() {
  const { products } = useProducts();

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [deletePopup, setDetetePopup] = React.useState(false);
  const showFromLocalStorage = JSON.parse(localStorage.getItem("show"));
  const [show, setShow] = useState(showFromLocalStorage || false);

  const [rows, setRows] = React.useState([]); //copied products actually

  const columns = [
    { field: "brand", headerName: "Brand", width: 150 },
    {
      field: "photo",
      headerName: "Photo",
      width: 80,
      renderCell: (params) => {
        return <img src={params.row.photo || "/noavatar.png"} />;
      },
    },
    { field: "title", headerName: "Name", width: 150 },
    { field: "status", headerName: "Verified", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="edit">
            <Link
              to={`/editproduct/${params.row.id}`}
              state={{ product: params.row }}
            >
              <button className="cursor-pointer " disabled>
                <i className="fa-regular fa-pen-to-square "></i>
              </button>
            </Link>
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="delete">
            <i
              onClick={() => deleteData(params.row.id)}
              className="fa-solid fa-trash"
            ></i>
          </div>
        );
      },
    },
  ];

  //sending show state to local storage to stop lose on refresh
  useEffect(() => {
    localStorage.setItem("show", JSON.stringify(show));
  }, [show]);

  //map returns an array itself
  const objects = products.map((product, index) => {
    return {
      id: index + 1,
      brand: product.brand,
      photo: product.photo,
      title: product.title,
      status: "In stock",
      price: `${product.price}`,
    };
  });

  React.useEffect(() => {
    setRows([...objects]);
  }, [products]);

  //delete function - temporarily deleting data from rows
  //signle
  function deleteData(idToDelete) {
    setRows((prev) => {
      return prev.filter((object) => {
        //returns passed items inside an array
        return object.id !== idToDelete;
      });
    });
  }

  //multiple select
  function multipleDelete(selectedRows) {
    setRows((prev) => {
      return prev.filter((item, index) => {
        return !selectedRows.includes(item.id);
      });
    });
    setDetetePopup(false);
  }
  // ------------------------
  //uploading the modified data to firebase.
  async function writeUserData(rows) {
    const db = getDatabase();
    const dataRef = ref(db, "products/");
    const modifiedData = rows;
    try {
      const sendData = await set(dataRef, modifiedData);
    } catch (err) {
      console.log(err);
    }
  }
  // update when confirmed (row changes)
  useEffect(() => {
    rows.length > 0 && writeUserData(rows);
  }, [rows]);

  return (
    <>
      <div style={{ width: "90%" }}>
        <div className="add-newProduct">
          <button
            className="bg-blue-500 mt-2 ml-0 mb-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShow(true)}
          >
            Add a new product
          </button>
        </div>
        <Box sx={{ height: 460, width: "100%", background: "white" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            disableRowSelectionOnClick
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Box>

        <button
          disabled={rowSelectionModel.length < 1}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          onClick={() => setDetetePopup(true)}
          className={` ${
            rowSelectionModel.length < 1 ? `bg-gray-600` : ` bg-red-600`
          }  float-right m-1 hover:cursor-pointer text-white font-bold py-2 px-4 rounded `}
        >
          Delete selected
        </button>
      </div>
      <ConfirmDeletion
        deletePopup={deletePopup}
        setDetetePopup={setDetetePopup}
        multipleDelete={() => multipleDelete(rowSelectionModel)}
      />
      <AddProduct setShow={setShow} show={show} rows={rows} />
      <p className="mt-2 "><span className="text-red-500">Edit icon</span> is disabled currently</p>
    </>
  );
}
