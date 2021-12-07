import uniqid from 'uniqid';
export default class List {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        let newItem = {
            id: uniqid(),
            item //item: item
        };
        this.items.push(newItem);
        return newItem;
    }
}