import uniqid from 'uniqid';
export default class List {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push({
            id: uniqid(),
            //item: item
            item
        });
    }
}