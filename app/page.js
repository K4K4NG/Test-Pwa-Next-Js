"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  const addItem = () => {
    const newData = [...data, { id: Date.now(), name }];
    setData(newData);
    setName('');
    if (typeof window !== 'undefined') {
      localStorage.setItem('crudData', JSON.stringify(newData));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('crudData');
      if (savedData) {
        setData(JSON.parse(savedData));
      }

      // Menangani event beforeinstallprompt
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
      });

      // Menangani event online dan offline
      const handleOnline = () => {
        setIsOnline(true);
      };

      const handleOffline = () => {
        setIsOnline(false);
      };

      // Menyimpan status online/offline
      setIsOnline(navigator.onLine);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const removeItem = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('crudData', JSON.stringify(newData));
    }
  };

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Pengguna menerima A2HS');
        } else {
          console.log('Pengguna menolak A2HS');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Contoh Crud Pwa</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Masukkan nama"
        className="border rounded-lg p-2 mb-2 w-full max-w-xs"
      />
      <button 
        onClick={addItem}
        className="bg-blue-500 text-white rounded-lg p-2 mb-4 hover:bg-blue-600 transition"
      >
        Tambah
      </button>
      <ul className="w-full max-w-xs">
        {data.map(item => (
          <li key={item.id} className="flex justify-between items-center border-b py-2">
            {item.name}
            <button 
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
      {/* Tombol untuk menambahkan ke layar beranda */}
      {deferredPrompt && (
        <button 
          onClick={handleAddToHomeScreen}
          className="bg-green-500 text-white rounded-lg p-2 mt-4 hover:bg-green-600 transition"
        >
          Tambahkan ke Layar Beranda
        </button>
      )}

      {/* Menampilkan status online/offline */}
      <div
        className={`fixed top-4 right-4 px-4 py-2 text-white rounded-md transition-opacity duration-500 ${
          isOnline ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {isOnline ? 'Kamu sedang online' : 'Kamu sedang offline'}
      </div>
    </div>
  );
}
