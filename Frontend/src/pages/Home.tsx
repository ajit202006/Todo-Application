import { Link , useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();
    if (!localStorage.length) {
        return (
            <div className='w-screen bg-emerald-100 h-screen flex items-center justify-center'>
                <div className='md:w-2/3 md:h-6/7 w-screen h-screen bg-green-700 md:rounded-2xl relative overflow-hidden md:animate-scale'>
                    <h1 className='flex items-center justify-center h-1/2 text-white text-[46px] [&_img]:w-[100px] '>
                        <div className='flex items-center overflow-hidden animate-in-view whitespace-nowrap'>
                            <img src='logo-bnw.png' alt='logo' />
                            Task Buddy
                        </div>
                    </h1>
                    <div className='h-1/2 text-white grid place-items-center grid-rows-3 text-[2em] text-bold 
                *:w-1/4 *:py-2.5 *:rounded-full *:bg-green-500 *:hover:bg-green-400 *:active:bg-green-800 *:text-center' >
                        <Link to={'/login'}><button>Login</button></Link>
                        <Link to={'/register'}><button>Register</button></Link>
                    </div>
                </div>
            </div>
        )
    } else {
        useEffect(() => {
            navigate('/todos');
        }, []);
    }

}

export default Home


