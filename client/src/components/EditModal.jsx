import React, {useEffect, useState} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import { setToggleEditModal, } from "../redux/modalReducer";

/* Import useFetch to fetch data */
import useFetch from "scenes/useFetch";

const Email = 'j179988143412@gmail.com';
const databaseUrl = `http://localhost:3001/users/email?email=${Email}`;

const EditModal = (props) => {
    /* Access states from redux store */
    const toggleEditModalState = useSelector((state) => {
        return state.modal.toggleEditModal;
    });

    /* Access action from redux store */
    const dispatch = useDispatch();

    /* States */
    const [User, setUser] = useState(props.user);

    const [email, setemail] = useState(User?.email);
    const [contact, setcontact] = useState(User?.contact);
    const [address, setaddress] = useState(User?.address);
    const [description, setdescription] = useState(User?.description);

    const [userPreviousEmail, setUserPreviousEmail] = useState(User?.email);
    const [userPreviousContact, setUserPreviousContact] = useState(User?.contact);
    const [userPreviousAddress, setUserPreviousAddress] = useState(User?.address);
    const [userPreviousDescription, setUserPreviousDescription] = useState(User?.description);

    const [haveEmail, setHaveEmail] = useState(false);
    const [haveContact, setHaveContact] = useState(false);
    const [haveAddress, setHaveAddress] = useState(false);
    const [haveDescription, setHaveDescription] = useState(false);

    const [toggleEditEmailState, setToggleEditEmail] = useState(false);
    const [toggleEditContactState, setToggleEditContact] = useState(false);
    const [toggleEditAddressState, setToggleEditAddress] = useState(false);
    const [toggleEditDescriptionState, setToggleEditDescription] = useState(false);

    /* Handler */
    const toggleEditEmail = (e) => {
        setToggleEditEmail(!toggleEditEmailState);
    }
    const toggleEditContact = (e) => {
        setToggleEditContact(!toggleEditContactState);
    }
    const toggleEditAddress = (e) => {
        setToggleEditAddress(!toggleEditAddressState);
    }
    const toggleEditDescription = (e) => {
        setToggleEditDescription(!toggleEditDescriptionState);
    }

    const handleEmailEditChange = (e) => {
        setemail(e.target.value);
    }
    const handleContactEditChange = (e) => {
        setcontact(e.target.value);
    }
    const handleAddressEditChange = (e) => {
        setaddress(e.target.value);
    }
    const handleDescriptionEditChange = (e) => {
        setdescription(e.target.value);
    }

    const retainEmail = (e) => {
        setemail(userPreviousEmail);
        setToggleEditEmail(!toggleEditEmailState);
    }
    const retainContact = (e) => {
        setcontact(userPreviousContact);
        setToggleEditContact(!toggleEditContactState);
    }
    const retainAddress = (e) => {
        setaddress(userPreviousAddress);
        setToggleEditAddress(!toggleEditAddressState);
    }
    const retainDescription = (e) => {
        setdescription(userPreviousDescription);
        setToggleEditDescription(!toggleEditDescriptionState);
    }

    const handleCloseEditModal = (e) => {
        const data = {email, contact, address, description};
        props.sendDataToParent(data);
        dispatch(setToggleEditModal());
    };

    const updateEmail = (e) => {
        if (email){
            setHaveEmail(true);
        } else {
            setHaveEmail(false);
        }
        setUserPreviousEmail(email);
        setToggleEditEmail(!toggleEditEmailState);
    }
    const updateContact = (e) => {
        if (contact){
            setHaveContact(true);
        } else {
            setHaveContact(false);
        }
        setUserPreviousContact(contact);
        setToggleEditContact(!toggleEditContactState);
    }
    const updateAddress = (e) => {
        if (address){
            setHaveAddress(true);
        } else {
            setHaveAddress(false);
        }
        setUserPreviousAddress(address);
        setToggleEditAddress(!toggleEditAddressState);
        
    }
    const updateDescription = (e) => {
        if (description){
            setHaveDescription(true);
        } else {
            setHaveDescription(false);
        }
        setUserPreviousDescription(description);
        setToggleEditDescription(!toggleEditDescriptionState);
    }

    return ( 
        <>
            {toggleEditModalState && (<div className="modal-container">
                <div className="modal-overlay">
                    <div className="modal-grid-container">
                        {/* Column 1 */}
                        <div className="edit-modal-col-1">
                            <h4 className="title">Edit Personal Information</h4>
                            <hr className="modal-horizontal-line"/>

                            {/* Edit personal information container */}
                            <div className="edit-container">
                                <i className="fa-solid fa-envelope icon"></i>
                                {((haveEmail || email) && !toggleEditEmailState && toggleEditModalState) && (<strong>{email}</strong>)}
                                {!toggleEditEmailState && toggleEditModalState && <button className="edit-email-button" onClick={toggleEditEmail}><i className="fa-solid fa-pen-clip"></i></button>}
                                <br />

                                <i className="fa-solid fa-phone-volume icon"></i>
                                {((haveContact || contact) && !toggleEditContactState && toggleEditModalState) && (<strong>{contact}</strong>)}
                                {!toggleEditContactState && toggleEditModalState && <button className="edit-contact-button" onClick={toggleEditContact}><i className="fa-solid fa-pen-clip"></i></button>}
                                <br />

                                <i className="fa-solid fa-location-crosshairs icon"></i>
                                {((haveAddress || address) && !toggleEditAddressState && toggleEditModalState) && (<strong>{address}</strong>)}
                                {!toggleEditAddressState && toggleEditModalState && <button className="edit-address-button" onClick={toggleEditAddress}><i className="fa-solid fa-pen-clip"></i></button>}
                                <br />

                                <i className="fa-solid fa-comment-dots icon"></i>
                                {((haveDescription || description) && !toggleEditDescriptionState && toggleEditModalState) && (<strong>{description}</strong>)}
                                {!toggleEditDescriptionState && toggleEditModalState && <button className="edit-description-button" onClick={toggleEditDescription}><i className="fa-solid fa-pen-clip"></i></button>}
                                <br />
            
                            </div>

                            {(toggleEditEmailState && toggleEditModalState) && 
                                <div className="email-textfield-container">
                                    <div className="form-floating ">
                                        <input type="email" className="form-control email-textfield" id="floatingInput" placeholder="Email" value={email} onChange={handleEmailEditChange} />
                                        <label htmlFor="floatingInput">Email address</label>
                                        {/* <div className="errorMsg">{emailErrMsg}</div> */}
                                    </div>
                                    <button className="edit-button" onClick={updateEmail} >Edit</button>
                                    <button className="cancel-button" onClick={retainEmail}><i className="fa-solid fa-rotate-right"></i></button>
                                </div>
                            
                            }

                            {(toggleEditContactState && toggleEditModalState) && 
                                <div className="contact-textfield-container">
                                    <div className="form-floating">
                                        <input type="text" className="form-control text-textfield" id="floatingInput" placeholder="Contact" value={contact} onChange={handleContactEditChange} />
                                        <label htmlFor="floatingInput">Contact</label>
                                        {/* <div className="errorMsg">{emailErrMsg}</div> */}
                        
                                    </div>
                                    <button className="edit-button" onClick={updateContact} >Edit</button>
                                    <button className="cancel-button" onClick={retainContact}><i className="fa-solid fa-rotate-right"></i></button>
                                </div>
                            }

                            {(toggleEditAddressState && toggleEditModalState) && 
                                <div className="address-textfield-container">
                                    <div className="form-floating">
                                        <input type="text" className="form-control text-textfield" id="floatingInput" placeholder="Address" value={address} onChange={handleAddressEditChange} />
                                        <label htmlFor="floatingInput">Address</label>
                                        {/* <div className="errorMsg">{emailErrMsg}</div> */}
                                    </div>
                                    <button className="edit-button" onClick={updateAddress} >Edit</button>
                                    <button className="cancel-button" onClick={retainAddress}><i className="fa-solid fa-rotate-right"></i></button>
                                </div>
                            }

                            {(toggleEditDescriptionState && toggleEditModalState) && 
                                <div className="description-textfield-container">
                                    <div className="form-floating">
                                        <input type="text" className="form-control text-textfield" id="floatingInput" placeholder="Self-Description" value={description} onChange={handleDescriptionEditChange} />
                                        <label htmlFor="floatingInput">Description</label>
                                        {/* <div className="errorMsg">{emailErrMsg}</div> */}
                                    </div>
                                    <button className="edit-button" onClick={updateDescription} >Edit</button>
                                    <button className="cancel-button" onClick={retainDescription}><i className="fa-solid fa-rotate-right"></i></button>
                                </div>
                            }

                            <button className="close-button" onClick={handleCloseEditModal}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )}
            
        </>
    );
}
 
export default EditModal;