import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState();
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button onClick={handleClick}>
      <HiOutlineDotsVertical className="font-bold  text-medium-grey text-xl" />
    </button>
  );
}
function List({ id, children, xPos = 0 }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (openId !== id || !position) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{
        position: "absolute",
        top: position.y + 10,
        right: position.x - xPos,
      }}
      id="menus-list"
      className="bg-white-bg border-border border rounded-md p-3 flex flex-col gap-1 w-[150px] shadow-md z-[999999] text-medium-grey [&>li:last-child]:text-red-500"
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, onClick, disabled }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    console.log("clicked");
    onClick?.();
    close();
  }
  return (
    <li cl>
      <button onClick={handleClick} disabled={disabled} className="">
        <span className="text-[0.68rem] font-medium ">{children}</span>
      </button>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
