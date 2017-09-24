import * as React from 'react'
import { PureComponent } from 'react'

export function Editable({ save, children }) {
    function input(ev) {
        // enter to submit, otherwise just do nothing
        const newname = ev.target.textContent.replace(/\n/g, "")
        if (ev.key === "Enter") {
            ev.preventDefault()
            ev.stopPropagation()
            save(newname)
            console.log(newname,"saved")
        }
    }
    return <p onKeyDown={input}>{children}</p>
}