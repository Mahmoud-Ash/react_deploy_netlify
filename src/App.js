import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState , useEffect} from 'react';

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');

  // using local storage 
  useEffect(()=>{
      localStorage.setItem('items', JSON.stringify(items))
  },[items]);
  
  const addItem = (item)=>{
    const id =items.length ? +items[items.length-1].id+1 : 1;
    const addedItem={id , checked: false, item};
    const listItems= [...items,addedItem];
    setItems(listItems);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  const handleCheck = (id)=>{
    const listItems = items.map((item)=> item.id === id ? { ...item, checked: !item.checked } : item  );
    setItems(listItems);
    }

  const handleDelete = (id)=>{
    const listItems = items.filter((item)=>item.id !== id);
    setItems(listItems);
  }

  return (
    <div className="App">
      <Header 
        title= 'Groceries List' />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit= {handleSubmit} />
      <SearchItem 
        searchItem= {searchItem}
        setSearchItem={setSearchItem} />
      <main>
        <Content 
          items= {items.filter(item=> ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete} 
        />
      </main>
      <Footer 
        length ={items.length} />
    </div>
  );
}

export default App;
