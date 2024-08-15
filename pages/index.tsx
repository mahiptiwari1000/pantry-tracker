import React, {useState,useEffect} from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {

  const [items,setItems]:any = useState([]);
  const [newItem,setNewItem]:any = useState({name:'',price:''});
  const [total,setTotal]:any = useState(0);

  const addItem = async (e:any) => {
    e.preventDefault();
    if(newItem.name != '' && newItem.price != ''){
     await addDoc(collection(db, "items"), {
        name:newItem.name.trim(),
        price:newItem.price
      });
      setNewItem({name:'',price:''});
    }
  };

  const deleteItem = async (id:any) => {
    await deleteDoc(doc(db,'items',id));
  }


  useEffect(() => {
    const q = query(collection(db,'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {

      let itemsArr:any = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id:doc.id});
      })

      setItems(itemsArr);

      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum:any,item:any) => sum + parseFloat(item.price),0);
        setTotal(totalPrice);
      }

      calculateTotal();

      return () => unsubscribe();
    });
  },[]);

  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between sm:p-24 p-4`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Pantry Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input value={newItem.name} onChange={(e) => setNewItem({...newItem,name:e.target.value})} className="col-span-3 p-3 border" type="text" placeholder="Enter Item"/>
            <input value={newItem.price} onChange={(e) => setNewItem({...newItem,price:e.target.value})} className="col-span-2 p-3 border mx-3" type="number" placeholder="Enter $"/>
            <button onClick={addItem} className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl" type="submit">+</button>
          </form>

          <ul>
            {items.map((item:any,id:any) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">X</button>
              </li>
            ))}
          </ul>
            {
              items.length < 1 ? (
                ''
              ) : (
                <div className="flex justify-between p-3">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              )
            }
        </div>
      </div>
    </main>
  );
}
