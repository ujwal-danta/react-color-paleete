import "./App.css"
import {react,useEffect,useState} from 'react'
import { setDoc,addDoc,doc, onSnapshot ,collection,deleteDoc,query,where,getDocs} from "firebase/firestore";
import db from './firebase'
const Dot = ({ color }) => {
  const style = {
    height: "25px",
    width: "25px",
    margin: "0px 10px",
    backgroundColor: color,
    borderRadius: "50%",
     display: "inline-block",
  };
  return <span style={style}></span>;
};
function App() {
const [colors,setColor] = useState([]);
useEffect(()=>
   onSnapshot(collection(db, "color"), (snapshot) => {
    setColor(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
}),[])
console.log(colors);


// on clicking new button to add a palette
const handleNew = async () => {
    const name = prompt("Enter name of the color");
    const value = prompt("Enter value");
    const docId = await addDoc(collection(db, "color"), {
    name,
    value
  });
  console.log(` new id is ${docId.id}`);
}

//on clicking edit
const handleEdit = async (id) => {
  const name = prompt("Enter name of the color");
  const value = prompt("Enter value");
  await setDoc(doc(db, "color", id), {
    name,
    value
  });
}

//on deleteing
const handleDelete = async (id) => {
  await deleteDoc(doc(db, "color", id));
}


//query delete
const handleQueryDelete = async ()=> {
  const deleteColor = prompt("Enter the color")
  const colorRef = collection(db, "color");
  const q = query(colorRef, where("name", "==", deleteColor));
  const querySnapshot = await getDocs(q);
  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  results.forEach(async (result) => {
    const docRef = doc(db, "color", result.id);
    await deleteDoc(docRef);
  });
}


  return (
    <div className="root">
    <button className="button" onClick={handleNew}>
      New
    </button>
    <button className="button" onClick={handleQueryDelete}>
      Query Delete
    </button>
    <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <button className="button2" onClick={()=>handleEdit(color.id)}>edit</button> 
            <button className="button2"  onClick={()=>handleDelete(color.id)}>Delete</button>
            <Dot color={color.value} /> {color.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
