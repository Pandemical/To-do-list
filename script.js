class Todo {
    selectors = {
        header: '[data-js-todo]',
        taskSearchForm: '[data-js-todo-search-task-form]',
        taskSearchInput: '[data-js-todo-search-task-input]',
        buttonChangeTheme: '[data-js-todo-change-theme]',
        selectFilter: '[data-js-todo-filter]',
        main: '[data-js-total-tasks]',
        list: '[data-js-total-tasks-list]',
        item: '[data-js-list-item]',
        itemChecbox: '[data-js-list-item-checkbox]',
        itemLabel: '[data-js-list-item-label]',
        itemEditButton: '[data-js-list-item-edit-button]',
        itemDeleteButton: '[data-js-list-item-delete-button]',
        emptyMessage: '[data-js-total-tasks-empty-message]',
        openModalButton: '[data-js-add-task-button]',
        modal: '[data-js-add-task-modal]',
        modalContent: '[data-js-add-task-modal-content]',
        modalForm: '[data-js-add-task-form]',
        closeModalButton: '[data-js-add-task-cancel]',
        newTaskInput: '[data-js-add-task-input]',
        addTaskButton: '[data-js-add-task-confirm]',
    }

    stateClasses = {
        isVisible: 'is-visible',
    }

    localeStorageKey = 'todo-items'

    constructor() {
        this.headerElement = document.querySelector(this.selectors.header)
        this.mainElement = document.querySelector(this.selectors.main)
        this.modalElement = document.querySelector(this.selectors.modal)

        this.taskSearchFormElement = this.headerElement.querySelector(this.selectors.taskSearchForm)
        this.taskSearchInputElement = this.headerElement.querySelector(this.selectors.taskSearchInput)
        this.buttonChangeThemeElement = this.headerElement.querySelector(this.selectors.buttonChangeTheme)
        this.selectFilterElement = this.headerElement.querySelector(this.selectors.selectFilter)

        this.listElement = this.mainElement.querySelector(this.selectors.list)
        this.itemElement = this.mainElement.querySelector(this.selectors.item)
        this.emptyMessageElement = this.mainElement.querySelector(this.selectors.emptyMessage)
        this.openModalButtonElement = this.mainElement.querySelector(this.selectors.openModalButton)

        this.closeModalButtonElement = this.modalElement.querySelector(this.selectors.closeModalButton)
        this.addTaskButtonElement = this.modalElement.querySelector(this.selectors.addTaskButton)
        this.newTaskInputElement = this.modalElement.querySelector(this.selectors.newTaskInput)
        this.modalContentElement = this.modalElement.querySelector(this.selectors.modalContent)
        this.modalFormElement = this.modalElement.querySelector(this.selectors.modalForm)

        this.state = {
            items: this.getItemsFromLocalStorage(),
            fillteredItems: null,
            searchQuery: '',
        }

        this.render()
        this.loadtheme()
        this.bindEvents()
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

        const itemsToRender = this.state.fillteredItems ?? this.state.items
        this.listElement.innerHTML = itemsToRender.map(({ id, title, isChecked }) => `
                <li class="total-tasks__item list-item" data-js-list-item>
                    <input type="checkbox" id="${id}"  ${isChecked ? 'checked' : ''} class="list-item__checkbox" data-js-list-item-checkbox placeholder=" ">
                    <label for="${id}" class="list-item__label" data-js-list-item-label>${title}</label>
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
        `).join('')

        const emptyMessage = this.emptyMessageElement
        if (itemsToRender.length === 0) {
            emptyMessage.classList.add(this.stateClasses.isVisible)
        } else {
            emptyMessage.classList.remove(this.stateClasses.isVisible)
        }

        this.changeColorSvg()
    }

    addItem(title) {
        this.state.items.push({
            id: crypto?.randomUUID() ?? Date.now().toString(),
            title: title,
            isChecked: false,
        })
        this.saveItmesLocalStorage()
        this.render()
    }

    deleteItem(id) {
        this.state.items = this.state.items.filter((item) => {
            return item.id !== id
        })
        this.saveItmesLocalStorage()
        this.render()
    }

    toogleCheckedState(id) {
        this.state.items = this.state.items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    isChecked: !item.isChecked,
                }
            }
            return item
        })
        this.saveItmesLocalStorage()
        this.render()
    }

    filter() {
        const queryFormatted = this.state.searchQuery.toLocaleLowerCase()
        this.state.fillteredItems = this.state.items.filter(({ title }) => {
            const titleFormatted = title.toLowerCase()

            return titleFormatted.includes(queryFormatted)
        })
        this.render()
    }

    resetFilter() {
        this.state.fillteredItems = null
        this.state.searchQuery = ''
        this.render()
    }

    onSearchTaskFormSubmit = (event) => {
        event.preventDefault()
    }

    onSearchTaskInputChange = ({ target }) => {
        const value = target.value.trim()

        if (value.length > 0) {
            this.state.searchQuery = value
            this.filter()
        } else {
            this.resetFilter()
        }
    }

    onClick = ({ target }) => {
        if (target.matches(this.selectors.itemDeleteButton) || (target.closest(this.selectors.itemDeleteButton))) {
            const itemElement = target.closest(this.selectors.item)
            const itemChecboxElement = itemElement.querySelector(this.selectors.itemChecbox)
            this.deleteItem(itemChecboxElement.id)
        }
    }

    onChange = ({ target }) => {
        if (target.matches(this.selectors.itemChecbox)) {
            this.toogleCheckedState(target.id)
        }
    }

    onOpenModal = () => {
        this.modalElement.classList.add('modal--open')
        const input = this.modalElement.querySelector(this.selectors.newTaskInput)
        input.focus()
    }

    onCloseModal = () => {
        this.modalElement.classList.remove('modal--open')
    }

    onAddTask = (event) => {
        event.preventDefault()
        const value = this.newTaskInputElement.value.trim()
        this.addItem(value)
        this.onCloseModal()
        this.newTaskInputElement.value = ''
    }

    onSelectFilter = (event) => {
        const filtertOption = event.target.value
        this.applyFilter(filtertOption)
    }

    applyFilter(filtertOption) {
        switch (filtertOption) {
            case 'complited':
                this.state.fillteredItems = this.state.items.filter((item) => item.isChecked)
                break;
            case 'incomplited':
                this.state.fillteredItems = this.state.items.filter((item) => !item.isChecked)
                break;
            default:
                this.state.fillteredItems = null
                break;
        }
        this.render()
    }

    onChangeTheme = () => {
        const elements = [
            document.body,
            this.modalContentElement,
            this.taskSearchInputElement,
            this.newTaskInputElement,
        ]
        elements.forEach(element => {
            element?.classList.toggle('is-dark-theme')
        })

        if (document.body.classList.contains('is-dark-theme')) {
            localStorage.setItem('theme', 'dark')
        } else {
            localStorage.setItem('theme', 'light')
        }

        this.changeColorSvg()
    }

    changeColorSvg = () => {
        const savedTheme = localStorage.getItem('theme')
        const itemEditButtons = this.mainElement.querySelectorAll(this.selectors.itemEditButton)
        const itemDeleteButtons = this.mainElement.querySelectorAll(this.selectors.itemDeleteButton)

        const allEditSvgs = Array.from(itemEditButtons).map(button => button.querySelector('svg'))
        const allDeleteSvgs = Array.from(itemDeleteButtons).map(button => button.querySelector('svg'))
        const elements = [
            ...allEditSvgs,
            ...allDeleteSvgs,
        ]
        
        elements.forEach(element => {
        if (savedTheme === 'dark') { 
            element?.classList.add('is-dark-theme')
        } else {
            element?.classList.remove('is-dark-theme')
        } })
    }

    loadtheme() {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            this.onChangeTheme()
        }
    }

    bindEvents() {
        this.taskSearchFormElement.addEventListener('submit', this.onSearchTaskFormSubmit)
        this.taskSearchInputElement.addEventListener('input', this.onSearchTaskInputChange)
        this.listElement.addEventListener('click', this.onClick)
        this.listElement.addEventListener('change', this.onChange)
        this.openModalButtonElement.addEventListener('click', this.onOpenModal)
        this.closeModalButtonElement.addEventListener('click', this.onCloseModal)
        this.modalFormElement.addEventListener('submit', this.onAddTask)
        this.selectFilterElement.addEventListener('change', this.onSelectFilter)
        this.buttonChangeThemeElement.addEventListener('click', this.onChangeTheme)
    }
}

new Todo()