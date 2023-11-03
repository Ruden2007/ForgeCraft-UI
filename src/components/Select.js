import BaseComponent from "./BaseComponent.js"

class SelectList extends BaseComponent {
    activeItem = null
    isRequired

    constructor(element, {isRequired = true} = {}) {
        super(element)

        this.element = element
        this.isRequired = isRequired

        this.createSelect()


        this.bindEvents()
        this.initializeActiveItem()
    }

    /**
     * Получает текущее значение выбранного элемента выпадающего списка.
     * @returns {string} - Значение выбранного элемента.
     */
    get value() {
        return this.element.value
    }

    /**
     * Устанавливает новое значение выбранного элемента выпадающего списка.
     * @param {string} newValue - Новое значение для установки.
     */
    set value(newValue) {
        const selectedOption = this.selectContainer.querySelector(`[data-value="${newValue}"]`)
        if (selectedOption && selectedOption.dataset.disabled !== 'true') {
            this.selectedItem = selectedOption

            const event = new Event('change', { bubbles: true })
            this.dispatchEvent(event)
        }
    }

    /**
     * Устанавливает выбранный элемент списка.
     * @param {HTMLElement} selectedItem - Выбранный элемент.
     */
    set selectedItem(selectedItem) {
        if (selectedItem !== this.activeItem) {
            if (this.activeItem) {
                this.activeItem.classList.remove('active')
            }
            selectedItem.classList.add('active')
            this.activeItem = selectedItem
            this.element.value = selectedItem.dataset.value
        } else if (selectedItem === this.activeItem) {
            if (!this.isRequired) {
                selectedItem.classList.remove('active')
                this.activeItem = null
                this.element.value = null
            }
        }

        const event = new Event('change', {bubbles: true})
        this.dispatchEvent(event)
    }

    /**
     * Получает выбранный элемент списка.
     * @returns {HTMLElement|null} - Выбранный элемент.
     */
    get selectedItem() {
        return this.activeItem
    }

    createSelect() {
        this.element.style.display = 'none'

        this.selectContainer = document.createElement('div')
        this.selectContainer.classList.add('select-list')


        this.element.insertAdjacentElement('afterend', this.selectContainer)

        const options = this.element.querySelectorAll('option')
        options.forEach(option => {
            const listItem = document.createElement('div')
            listItem.classList.add('select-list__item')
            listItem.textContent = option.textContent
            listItem.dataset.value = option.value
            if (option.disabled) listItem.dataset.disabled = 'true'
            this.selectContainer.appendChild(listItem)
        })
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
        const activeItem = this.selectContainer.querySelector('.select-list__item.active')
        if (activeItem) {
            this.activeItem = activeItem
        } else if (this.isRequired) {
            const firstItem = this.selectContainer.querySelector('.select-list__item')
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
        this.selectContainer.addEventListener('click', e => {
            const selectedItem = e.target.closest('.select-list__item')
            if (selectedItem) {
                this.selectedItem = selectedItem
                this.element.value = selectedItem.dataset.value
            }
        })
    }

}

export default SelectList 
