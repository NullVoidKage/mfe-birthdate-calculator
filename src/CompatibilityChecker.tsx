import React, { useState } from 'react';
import MyRadialProgress from './components/MyRadialProgress';

const CompatibilityChecker: React.FC = () => {
  const [dateOne, setDateOne] = useState('');
  const [dateTwo, setDateTwo] = useState('');
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const [signOne, setSignOne] = useState<string | null>(null);
  const [signTwo, setSignTwo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckCompatibility = async () => {
    try {
      const response = await fetch('http://localhost:3001/compatibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateOne, dateTwo }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setCompatibility(data.compatibility);
      setSignOne(data.signOne);
      setSignTwo(data.signTwo);
      setError(null);
    } catch (error) {
      console.error('Error checking compatibility:', error);
      setError('Please enter a date.');
      setCompatibility(null);
      setSignOne(null);
      setSignTwo(null);
    }
  };

  const compatibilityValue = compatibility !== null ? Math.floor(compatibility) : 0;

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h2 className="text-center text-3xl font-bold mb-4 text-gray-400">Compatibility Checker!</h2>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Date One:</label>
        <input
          type="date"
          value={dateOne}
          onChange={(e) => setDateOne(e.target.value)}
          className="input input-bordered"
        />
        {compatibility !== null && (<div className='text-center text-gray-500 mb-2'> {signOne}</div>)}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 w-full">Date Two:</label>
        <input
          type="date"
          value={dateTwo}
          onChange={(e) => setDateTwo(e.target.value)}
          className="input input-bordered"
          disabled={!dateOne} // Disable if Date One is empty
        />
        {compatibility !== null && (<div className='text-center text-gray-500 mb-2'> {signTwo}</div>)}
      </div>
      <button onClick={handleCheckCompatibility} className="btn btn-primary mb-4">
        Check Compatibility
      </button>
      {compatibility !== null && <MyRadialProgress value={compatibilityValue} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CompatibilityChecker;
