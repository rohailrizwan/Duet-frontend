import React from 'react';
import { Modal, Button } from 'antd';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is included in your project

const DeleteModal = ({ open, setOpen, handleOk, loading, title = "item" }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={<span className="text-2xl font-bold text-red-600">{'Confirm Delete'}</span>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      zIndex={10000} // High z-index for priority
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
          className="border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </Button>,
        <Button
          key="delete"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold"
          loading={loading}
          onClick={handleOk}
        >
          Delete
        </Button>,
      ]}
    >
      <p className="text-lg text-gray-800">
        Are you sure you want to delete this <span className="font-semibold text-red-600">{title}</span>?
      </p>
    </Modal>
  );
};

export default DeleteModal;