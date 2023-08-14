"use client";
import { BsFillPencilFill } from "react-icons/bs";
import {
  AiFillCopy,
  AiFillDelete,
  AiFillEye,
  AiFillSetting,
  AiOutlineStar,
} from "react-icons/ai";
import Modal from "./modal";
import { FaStickyNote } from "react-icons/fa";

const MenuItem = ({
  children,
  mouseEvent,
}: {
  children: any;
  mouseEvent?: () => void;
}) => {
  return (
    <div className="px-2 text-xl text-sky-900 rounded hover:bg-black/10">
      <button className="flex items-center gap-4" onClick={mouseEvent}>
        {children}
      </button>
    </div>
  );
};

const Menu = ({
  closeMenu,
  yPosition,
  handleEdit,
  handlePreview,
}: {
  closeMenu: () => void;
  yPosition: number;
  handleEdit: () => void;
  handlePreview: () => void;
}) => {
  return (
    <Modal closePortal={closeMenu}>
      <div
        className="absolute right-10 bg-white p-4 space-y-2 shadow rounded-md text-black"
        style={{ top: yPosition }}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem mouseEvent={handleEdit}>
          <BsFillPencilFill />
          <p>Edit</p>
        </MenuItem>
        <MenuItem mouseEvent={handlePreview}>
          <AiFillEye />
          <p>Preview</p>
        </MenuItem>
        <MenuItem>
          <AiFillSetting />
          <p>Settings</p>
        </MenuItem>
        <MenuItem>
          <FaStickyNote />
          <p>Notes</p>
        </MenuItem>
        <MenuItem>
          <AiOutlineStar />
          <p>Favorite</p>
        </MenuItem>
        <MenuItem>
          <AiFillCopy />
          <p>Copy</p>
        </MenuItem>
        <MenuItem>
          <AiFillDelete />
          <p>Delete</p>
        </MenuItem>
      </div>
    </Modal>
  );
};

export default Menu;