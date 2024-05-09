import { useState } from "react";
import Modal from "react-modal";
import { createStep } from "../api/config/config";

Modal.setAppElement("body");

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  updateSteps: () => void;
}

export default function CreateStepForm({ isOpen, closeModal, updateSteps }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>("");

  const handleCreate = async () => {
    if (!id || !title || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await createStep(id, title, content);
      closeModal();
      setId("");
      setTitle("");
      setContent("");
      updateSteps();
    } catch (error) {
      console.error("Error creating step:", error);
      alert("Failed to create step. Please try again later.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
      className="bg-white p-12 gap-10 rounded-3xl min-w-[680px] min-h-[576px]"
    >
      <div className="font-bold text-2xl text-customPurple">
        Adicionar passo
      </div>
      <div className="mt-12 mb-4">
        <label className="block text-sm font-medium text-customText">Id</label>
        <input
          type="text"
          className="mt-1 bg-gray-100 text-customPurple px-4 py-3 block w-full focus:outline-none focus:ring focus:border-blue-300 rounded-xl"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-customText">
          Título
        </label>
        <input
          type="text"
          className="mt-1 bg-gray-100 text-customPurple px-4 py-3 block w-full focus:outline-none focus:ring focus:border-blue-300 rounded-xl"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-customText">
          Conteúdo
        </label>
        <textarea
          className="mt-1 bg-gray-100 text-customPurple px-4 py-3 block w-[584px] h-[100px] focus:outline-none focus:ring focus:border-blue-300 rounded-xl"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end mt-14">
        <button
          onClick={closeModal}
          className="bg-gray-50 text-base text-[#7357FF] font-bold py-2 px-6 mr-6 border-2 border-[#E2DCFF] rounded-xl"
        >
          Cancelar
        </button>
        <button
          onClick={handleCreate}
          className="bg-customPurple text-base text-white font-bold py-2 px-6 rounded-xl"
        >
          Criar passo
        </button>
      </div>
    </Modal>
  );
}
