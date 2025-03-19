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

  const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAACUCAMAAAANv/M2AAAAMFBMVEXk5ueutLff4uOorrLn6eqrsbXq7O25vsHGy82xt7q+w8XX2tvS1dfKztDc3+C0ur2k4UqjAAAER0lEQVR4nO2c25KkIAxABQLI1f//20W7p7fvzSUSrPK87Oy8zKlUCKCJ03RycnJycnJycnJycnJyIABAAVBbZJNMeXQhzPMcvON8+83QwBT9rI0QckMIsdjg+cgxh8nbhUnJ7knu2vpRww0qGPYofBNnxqshtb18b3xBsPGiDV5/U960tRvKGqb5Q2I8JkmgFr0D+M8wX7U1teoNcBlhvloLTm17xeUqb/ghEtuXKLNU/OitodA5QV5EoCw3NkQkduai2DllSKSNdWate8JSKsNc5cwk4S5TsQj/rAkTZKkLdJJeqKQh1Dona6pqDfXOjC1EzrbBmbFAEurY5Mw0xRZTW+7+kJ5AOvcM/VGaYIcB3+ZMcwRpzI4U6rn7UuSm0Tmdm1Rv6VhzvHuk+9WrtXasyN6lWlUfO+6wnfNDtWdH2so7R7rqxvKM6Vz0HIZ05ytuy6n0jr7nU4ziwXqf9GDGcO68JyqNIm2PKH1Gupf0ISPdV/qQ1eOYdbr5srXS+/k6ytnD9H68jiLd+epyyPM0Ss3rfXOZEFai6P7kFOM23lk5sTRLL92fexzyCRO41kBLitfkB3xqmu62jZGmeD498bZAa5ImisbHCDTvXCZocabqsQFfv8EIuv6J6gIidf+N5Up9rTZUylN92SN5HfcfW5UgM6nzBFWdNbTOdVsMdeNVuuIWvpuTC3EH00ppCel+BX9P2SVmgDhvcJNdQ8wwnfbAcysfca17wuf0TxvaPeWFFOwfmS0FaQvhe1TUX6ItmY5kZ6QvAHhr3g4zSGmsG2YFPgGTC1qIpzkXIW1ww01e3JHUYoq3uI4UpX+Z9QeYhErZrdTk/ErkasyZnBdgI5mry09jW6/TfFOMzodtRm4dkwvBOxf5OuY3nnsK7DYftxhj2MOxL/0n/U6va3GgVFnnD12wQjyXjee9RQg9r4uSfFX+zR9mHj1S+Vtm7yjnEwFieJ0//CkuTYo4TbhBTWH5NH/405uZOfbO8PTnXNr6aoRv4oLNvGO817RYctP4mzebU3p3cnY2/6byS1t3yW7FbV0if9be/8hqEfLiEWHcnsIQc6ZSy5F2t8cKAAGjK/atNbP7rEiYUFqAPmkvu6R2KNz5ShHowf592W5HMtwFCX6vbH4E81lO/QhfIYhz5bB/atyskYYbeqTzPSglu3XcqRSUvrfOzgnXXLF32be/0/o2t3duXGmzrntN2EzLuQ+pDbbGut65ocugkeoRbUBovatG1Paw9DlvfKKqXNMl9IWaHqf2vrtGRM2Rj6ja3VFc93D655uQxb2oilqZlW/nSKN7jZjCAtI+YI1BUdlr7iPFobCHlr50bJQ0tEBpi89eyJJaPcQyXCn53sog2VH0ZQo+inPBlwcIz9EvZH+ZQg2THSk/ciOtBqkdK9lJjTJMhkT2qBTKxxmQyJ7gwfk4AxKZk3QQxEDknvR45OPwbiH+A/AaPEb6e3AlAAAAAElFTkSuQmCC"

  const [errors, setErrors] = useState <{ [key: string]: string }> ({})

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

    const newErrors: { [key: string]: string} = {}
    

    if (!newBio.firstName)
      newErrors.firsName = "El nombre es requerido";

    if (!newBio.lastName)
      newErrors.lastName= "El apellido es requerido"

    setErrors(newErrors);
    if(Object.keys(newErrors).length > 0 ) 

      return;

    setBiographies([...biographies, { id: Date.now(), ...newBio, imageUrl: newBio.imageUrl || defaultImage }]);

    setNewBio({ 
      firstName: "",
      lastName: "",
       age: "", bio: "",
        imageUrl: "" });

        setErrors({});
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

          <img src={selectedBio.imageUrl || defaultImage} alt={selectedBio.firstName} className="w-48 h-48 object-cover rounded" />

          <p className="mt-2">{selectedBio.bio}</p>

        </div>

      ) : (

        <div>
          <h1 className="text-2xl font-bold">Biografías</h1>

          <div className="grid grid-cols-3 gap-4 mt-4">
            
            {biographies.map((bio) => (
              <div key={bio.id} className="border p-2 cursor-pointer" onClick={() => setSelectedBio(bio)}>
                <img src={bio.imageUrl || defaultImage} alt={bio.firstName} className="w-32 h-32 object-cover rounded" />
                <p>{bio.firstName} {bio.lastName}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Agregar Biografía</h2>
            <input type="text" placeholder="Nombre" value={newBio.firstName} onChange={(e) => setNewBio({ ...newBio, firstName: e.target.value })} className="block border p-2 mt-2" />
            {errors.firsName && <p className="text-red-500"> {errors.firsName}</p>}
            <input type="text" placeholder="Apellido" value={newBio.lastName} onChange={(e) => setNewBio({ ...newBio, lastName: e.target.value })} className="block border p-2 mt-2" />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
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
