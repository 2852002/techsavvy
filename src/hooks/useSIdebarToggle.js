import { useState } from 'react';

const useSidebarToggle = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
  };
};

export default useSidebarToggle;
