import React from 'react'

export function Button({text, ...props}) {
    return(
        <button {...props}>{text}</button>
    )

}