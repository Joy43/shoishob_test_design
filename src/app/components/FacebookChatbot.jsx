

import { FaFacebookMessenger } from 'react-icons/fa';

export default function FacebookChatbot() {


  return (
    <div className="fixed bottom-20 right-3">
      <a
       href="https://www.facebook.com/profile.php?id=61569044288417', '_blank'"
        className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all"
      >
        <FaFacebookMessenger size={26} />
      </a>
    </div>
  );
}
