import * as React from 'react'
import { PureComponent } from 'react'
import { store } from './Dataflow';
// renders a nice block of the author's initials
export function Tag({ tag }: { tag: string }) {
    const mytags: any | string[] = store.getState().currentAuthor.tags
    return <span className={"tag" + (mytags.includes(tag) ?" hot":"")}>{tag}</span>
}