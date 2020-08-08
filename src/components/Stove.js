import React, { useState } from 'react'

import StoveList from './StoveList'

import './Stove.css'
// import * as dpa from '../dispatchActionWithBusiness'

function Stove(props) {
    const [showStoveSlots, setShowStoveSlots] = useState(true)

    function toggleOpen() {
        // dpa.setName()
        // dpa.addExp()
        // dpa.updateBagListWithATheme()
        setShowStoveSlots(!showStoveSlots)
    }
    return (
        <>
            <div className="stove_w">
                <span className="stove_icon" onClick={toggleOpen}></span>
                {showStoveSlots && (
                    <div className="stovelist_w">
                        <div className="stovelist_ctrl">
                            <h3>炼卡炉</h3>
                            <span className="stovelist_close_btn" onClick={() => {setShowStoveSlots(false)}}>关闭</span>
                        </div>
                        <StoveList />
                    </div>
                )}
            </div>
        </>
    )
}

Stove.defaultProps = {
}

export default Stove