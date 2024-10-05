import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

// Custom Modal Component
const CustomModal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold focus:outline-none"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const FileUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    console.log('Accepted Files:', acceptedFiles);
    console.log('Rejected Files:', rejectedFiles);
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'video/mp4': ['.mp4'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/illustrator': ['.ai'],
    },
  });

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-6">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-7 border-2 border-dashed rounded-lg cursor-pointer 
        ${isDragActive ? 'border-[#753CBD] bg-[#F1ECF8]' : 'border-[#E2E8F0] bg-[#FAFAFA]'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <div>
            <Image src="/assets/icons/upload-icon.svg" alt="Upload Icon" width={68} height={59} />
          </div>
          <p className="py-2.5 text-xl font-medium text-[#5F6368]">
            Drag & drop files or{' '}
            <span className="text-[#753CBD] font-semibold cursor-pointer underline">Browse</span>
          </p>
          <p className="text-sm font-normal text-[#676767] text-center">Supported formats: JPEG, PNG, GIF, MP4, PDF, AI, Word, PPT</p>
        </div>
      </div>

      {/* Display the uploaded files */}
      <div className="mt-4 w-full">
        {uploadedFiles.length > 0 && (
          <div className="bg-white">
            <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
            <ul className="list-disc list-inside flex gap-4 flex-wrap">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  {file.type.startsWith('image/') && (
                    <div className="w-40 h-28 cursor-pointer" onClick={() => openModal(URL.createObjectURL(file))}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="rounded-lg object-contain w-full h-full border"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Custom Modal for displaying full image */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && (
          <div className='overflow-y-scroll h-[400px] hide-scrollbar'>
            <h2 className="text-lg font-semibold mb-4">Image Preview</h2>
            <img src={selectedImage} alt="Preview" className="w-full h-auto overflow-hidden rounded-lg" />
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default FileUpload;
