import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

// Define the shape of our asset data
interface Asset {
  id: string;
  name: string;
  description: string | null;
  status: string;
  serialNumber: string;
}

export default function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // Our Axios interceptor automatically attaches the JWT token here!
        const response = await api.get('/assets');
        setAssets(response.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          // If the token is expired or missing, kick them back to login
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to load assets.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Protected Assets Dashboard</h2>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading your equipment...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {assets.length === 0 && !loading ? (
          <p>No assets found for your organization.</p>
        ) : (
          assets.map((asset) => (
            <div key={asset.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{asset.name}</h3>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}><strong>SN:</strong> {asset.serialNumber}</p>
              <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>{asset.description}</p>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: asset.status === 'OPERATIONAL' ? '#d4edda' : '#fff3cd', 
                color: asset.status === 'OPERATIONAL' ? '#155724' : '#856404', 
                borderRadius: '4px', 
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {asset.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}