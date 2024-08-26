function ConfirmDeletion({ setDetetePopup, multipleDelete, deletePopup }) {
  async function handleConfirm() {
    multipleDelete();
  }
  return (
    <div className={`confirmDeletion ${deletePopup ? `flex` : `hidden`} `}>
      <div className="deletionContainer">
        <h3 className="text-red-500 font-bold">Confirm deletion!</h3>
        <div className="flex gap-3 w-full justify-center items-center">
          <button
            className="cancel text-white font-bold py-2 px-4 roundedactive:scale-95 bg-blue-600"
            onClick={() => setDetetePopup(false)}
          >
            Cancel
          </button>
          <button
            className="confirm py-2 px-4 active:scale-95  bg-red-600 text-white font-bold  rounded"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletion;
