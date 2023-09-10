import {  useState } from 'react';
import { db } from '../config/firebase';
import { collection,  getDocs } from 'firebase/firestore';

interface IData {
  sample: string;
  complexity: number;
}

export default function MyComponent() {
  const [data, setData] = useState<IData | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//         // const citiesCol = collection(db, 'text');
//         // const citySnapshot = await getDocs(citiesCol);
//         // const cityList = citySnapshot.docs.map(doc => doc.data());
//         // console.log("data: ", cityList);

//     fetchData();
//   }, []);

// Get a list of cities from your database
async function getCities() {
    const citiesCol = collection(db, 'text');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    setData(cityList[0] as unknown as IData);
}
  
  return (
    <div>
      {data ? (
        <div>
          <p>Sample: {data.sample}</p>
          <p>Complexity: {data.complexity}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    <button type="button" onClick={getCities}>点击链接数据库</button>
    </div>
  );
}
