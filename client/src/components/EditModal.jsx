import React, {useEffect, useState} from "react";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import { setToggleEditModal, } from "../redux/modalReducer";

const EditModal = (props) => {
    /* Access states from redux store */
    const toggleEditModalState = useSelector((state) => {
        return state.modal.toggleEditModal;
    });

    /* Access action from redux store */
    const dispatch = useDispatch();

    /* States */
    const [user, setUser] = useState(props.user);

    const [userName, setUserName] = useState(user?.userName);
    const [userNickname, setuserNickname] = useState(user?.userNickname);
    const [email, setemail] = useState(user?.email);
    const [contact, setcontact] = useState(user?.contact);
    const [address, setaddress] = useState(user?.address);
    const [description, setdescription] = useState(user?.description);

    const [userPreviousUserName, setUserPreviousUserName] = useState(user?.userName);
    const [userPreviousUserNickname, setUserPreviousUserNickname] = useState(user?.userNickname);
    const [userPreviousEmail, setUserPreviousEmail] = useState(user?.email);
    const [userPreviousContact, setUserPreviousContact] = useState(user?.contact);
    const [userPreviousAddress, setUserPreviousAddress] = useState(user?.address);
    const [userPreviousDescription, setUserPreviousDescription] = useState(user?.description);

    const [haveUserName, setHaveUserName] = useState(false);
    const [haveUserNickname, setHaveUserNickname] = useState(false);
    const [haveEmail, setHaveEmail] = useState(false);
    const [haveContact, setHaveContact] = useState(false);
    const [haveAddress, setHaveAddress] = useState(false);
    const [haveDescription, setHaveDescription] = useState(false);

    const [toggleEditUserNameState, setToggleEditUserName] = useState(false);
    const [toggleEditUserNicknameState, setToggleEditUserNickname] = useState(false);
    const [toggleEditEmailState, setToggleEditEmail] = useState(false);
    const [toggleEditContactState, setToggleEditContact] = useState(false);
    const [toggleEditAddressState, setToggleEditAddress] = useState(false);
    const [toggleEditDescriptionState, setToggleEditDescription] = useState(false);

    /* Toggle Editing Handler */
    const toggleEditUserName = (e) => {
        setToggleEditUserName(!toggleEditUserNameState);
        setToggleEditUserNickname(!toggleEditUserNicknameState);
    }
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

    /* Textfield On Change Handler */
    const handleUserNameEditChange = (e) => {
        setUserName(e.target.value);
    }
    const handleUserNicknameEditChange = (e) => {
        setuserNickname(e.target.value);
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

    /* Restore previous setting Handler */
    const retainUserName = (e) => {
        setUserName(userPreviousUserName);
        setToggleEditUserName(!toggleEditUserNameState);
        setuserNickname(userPreviousUserNickname);
        setToggleEditUserNickname(!toggleEditUserNicknameState);
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

    /* Update Handler */
    const updateUserName = (e) => {
        if (userName){
            setHaveUserName(true);
        } else {
            setHaveUserName(false);
        }
        if (userNickname){
            setHaveUserNickname(true);
        } else {
            setHaveUserNickname(false);
        }
        setUserPreviousUserName(userName);
        setToggleEditUserName(!toggleEditUserNameState);
        setUserPreviousUserNickname(userNickname);
        setToggleEditUserNickname(!toggleEditUserNicknameState);
    }

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

    /* Send the edited data to profilePage.jsx */
    const handleCloseEditModal = (e) => {
        const data = {userName, userNickname, email, contact, address, description};
        props.sendDataToParent(data);
        dispatch(setToggleEditModal());
    };

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
                                <i className="fa-solid fa-signature icon"></i>
                                {((haveUserName || userName) && !toggleEditUserNameState && toggleEditModalState) && (<strong>{userName}</strong>)}
                                {((haveUserNickname || userNickname) && !toggleEditUserNicknameState && toggleEditModalState) && (<strong className="userNickname-text">{userNickname}</strong>)}
                                {!toggleEditUserNameState && toggleEditModalState && <button className="edit-username-button" onClick={toggleEditUserName}><i className="fa-solid fa-pen-clip"></i></button>}
                                <br />

                                {/* <i className="fa-solid fa-signature icon"></i>
                                {!toggleEditUserNicknameState && toggleEditModalState && <button className="edit-user-nickname-button" onClick={toggleEditUserNickname}><i className="fa-solid fa-pen-clip"></i></button>}
                                <br /> */}

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

                            {(toggleEditUserNameState && toggleEditModalState) && 
                                <div className="username-textfield-container">
                                    <div className="form-floating ">
                                        <input type="text" className="form-control username-textfield" id="floatingInput" placeholder="Username" value={userName} onChange={handleUserNameEditChange} />
                                        <label htmlFor="floatingInput">Username</label>
                                        {/* <div className="errorMsg">{emailErrMsg}</div> */}
                                    </div>
                                </div>
                            }

                            {(toggleEditUserNicknameState && toggleEditModalState) && 
                                <div className="user-nickname-textfield-container">
                                    <div className="form-floating ">
                                        <input type="text" className="form-control user-nickname-textfield" id="floatingInput" placeholder="Nickname" value={userNickname} onChange={handleUserNicknameEditChange} />
                                        <label htmlFor="floatingInput">Nickname</label>
                                        {/* <div className="errorMsg">{emailErrMsg}</div> */}
                                    </div>
                                    <button className="edit-button edit-username edit-user-nickname" onClick={updateUserName} >Edit</button>
                                    <button className="cancel-button cancel-username cancel-user-nickname" onClick={retainUserName}><i className="fa-solid fa-rotate-right"></i></button>
                                </div>
                            }

                            {/* Email edit textfield */}
                            {(toggleEditEmailState && toggleEditModalState) && 
                                <div className="email-textfield-container">
                                    <div className="form-floating ">
                                        <input type="email" className="form-control email-textfield" id="floatingInput" placeholder="Email" value={email} onChange={handleEmailEditChange} />
                                        <label htmlFor="floatingInput">Email</label>
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