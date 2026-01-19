import React, { useEffect, useState } from 'react'
import { Header } from '../components/common/Header'
import { collection, doc, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setPodcast } from '../slices/podCastSlice'
import { PodcastCard } from '../components/common/Podcast/PodcastCard'
import { InputComponent } from '../components/common/Input'
import { useLocation } from "react-router-dom";


export const Podcasts = () => {

    const dispatch= useDispatch();
    const podcasts= useSelector((state)=> state.podcasts.podcasts);
    const [search, setSearch]= useState("");
    const [genere, setGenere]= useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [collectionData, setCollectionData] = useState([]);
  
    const location = useLocation();
    const API_URL = "https://podcast-backend-zbz1.onrender.com";
  // Fetching Podcast Details from firestore
        useEffect(() => {
          if (podcasts.length === 0) {
            fetch(`${API_URL}/api/podcasts`)
              .then(res => res.json())
              .then(data => dispatch(setPodcast(data)));
          }
        }, [location.pathname]);


    // Fetch data from users collection
   useEffect(() => {
    const fetchCollectionData = async () => {
      const yourCollection = collection(db, 'users'); 

      try {
        const querySnapshot = await getDocs(yourCollection);

        // Extract data from each document in the collection
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCollectionData(data);
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    };

    fetchCollectionData();
  }, []); 

    useEffect(() => {
      // Filter the data based on the search value
      const newFilteredData = podcasts.filter(item =>
        item && item.title && item.title.toLowerCase().includes(search.toLowerCase())
      );
  
      // Update the state with the filtered data
      setFilteredData(newFilteredData);

      const newFilteredData1 = podcasts.filter(item =>
        item && item.title && item.title.toLowerCase().includes(search.toLowerCase()) &&
        (!genere || item.genere === genere) // Adjust this condition based on your data structure
      );
  
      // Update the state with the filtered data
      setFilteredData(newFilteredData1);
    }, [podcasts, search, genere]);
        
  return (
    <div>
        <Header />
        <div className="wrapper" style={{marginTop:'1rem'}}>
            <h1>Podcasts</h1>
            <input className='inpu'
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
      />
      <div className='gg'> 
        <label htmlFor='cars'>Filter by Genere</label>
        <select name="" id="cars" value={genere} onChange={(e)=> setGenere(e.target.value)}>
        <option value="sports">Sports</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="fiction">Fiction</option>
        </select>
      </div>
       {filteredData.length === 0 ? (
        <p>No matching results found.</p>
      ) : (
        <div className='podcast-flex'>
          {filteredData.map((item) => {
            if(collectionData.length>0){
              var nameR='';
              collectionData.map((ff)=>{
                if(ff.id.trim().toLowerCase()==item.createdBy.trim().toLowerCase()){
                  nameR=ff.name;
                }
              })
            }
            console.log("Creator Name for podcast", item);
            return <PodcastCard key={item._id} id={item._id} title={item.title} displayImage={item.displayImage} created={nameR}  />
          })}
        </div>
      )}
        </div>
    </div>
  )
}