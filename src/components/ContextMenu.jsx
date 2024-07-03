import React from 'react';
import { MdOutlineStar, MdOutlineShare, MdOutlineContentCopy } from 'react-icons/md';
import { RiPushpinLine } from 'react-icons/ri';

const ContextMenu = React.forwardRef(({ position,  pinMessage, starMessage, copyMessage, shareMessage },ref) => {
  return (
    <div
    ref={ref}
      className="absolute shadow-lg border rounded-md z-50"
      style={{
        top: position.y,
        left: position.x,
        backgroundColor: '#1f2937', // Dark gray background color
        color: '#f9fafb', // Light text color for contrast
      }}
    >
      <ul className="p-2">
        <li
          onClick={pinMessage}
          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
        >
          <RiPushpinLine className="mr-2" /> Pin Message
        </li>
        <li
          onClick={starMessage}
          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
        >
          <MdOutlineStar className="mr-2" /> Star
        </li>
        <li
          onClick={copyMessage}
          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
        >
          <MdOutlineContentCopy className="mr-2" /> Copy
        </li>
        <li
          onClick={shareMessage}
          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
        >
          <MdOutlineShare className="mr-2" /> Share
        </li>
      </ul>
    </div>
  );
});

export default ContextMenu;
