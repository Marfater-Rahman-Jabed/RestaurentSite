import { useState } from "react";

const ReviewModal = () => {
    // const [visible, setVisible] = useState(false);
    const [reviews, setReviews] = useState('');
    // console.log(reviews)
    return (
        <div>
            {/* You can open the modal using ID.showModal() method */}

            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-md btn-circle hover:bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700 absolute hover:text-white right-4 top-4 text-2xl" title="Cancel">✕</button>
                    <h3 className="font-bold  text-fuchsia-600 my-4 text-2xl">Please gives your  Openion</h3>
                    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                    <textarea className="textarea textarea-secondary w-full" placeholder="Text your valuable openion" onChange={(e) => setReviews(e.target.value)}></textarea>
                    {reviews && <div className="flex justify-end mt-2">
                        <input type="submit" className="btn btn-md bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white" value="Submit" />
                        {/* <button >Submit</button> */}
                    </div>}
                </form>
            </dialog>
        </div>
    );
};

export default ReviewModal;