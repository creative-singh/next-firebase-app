import { FaPlus } from "react-icons/fa";

const Form = (props:any) => {
  const {newItem, setNewItem, addItem} = props;
  
  return (
    <form className="grid grid-cols-6 items-center text-black">
      <input 
        type="text" 
        className="col-span-3 p-3 border rounded-lg"
        placeholder="Enter Item" 
        value={newItem.name}
        onChange={(e:any) => setNewItem({...newItem, name: e.target.value})}
      />
      <input
        type="number" 
        className="col-span-2 p-3 border mx-3 rounded-lg" 
        placeholder="Enter $" 
        value={newItem.price}
        onChange={(e:any) => setNewItem({...newItem, price: e.target.value})}
      />
      <button 
        type="submit" 
        className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl rounded-lg"
        onClick={addItem}
      >
        <FaPlus className="m-auto" />
      </button>
    </form>
  )
}

export default Form