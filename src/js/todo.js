export class Todo {
        constructor(title, creationDate = new Date(), isCompleted = false, id) {
    
            this.title = title;
            this.isCompleted = isCompleted;
            this.creationDate = creationDate;
            this.id = id
    
        }
    
        compareByTitle(todo) {
    
            return this.title.localeCompare(todo.title)
        }
        compareByDate(todo) {
            
    
            return todo.creationDate.getTime() - this.creationDate.getTime()
        }
        compareByChecked(todo) {
            
            return todo.isCompleted - this.isCompleted
        }
}


