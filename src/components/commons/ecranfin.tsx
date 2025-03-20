

interface EcranDebutProps {
    onClic: () => void
    contenu: string
}
export default function EcranFin ({onClic, contenu}: EcranDebutProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Félicitations !</h1>
        <p className="text-xl mb-4">{contenu}</p>
        <button
          onClick={onClic}
          className="px-4  cursor-pointer  py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Recommencer
        </button>
      </div>
    )
}