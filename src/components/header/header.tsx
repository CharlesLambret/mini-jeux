

export default function Header (){
    return(
        <div className="w-full bg-gray-900  p-5 fixed top-0 text-white flex flex-row justify-between items-center">
            <img src="/logo.png" alt="Logo" className="w-12 h-12"/>
            <h1 className="text-2xl font-bold">Jeu de mémoire</h1>
        </div>
    )
}