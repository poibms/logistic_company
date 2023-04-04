import * as React from 'react';
import Modal from '@mui/material/Modal';
import { ModalProps as MuiModalProps } from '@mui/material';



type ModalProps = MuiModalProps & {
  open?: boolean,
  handleClose: any,
}

const BasicModal: React.FC<ModalProps> = ({ children, open, handleClose, ...rest }) => {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...rest}
      >
        
          {children}
      </Modal>
    </div>
  );
}

export default BasicModal;