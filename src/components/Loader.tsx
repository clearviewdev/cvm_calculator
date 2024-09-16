import React, { FC } from 'react';
import useLoaderStore from '../store/loaderStore';

const Loader: FC = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);

  if (!isLoading) return null; // Don't render the modal if not loading

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col ju items-center p-6 bg-white rounded-lg shadow-lg">
        <div className="loader-spinner w-14 h-14 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
