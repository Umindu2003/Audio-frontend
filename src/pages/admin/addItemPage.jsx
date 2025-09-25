export default function AddItemPage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1>Add New Item</h1>
      <div className="w-[400px] border flex flex-col items-center"> 
        <input type="text" placeholder="product key"/>
        <input type="text" placeholder="product name"/>
        <input type="text" placeholder="product price"/>
        <select>
          <option key="audio">Audio</option>
          <option key="lights">Lights</option>
        </select>  

        <input type="text" placeholder="product Dimensions"/>
        <input type="text" placeholder="product Description"/>

        <button>Add</button>
      </div>
    </div>
  );
}
