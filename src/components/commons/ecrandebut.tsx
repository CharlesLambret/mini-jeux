

interface EcranDebutProps {
    onClic: () => void
    titre: string
    texte: string
}
export default function EcranDebut ({onClic, titre, texte}: EcranDebutProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white  ">
            <h1 className="text-3xl font-bold mb-4">{titre}</h1>
            <p>{texte}</p>
            <button           
                className="px-4 py-2 cursor-pointer bg-blue-500 my-5 text-white rounded-lg shadow-md hover:bg-blue-600"
                onClick={onClic}
            >
                Commencer
            </button>
        </div>
    )
}