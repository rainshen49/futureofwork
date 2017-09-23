export interface project {
    "title": string,
    "children"?: Project[],
    "authors": string[]
    "note"?: string,
    "completed": boolean
}
// use component nesting to get a graph

class Project extends Object implements project {
    completed = false
    title: string
    authors: string[]
    children: Project[]
    note: string
    constructor(title, author) {
        super();
        this.title = title
        this.authors = [author]
    }
    complete() {
        this.completed = true
    }
    cancel() {
        this.completed = false
    }
    setitle(newTitle) {
        this.title = newTitle
    }
    addChildren(...children: Project[]) {
        this.children.push(...children)
    }
    removeChild(child: Project) {
        this.children.splice(this.children.indexOf(child))
    }
    addAuthor(author) {
        this.authors.push(author)
    }
    setNote(newNote) {
        this.note = newNote
    }
}