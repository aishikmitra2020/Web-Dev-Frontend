import React, {useState} from 'react'
import { DiApple } from "react-icons/di";
import { IoIosSwitch } from "react-icons/io";
import './ToggleSwitch.css'

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggleSwitch = () => {
    setIsOn(!isOn); // agar false hai to true aur agar true hai to false (toggle karna iska kaam hai)
  }

  const checkIsOn = isOn ? "on" : "off";
  const toggleBgColor = {backgroundColor: isOn ? "#4caf50" : ""}

  return (<>
    <h1>
      <DiApple />
      <IoIosSwitch />
    </h1>
    <div className='toggle-switch' style={toggleBgColor} onClick={handleToggleSwitch}>

      <div className={`switch ${checkIsOn}`}>
        <span className='switch-state'>{checkIsOn}</span>
      </div>

    </div>
    </>
  )
}

export default ToggleSwitch
