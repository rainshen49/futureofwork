import * as React from 'react'
import { PureComponent } from 'react'
import { DetailAuthor } from './Author';
import { store } from './Dataflow';

export default class Opportunity extends PureComponent<any,any>{
    render(){
        return <div>
            <h1>Opportunities</h1>
            <div>
                <h2>Contributors you might be interested in</h2>
                {store.getState().interestingAuthors.map(({name})=><DetailAuthor author={name} key={name}/>)}
                <p>Connect with 10 K Coffee</p>
            </div>
            <div>
                <h2>Projects that relevant to your skills</h2>
                <p>Connect with RBC internal job posting</p>
            </div>
        </div>
    }
}