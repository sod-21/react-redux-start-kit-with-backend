import React, { useMemo } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function Loading(props) {
  const {open}  = props;
  const classNames = useMemo(() => ({
    overlay: '',
    modal: 'loading'
  }), []);

  return (
    <Modal open={open} classNames={classNames} onClose={() => {}}>
      <div class="flex items-center justify-center  ">
        <div class="w-32 h-32 border-b-2 border-white-900 rounded-full animate-spin"></div>
      </div>
    </Modal>
  );
}