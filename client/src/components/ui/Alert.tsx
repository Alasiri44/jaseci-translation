import { useEffect } from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // hide after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-red-400 text-black px-4 py-2 rounded-lg shadow-lg font-semibold z-50 animate-bounce">
       {message}
    </div>
  );
};

export default Alert;
