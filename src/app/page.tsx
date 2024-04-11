'use client'

import { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import {db} from "./firebase"
import Form from "./Components/Form";
import ItemsView from "./Components/ItemsView";
import TotalView from "./Components/TotalView";
import { Slide, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [items, setItems] = useState<Array<any>>([]);
  const [newItem, setNewItem] = useState({
    name: "", 
    price: ""
  })
  const [total, setTotal] = useState(0);

  // Add Item to DB
  const addItem = async (e:any) =>{
    e.preventDefault();
    if(newItem.name !== "" && newItem.price !== "") {
      try {
        await addDoc(collection(db, "items"), {
          name: newItem.name,
          price: newItem.price,
        });
        toast.success("Item added successfully!");
      } catch (err:any) {
        console.error("Error adding document: ", err);
        toast.error("Error adding item: " + err.message);
      }
      setNewItem({name: "", price: ""});
    }
  }

  // Read Item from DB
  useEffect(()=>{
    try {
      const q = query(collection(db, "items"))
      const unsubscribe = onSnapshot(q, (querySnapshot:any)=> {
        let itemsArr:any[] = []

        querySnapshot.forEach((doc:any) => {
          itemsArr.push({ id: doc.id,...doc.data() })
        });
        setItems(itemsArr)
        // Read total from itemsArr
        const calculateTotal = () => {
          const totalPrice = itemsArr.reduce((sum, item)=> sum + parseFloat(item.price), 0)
          setTotal(totalPrice)
        }
        calculateTotal()
        return () => unsubscribe();
      })
    } catch (err:any) {
      console.error("ERROR WHILE READING STORE :: ", err)
      toast.error("Error reading item from store: " + err.message);
    }
  }, [])

  // Update Item from DB
  const editItem = async (id: string) => {
    console.warn('THIS IS FEATURE IS NOT LIVE YET')
  }

  // Delete Item from DB
  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "items", id));  
      toast.success("Item deleted successfully!");
    } catch (err:any) {
      console.error("ERROR WHILE DELETING :: ", err)
      toast.error("Error deleting item: " + err.message);
    }
    
  }
  
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
          <div className="bg-slate-800 p-4 rounded-lg">
            <Form 
              newItem={newItem} 
              setNewItem={setNewItem}
              addItem={addItem}
            />

            <ItemsView
              items={items}
              deleteItem={deleteItem}
              editItem={editItem}
            />

            {!!total && (
              <TotalView 
                total={total} 
              />
            )}
          </div>
        </div>
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
}
