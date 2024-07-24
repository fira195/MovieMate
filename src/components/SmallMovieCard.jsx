function SmallMovieCard({name,year,imbd, rotten_tomatoes}){

    return (
        <div className="flex gap-4 items-center text-sm bg-yellow-50 p-2 relative mx-20">
            <div className="w-20 h-20 bg-gray-600">
            </div>
            <div className=" gap-4 items-center">
                <h1 className="font-semibold mb-2 text-lg">{name} <span>({year})</span></h1>
                <p>IMBD: {imbd}</p>
                <p>Rotten Tomatoes: {rotten_tomatoes}</p>
            </div>
            <div className="flex gap-4 right-10 absolute">
                <div className="w-8 h-8 bg-red-500"></div>
                <div className="w-8 h-8 bg-gray-500"></div>
                <div className="w-8 h-8 bg-gray-500"></div>
            </div>
        </div>
    )
}
export default SmallMovieCard