import { Sidebar } from 'primereact/sidebar'
import { useState } from 'react'
import Navbar from './Navbar'
import NavbarLogo from './NavbarLogo'

export default function Layout({ children }) {

    const [visible, setVisible] = useState(true)

    return (
        <div className='flex w-full bg-gray-200 h-screen'>
            <Sidebar visible={false} onHide={() => setVisible(false)} closeOnEscape>

            </Sidebar>

            <div className='flex flex-col w-full'>

                {/* Navbar menu */}
                <div className='flex p-5 w-full bg-white '>
                    <NavbarLogo />
                    <Navbar />
                </div>

                {/* Content */}
                <div className='flex w-full'>
                   
                    {/* Side menu */}
                    <div className='flex flex-col w-1/6'>
                        
                    </div>

                    {/* Children */}
                    <div className='flex flex-col w-5/6 m-6 p-3 bg-white rounded-sm'>
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}