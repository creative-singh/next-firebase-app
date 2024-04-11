import { FaRegEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const ItemsView = (props:any) => {
  const {items, deleteItem, editItem} = props

  return (
    <ul className="max-h-72 overflow-auto custom-scrollbar">
      {items.map((item:any)=>(
        <li key={item.id} className="my-4 w-full flex justify-between bg-slate-950 rounded-lg">
          <div className="p-4 w-full flex justify-between">
            <span className="capitalize">{item.name}</span>
            <span>${item.price}</span>
          </div>
          <button
            className="p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16 text-xl"
            onClick={()=>editItem(item.id)}
          >
            <FaRegEdit />
          </button>
          <button
            className="p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16 text-xl"
            onClick={()=>deleteItem(item.id)}
          >
            <MdDelete />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ItemsView