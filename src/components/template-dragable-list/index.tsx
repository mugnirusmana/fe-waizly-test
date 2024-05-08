import React from "react"
import cx from "classnames";
import { FaEye } from "@react-icons/all-files/fa/FaEye"
import { FaPen } from "@react-icons/all-files/fa/FaPen"
import { FaTrash } from "@react-icons/all-files/fa/FaTrash"

interface PlanetListItem {
  name: string;
}

interface PlanetProps {
  item: PlanetListItem;
  itemSelected: number;
  dragHandleProps: object;
}
export default class DragableItem extends React.Component<PlanetProps> {
  render() {
    const { item, itemSelected, dragHandleProps } = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div
        className={`${cx('item', { dragged })} shadow-md`}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div className="dragHandle bg-transparent" {...dragHandleProps} />
        <div className="w-full flex flex-row relative items-center py-2 pr-2 bg-transparent justify-between gap-2">
          <span className="font-bold text-sm bg-transparent">{item.name}</span>
          <div className="w-fit flex fle-row gap-2">
            <div className="w-fit cursor-pointer text-xs rounded bg-white duration-200 text-gray-400 border border-gray-400 hover:text-white hover:bg-cyan-700 hover:border-cyan-700 p-1"><FaEye /></div>
            <div className="w-fit cursor-pointer text-xs rounded bg-white duration-200 text-gray-400 border border-gray-400 hover:text-white hover:bg-lime-700 hover:border-lime-700 p-1"><FaPen /></div>
            <div className="w-fit cursor-pointer text-xs rounded bg-white duration-200 text-gray-400 border border-gray-400 hover:text-white hover:bg-rose-700 hover:border-rose-700 p-1"><FaTrash /></div>
          </div>
        </div>
      </div>
    );
  }
}