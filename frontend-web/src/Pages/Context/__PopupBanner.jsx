import React, { useEffect } from "react";

export const PopupBanner = () => {
  useEffect(() => {
    document.getElementById("my_modal_2").showModal();
  }, []);
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal backdrop-blur-sm">
        <div
          className="max-w-screen-sm absolute h-screen modal-middle"
          style={{ top: "13vh" }}>
          <div className="flex justify-center items-center">
            <img
              src="https://www.auto88group.com/image/brochure/202403011617244.jpg"
              alt=""
            />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
