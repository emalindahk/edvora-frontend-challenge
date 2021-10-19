import React, { useState } from 'react'
import Image from 'next/image'

import SearchIcon from '@mui/icons-material/Search';


function Header() {
    const [searchInput, setSearchInput] = useState('')

    return (
        <header>
        <div className="grid grid-cols-3 sticky text-black py-2 px-4 top-0 z-50 bg-white shadow-md md:px-10">
            <div className="relative h-14 w-16 cursor-pointer">
                <Image src="/pokemons.svg" layout="fill"/>
            </div>

            <div className="flex items-center md:border-2 rounded-lg md:shadow-sm">
                <input 
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                type="text" 
                placeholder="Start your search" 
                className="flex-grow pl-5 bg-transparent outline-none
                 text-sm text-gray-500 placeholder-gray-400"/>
                <SearchIcon className="hidden md:inline-flex h-8 text-gray-500 rounded-full 
                cursor-pointer md:mx-2"/>
            </div>


            <div className="flex flex-row space-x-4 items-center text-sm justify-end text-gray-600">
            </div>
            
        </div>
        </header>
    )
}

export default Header

