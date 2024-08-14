import { useEffect, useState } from "react";

function Loading() {
  return (
    <div className="border-4 size-10 border-t-accent rounded-[50%] animate-spin m-auto" ></div>
  );
}
function Pagination({currentPage, resultPageNumber, setCurrentPage}){

  const [visible, setVisible]=useState([])
  useEffect(()=>{
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(resultPageNumber, currentPage + 2);

    
    const visible_arr=[]
    for (let i=start;i<=end;i++){
      visible_arr.push(i)
    }
    setVisible(visible_arr)
  },[currentPage, resultPageNumber])
  return(
    <div className="p-2 px-4 flex transform -translate-x-1/2 absolute left-1/2 mx-auto bottom-10 justify-center gap-2">
              {currentPage !=1 &&<button
                onClick={() =>
                  setCurrentPage(1)
                }
                className="bg-main hover:bg-accent hover:text-thrid active:scale-95 border-2 border-black text- p-2 px-3 rounded"
              >
                First
              </button>}
              {visible.map(
                (item) => (
                    <div
                      key={item}
                      onClick={() => setCurrentPage(item)}
                      className={`${
                        currentPage === item && "bg-accent text-thrid"
                      } size-10 hover:bg-accent hover:text-thrid cursor-pointer border-black items-center flex place-content-center`}
                    >
                      {item}
                    </div>
                  )
              )}
              {currentPage!=resultPageNumber&&<button
                onClick={() =>
                  setCurrentPage(resultPageNumber)
                }
                className="bg-main hover:bg-accent hover:text-thrid active:scale-95 border-2 border-black p-2 px-3 rounded"
              >
                Last
              </button>}
            </div>
  )
}
export {Pagination}
export default Loading;
