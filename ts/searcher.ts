import { task } from './graph';

export interface Query {
    key: string,
    matcher: RegExp
}

export function searchTop(KB: task[], query: Query) {
    // put together a list of relevant projects
    return KB.filter(proj => searchOne(proj, query))
}

function searchOne(task: task, query) {
    // find in one project and all its children if it exist
    const { key, matcher } = query
    if (task[key].match(matcher)) {
        return true
    } else {
        return task.children.some(child => searchOne(child, query))
    }
}

export function parse(querystring) {
    try {
        return querystring.split('&')
            .map(qry => qry.split('='))
            .map(q => ({
                key: q[0].trim(),
                matcher: new RegExp(q[1].trim())
            }))
    } catch (e) {
        return []
    }
}