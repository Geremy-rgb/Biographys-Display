"use client"

import { useRouter } from "next/navigation"

export default function BiographyHome () {

  const router = useRouter()

  return (
    <div className="h-screen w-screen flex items-center justify-center">

      <button className="bg-white text-black rounded-2xl px-1.5 py-1.5" onClick={() => {
        router.push("./biographys")
      }}>
        Agregar biografia 
      </button>
     
    </div>
  )
}

