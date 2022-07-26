import React from "react"

export default function Die(props) {
    return (
        <div className="die--square">
            <p className="die--number">{props.value}</p>
        </div>
    )
}