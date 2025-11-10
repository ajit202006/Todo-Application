const Header = ({ logout = ()=>{}}) => {
    return (
        <header className="bg-green-900 h-10 py-1 flex justify-center items-center text-white md:text-[16px] text-[14px]">
            <img className="h-full" src="../../logo-bnw.png" />
            <h1 className=""><b className="md:text-2xl text-[20px] mx-2">Task Buddy :</b>Know your daily tasks</h1>
            {localStorage.length ?
                [<b className="bg-green-300 text-green-900 text-center pt-1 absolute left-2 w-8 h-8 rounded-full"
                    key="userName"
                    title={localStorage.getItem("userName")||''}>
                    {localStorage.getItem("userName")?.slice(0,1)||'!'}
                </b>,
                <b className="bg-green-300 text-green-900 text-center p-1 absolute right-2 w-auto h-8 rounded-full"
                    key="logout"
                    title="Logout"
                    onClick={logout}>
                    Logout
                </b>]
                : ""}
        </header>
    )
}

export default Header;
