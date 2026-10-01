import React, { memo, useRef } from 'react'

const MemoCount = () => {

    const renderCount = useRef(0);
    console.log(renderCount)

  return (
    <div>
      <p>
        Nothing changed here but i have rendered:
        <span>{renderCount.current++} time(s)</span>
      </p>
    </div>
  )
}

export default memo(MemoCount);

// OR

// export const MemoCount = memo(() => {

//     const renderCount = useRef(0);
//     console.log(renderCount)

//   return (
//     <div>
//       <p>
//         Nothing changed here but i have rendered:
//         <span>{renderCount.current++} time(s)</span>
//       </p>
//     </div>
//   )
// })

