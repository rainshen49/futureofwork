import * as React from 'react'
import { PureComponent } from 'react'
// renders a nice block of the author's initials
export function Tag({ tag }: { tag: string }) {
    return <span className="tag">{tag}</span>
}