/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";
import { TResponse, TSupply, TUser } from "../../types";
import closeIcon from "../../assets/images/close.svg";
import { useNavigate } from "react-router-dom";
import {useUpdateSupplyMutation} from "../../redux/features/supply/supplyApi";
import { FormEvent, useState} from "react";
import {toast} from "sonner";


type TDonateModalProps = {
  donateModal: boolean;
  closeDonateModal: any;
  supply: TSupply;
  user: TUser | null;
};

const DonateModal = ({
  donateModal,
  closeDonateModal,
  supply,
  user,
}: TDonateModalProps) => {

  const [quantity, setQuantity] = useState('')
  const [updateSupply] = useUpdateSupplyMutation()

  const navigate = useNavigate();
  const id = supply?._id

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault()
    const toastId = toast.loading('Submitting...')
    try{
      const updatedData = {
        id,
        data: {
          quantity: Number(supply?.quantity) + Number(quantity)
        }
      }
      const res = await updateSupply(updatedData) as TResponse<TSupply>

      if(res?.error){
        throw new Error(res?.error?.data?.message) 
      }
      toast.success('Successfully donate', {id: toastId, duration: 2000})
      navigate('/dashboard')
    }catch(err : any){
      console.log(err, 'err')
      toast.error(err?.message ? err?.message : 'Something went wrong', {id: toastId})
    }

  };

  return (
    <Modal
      isOpen={donateModal}
      onRequestClose={closeDonateModal}
      contentLabel="Example Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="flex justify-end">
        <button onClick={closeDonateModal}>
          <img src={closeIcon} alt="Close modal" />
        </button>
      </div>
      <div className="bg-brand bg-opacity-5 rounded-lg w-full p-8 mt-2">
        <p className="font-bold">Email: {user?.email || "Not Found"}</p>
        <p className="font-medium">
          Supply Title: {supply?.title || "Not Found"}
        </p>
        <p className="font-medium">
          Category: {supply?.category || "Not Found"}
        </p>
        <p className="font-medium">
          Quantity: {supply?.quantity || "Not Found"}
        </p>
        {/* <form onSubmit={handleForm}>
<button type="submit">subit</button>
        </form> */}

        <form
          onSubmit={handleSubmit}
          className="mt-3"
        >
          <div>
            <label className="text-sm">Donate Amount</label>
            <br />
            <input
              onChange={(e) => setQuantity(e.target.value)}
              id="quantity"
              name="quantity"
              type="text"
              className="border border-gray-300 w-full py-2 px-4 rounded-md focus:outline-none focus:border-brand placeholder:text-sm"
              placeholder="Enter quantity"
            />
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={closeDonateModal} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-solid">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DonateModal;
