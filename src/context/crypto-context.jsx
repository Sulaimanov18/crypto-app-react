import { createContext, useState, useEffect, useContext } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api.js';
import { perecntDifference } from '../utils.js';

const CryptoContext = createContext({
  setAssets: () => {},
  assets: [],
  crypto: [],
  loading: false,
});


export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false); // Changed default loading to true
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  

  function mapAssets(assets, result) {
    console.log(assets, result);
    
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {  
        grow: asset.price < coin.price, // boolean
        growPercent: perecntDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }
  
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false); //idndicate that loading is done
      // 
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, setAssets }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}