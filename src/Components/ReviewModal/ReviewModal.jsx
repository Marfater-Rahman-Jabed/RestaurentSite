import { useContext, useState } from "react";
import { AuthContexts } from "../../Contexts/Contexts";
import { toast } from "react-hot-toast";

const ReviewModal = () => {
    // const [visible, setVisible] = useState(false);
    const [reviews, setReviews] = useState('');
    // console.log(reviews)
    const { user } = useContext(AuthContexts);
    const handleSubmit = () => {
        // e.preventDefault()
        // // console.log(reviews)
        // const form = e.target;
        // const review = form.review.value;
        console.log(reviews)
        // setReviews('')
        const data = {
            name: user?.displayName,
            address: 'Bangladesh',
            picture: user?.photoURL,
            description: reviews
        }

        fetch('http://localhost:5000/clientReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Your Review is successfully Received')
                console.log(data)
            })


    }
    return (
        <div>
            {/* You can open the modal using ID.showModal() method */}

            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box" >
                    <button className="btn btn-md btn-circle hover:bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700 absolute hover:text-white right-4 top-4 text-2xl" title="Cancel">✕</button>
                    <h3 className="font-bold  text-fuchsia-600 my-4 text-2xl">Please gives your  Openion</h3>
                    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                    <textarea className="textarea textarea-secondary w-full" placeholder="Text your valuable openion" name="review" onChange={(e) => setReviews(e.target.value)}></textarea>
                    {reviews && <div className="flex justify-end mt-2">
                        <input type="submit" className="btn btn-md bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700  text-white" value="Submit" onClick={handleSubmit} />
                        {/* <button >Submit</button> */}
                    </div>}
                </form>
            </dialog>
        </div>
    );
};

export default ReviewModal;