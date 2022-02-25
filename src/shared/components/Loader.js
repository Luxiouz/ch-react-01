import React from 'react';
import {Modal} from "../../styled/StyledComponents";

const Loader = () => {
    return (
        <Modal>
            <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
                <div className="spinner-border" role="status">
                </div> <br/> <span className="p-3 sr-only">Loading...</span>
            </div>
        </Modal>
    );
};

export default Loader;