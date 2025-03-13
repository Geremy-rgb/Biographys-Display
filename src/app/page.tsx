"use client"

import { useState } from "react";


type Biography = {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  bio: string;
  imageUrl: string;
};

export default function BiographyApp() {

  const [biographies, setBiographies] = useState<Biography[]>([]);

  const [selectedBio, setSelectedBio] = useState<Biography | null>(null);

  const [newBio, setNewBio] = useState<Omit<Biography, "id">>({

    firstName: "",
    lastName: "",
    age: "",
    bio: "",
    imageUrl: "",

  });

  const addBiography = () => {

    if (!newBio.firstName || !newBio.lastName || !newBio.imageUrl) return;

    setBiographies([...biographies, { id: Date.now(), ...newBio }]);

    setNewBio({ 
      firstName: "",
      lastName: "",
       age: "", bio: "",
        imageUrl: "" });
  };

  return (

    <div className="p-6">

      {selectedBio ? (

        <div>
          
          <button onClick={() => setSelectedBio(null)} className="mb-4 p-2 bg-black rounded">
            Regresar
          </button>

          <h2 className="text-xl font-bold">
            {selectedBio.firstName} {selectedBio.lastName}
          </h2>

          <p className="text-black">
            Edad: {selectedBio.age}
          </p>

          <img src={selectedBio.imageUrl} alt={selectedBio.firstName} className="w-48 h-48 object-cover rounded" />

          <p className="mt-2">{selectedBio.bio}</p>

        </div>

      ) : (

        <div>
          <h1 className="text-2xl font-bold">Biografías</h1>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {biographies.map((bio) => (
              <div key={bio.id} className="border p-2 cursor-pointer" onClick={() => setSelectedBio(bio)}>
                <img src={bio.imageUrl} alt={bio.firstName} className="w-32 h-32 object-cover rounded" />
                <p>{bio.firstName} {bio.lastName}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Agregar Biografía</h2>
            <input type="text" placeholder="Nombre" value={newBio.firstName} onChange={(e) => setNewBio({ ...newBio, firstName: e.target.value })} className="block border p-2 mt-2" />
            <input type="text" placeholder="Apellido" value={newBio.lastName} onChange={(e) => setNewBio({ ...newBio, lastName: e.target.value })} className="block border p-2 mt-2" />
            <input type="number" placeholder="Edad" value={newBio.age} onChange={(e) => setNewBio({ ...newBio, age: String(e.target.value) })} className="block border p-2 mt-2" />
            <textarea placeholder="Biografía" value={newBio.bio} onChange={(e) => setNewBio({ ...newBio, bio: e.target.value })} className="block border p-2 mt-2"></textarea>
            <input type="text" placeholder="Imagen URL" value={newBio.imageUrl} onChange={(e) => setNewBio({ ...newBio, imageUrl: e.target.value })} className="block border p-2 mt-2" />
            <button onClick={addBiography} className="mt-4 p-2 bg-blue-500 text-black rounded">Agregar</button>
          </div>
        </div>
      )}
    </div>
  );
}
