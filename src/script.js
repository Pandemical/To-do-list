class Todo {
    selectors = {
        header: '[data-js-todo]',
        newTaskSearchForm: '[data-js-todo-search-task-form]',
        newTaskSearchInput: '[data-js-todo-search-task-input]',
        buttonChangeTheme: '[data-js-todo-change-theme]',
        buttonFillter: '[data-js-todo-filter]',
        main: '[data-js-total-tasks]',
        list: '[data-js-total-tasks-list]',
        item: '[data-js-list-item]',
        itemChecbox: '[data-js-list-item-checkbox]',
        itemLabel: '[data-js-list-item-label]',
        itemEditButton: '[data-js-list-item-edit-button]',
        itemDeleteButton: '[data-js-list-item-delete-button]',
        emptyMessage: '[data-js-total-tasks-empty-message]',
        addTaskButton: '[data-js-add-task-button]',
    }

    stateClasses = {
        isVisible: 'is-visible',
        isDissapearing: 'is-dissapearing',
    }

    localeStorageKey = 'todo-items'

    constructor() {
        this.headerElement = document.querySelector(this.selectors.header)
        this.mainElement = document.querySelector(this.selectors.main)

        this.newTaskSearchFormElement = this.headerElement.querySelector(this.selectors.newTaskSearchForm)
        this.newTaskSearchInputElement = this.headerElement.querySelector(this.selectors.newTaskSearchInput)
        this.buttonChangeThemeElement = this.headerElement.querySelector(this.selectors.buttonChangeTheme)
        this.buttonFillterFormElement = this.headerElement.querySelector(this.selectors.buttonFillter)
        this.listElement = this.mainElement.querySelector(this.selectors.list)
        this.itemElement = this.mainElement.querySelector(this.selectors.item)
        this.itemEditButtonElement = this.mainElement.querySelector(this.selectors.itemEditButton)
        this.itemEditButtonElement = this.mainElement.querySelector(this.selectors.itemEditButton)
        this.itemDeleteButtonElement = this.mainElement.querySelector(this.selectors.itemDeleteButton)
        this.itemEditButtonElement = this.mainElement.querySelector(this.selectors.itemEditButton)
        this.emptyMessageElement = this.mainElement.querySelector(this.selectors.emptyMessage)
        this.addTaskButtonElement = this.mainElement.querySelector(this.selectors.addTaskButton)

        this.state = {
            items: this.getItemsFromLocalStorage(),
            fillteredItems: null,
            searchQuery: '',
        }
    }

    getItemsFromLocalStorage() {
        const rawData = localStorage.getItem(this.localeStorageKey)

        if (!rawData) {
            return []
        }

        try {
            const parseData = JSON.parse(rawData);
            return Array.isArray(parseData) ? parseData : []
        } catch {
            console.error('To do items parse error!')
            return []
        }
    }

    saveItmesLocalStorage() {
        localStorage.setItem(
            this.localeStorageKey,
            JSON.stringify(this.state.items)
        )
    }

    render() {
        this.listElement.textContent = this.state.items.length

        const items = this.state.items ?? this.state.items

        this.listElement.innerHTML = items.length.map(({ id, tiitle, isChecked }) => `
                            <li class="total-tasks__item list-item" data-js-list-item>
                    <input type="checkbox" class="list-item__checkbox" data-js-list-item-checkbox id="item-1"
                        placeholder=" ">
                    <label for="item-1" class="list-item__label" data-js-list-item-label>Todo 1</label>
                    <button class="list-item__edit-button" data-js-list-item-edit-button type="button"><svg width="14" height="14" viewBox="0 0 14 14"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.17272 3.49106L0.5 10.1637V13.5H3.83636L10.5091 6.82736M7.17272 3.49106L9.5654 1.09837L9.5669 1.09695C9.8962 0.767585 10.0612 0.602613 10.2514 0.540824C10.4189 0.486392 10.5993 0.486392 10.7669 0.540824C10.9569 0.602571 11.1217 0.767352 11.4506 1.09625L12.9018 2.54738C13.2321 2.87769 13.3973 3.04292 13.4592 3.23337C13.5136 3.40088 13.5136 3.58133 13.4592 3.74885C13.3974 3.93916 13.2324 4.10414 12.9025 4.43398L12.9018 4.43468L10.5091 6.82736M7.17272 3.49106L10.5091 6.82736"
                                stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button class="list-item__delete-button" data-js-list-item-delete-button type="button" aria-label="Delete"
                        title="Delete"><svg width="13" height="16" viewBox="0 0 13 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.999137 6.61505C0.932117 5.74386 1.62095 5 2.49471 5H9.75505C10.6289 5 11.3177 5.74385 11.2507 6.61505L10.7314 13.365C10.6713 14.1465 10.0196 14.75 9.23582 14.75H3.01394C2.23014 14.75 1.57848 14.1465 1.51836 13.365L0.999137 6.61505Z"
                                stroke="#CDCDCD" />
                            <path d="M11.75 2.75H0.5" stroke="#CDCDCD" stroke-linecap="round" />
                            <path
                                d="M4.625 1.25C4.625 0.83579 4.96077 0.5 5.375 0.5H6.875C7.28922 0.5 7.625 0.83579 7.625 1.25V2.75H4.625V1.25Z"
                                stroke="#CDCDCD" />
                            <path d="M7.625 8V11.75" stroke="#CDCDCD" stroke-linecap="round" />
                            <path d="M4.625 8V11.75" stroke="#CDCDCD" stroke-linecap="round" />
                        </svg>
                    </button>
                </li>
        `)
    }
}

new Todo()