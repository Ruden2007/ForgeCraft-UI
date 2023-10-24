import BaseComponent from "./BaseComponent.js";

/**
 * Класс SelectList представляет собой список с возможностью выбора элемента.
 * @extends BaseComponent
 */
class SelectList extends BaseComponent {
    element
    activeItem = null

    /**
     * Объект, содержащий элементы списка с ключами в виде атрибутов 'data-name'.
     * @type {Object}
     */
    listItems = {}

    /**
     * Создает новый объект SelectList.
     * @param {HTMLElement} element - Элемент DOM, представляющий выпадающий список.
     * @param {object} options - Дополнительные настройки для создания объекта SelectList.
     * @param {boolean} options.isRequired - Определяет, должен ли быть выбран хотя бы один элемент (по умолчанию true).
     */
    constructor(element, {isRequired = true} = {}) {
        super(element)

        this.element = element
        this.isRequired = isRequired

        this.addClass('select-list')

        this.bindEvents()
        this.addSelectListItemClass()
        this.initializeActiveItem()
    }

    /**
     * Добавляет класс 'select-list__item' ко всем дочерним элементам элемента SelectList
     * и формирует объект listItems с ключами в виде атрибутов 'data-name'.
     */
    addSelectListItemClass() {
        this.listItems = {}

        const childElements = this.element.children
        for (let i = 0; i < childElements.length; i++) {
            const elem = childElements[i]
            elem.classList.add('select-list__item')

            const itemName = elem.getAttribute('data-name')
            if (itemName) {
                this.listItems[itemName] = elem
            }
        }
    }

    /**
     * Инициализирует активный элемент SelectList. Если уже есть элемент с классом 'select-list__item.active',
     * устанавливает его как активный. В противном случае, если isRequired установлен в true, устанавливает
     * первый элемент списка как активный и добавляет ему класс 'active'.
     */
    initializeActiveItem() {
        /**
         * @type {HTMLElement}
         */
        const activeItem = this.element.querySelector('.select-list__item.active')
        if (activeItem) {
            this.activeItem = activeItem
        } else if (this.isRequired) {
            const firstItem = this.element.querySelector('.select-list__item')
            if (firstItem) {
                firstItem.classList.add('active')
                this.activeItem = firstItem
            }
        }

        const event = new Event('listUpdate', {bubbles: true})
        this.dispatchEvent(event)
    }

    /**
     * Привязывает события к элементу SelectList для обработки выбора элемента.
     */
    bindEvents() {
        this.element.addEventListener('click', e => {
            const selectedItem = e.target.closest('.select-list__item')
            if (selectedItem) {
                if (selectedItem !== this.activeItem) {
                    if (this.activeItem) {
                        this.activeItem.classList.remove('active')
                    }
                    selectedItem.classList.add('active')
                    this.activeItem = selectedItem
                } else if (selectedItem === this.activeItem) {
                    if (!this.isRequired) {
                        selectedItem.classList.remove('active')
                        this.activeItem = null
                    }
                }

                const event = new Event('change', {bubbles: true})
                this.dispatchEvent(event)
            }
        })

        const callback = (mutationList) => {
            for (const mutation of mutationList) {
                if (mutation.type !== "childList") return false
                this.addSelectListItemClass()
                this.initializeActiveItem()
            }
        }

        const observer = new MutationObserver(callback)

        observer.observe(this.element, {childList: true})
    }
}

export default SelectList
