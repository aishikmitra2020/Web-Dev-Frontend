const EventPropagation = () => {
    const handleGrandParent = () => {
      console.log("GrandParent clicked");
    };
  
    const handleParentClick = () => {
      console.log("Parent clicked");
    };
  
    const handleChildClick = (event) => {
      console.log(event);

    //   To stop teh event propagation(bubbling) and prevent the unexpected behavior
      event.stopPropagation();

      console.log("Child clicked");
    };
    return (
    //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //     <div onClick={handleGrandParent} className="w-3/4 h-64 bg-blue-400 border-4 border-black flex justify-center items-center">
    //       <div onClick={handleParentClick} className="w-3/4 h-40 bg-green-300 border-4 border-black flex justify-center items-center">
    //         <div onClick={handleChildClick} className="w-1/2 h-16 bg-yellow-300 border-4 border-black flex justify-center items-center">
    //           Child Div
    //         </div>
    //       </div>
    //     </div>
    //   </div>

      // Using Capturing phase
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div onClickCapture={handleGrandParent} className="w-3/4 h-64 bg-blue-400 border-4 border-black flex justify-center items-center">
          <div onClickCapture={handleParentClick} className="w-3/4 h-40 bg-green-300 border-4 border-black flex justify-center items-center">
            <div onClickCapture={handleChildClick} className="w-1/2 h-16 bg-yellow-300 border-4 border-black flex justify-center items-center">
              Child Div
            </div>
          </div>
        </div>
      </div>
    );
};

export default EventPropagation;