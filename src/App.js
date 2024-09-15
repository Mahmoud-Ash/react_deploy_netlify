import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState , useEffect} from 'react';
import apiRequest from './apiRequest';

function App() {
  const API_URL='http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedError, setFetchedError] = useState(null);


//####################################################################################################
  const fetchItems= async ()=>{
    try {
      const response = await fetch(API_URL);
      if (!response.ok)  throw  Error("Did not receive expected data");
      const listItems = await response.json();
      setItems(listItems);
      setFetchedError(null);
    } catch (err) {
      setFetchedError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    setTimeout(()=>fetchItems(),1000);
  },[] );
//####################################################################################################
  const addItem = async (item)=>{
    const id =items.length ? +items[items.length-1].id+1 : 1;
    const addedItem={id: id.toString() , checked: false, item};
    const listItems= [...items,addedItem];
    setItems(listItems)
    const postReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedItem)
    }
    const result= await apiRequest(API_URL, postReq);
    if (result) setFetchedError(result);
  }

//####################################################################################################
  const handleCheck = async (id)=>{
    const listItems = items.map((item)=> item.id == id ? { ...item, checked: !item.checked } : item  );
    setItems(listItems);
    const myItem=listItems.filter((item)=>item.id==id )
    const patchReq={
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({checked: myItem[0].checked})
    };
    const reqUrl= `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,patchReq)
    if (result) setFetchedError(result);
  }
//####################################################################################################

  const handleDelete = async (id)=>{
    const listItems = items.filter((item)=>item.id !== id);
    setItems(listItems);
    const reqUrl= `${API_URL}/${id}`;
    const delReq={
      method: 'DELETE'
    };
    const result= await apiRequest(reqUrl,delReq);
    if(result) setFetchedError(result);
  }
//####################################################################################################

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }
//####################################################################################################

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
        {fetchedError && <p style={{color: 'red'}}>{`Error:${fetchedError}`}</p>}
        {isLoading && <p>Loading items ...</p>}
        {!fetchedError && !isLoading&&
        <Content 
          items= {items.filter(item=> ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete} 
        />
        }
      </main>
      <Footer 
        length ={items.length} />
    </div>
  );
}

export default App;
