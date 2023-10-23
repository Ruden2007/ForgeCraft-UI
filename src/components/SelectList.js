/**
 * Класс SelectList представляет собой список с возможностью выбора элемента.
 */
class SelectList {
    element
    activeItem = null

    /**
     * Создает новый объект SelectList.
     * @param {HTMLElement} element - Элемент DOM, представляющий выпадающий список.
     * @param {object} options - Дополнительные настройки для создания объекта SelectList.
     * @param {boolean} options.isRequired - Определяет, должен ли быть выбран хотя бы один элемент (по умолчанию true).
     */
    constructor(element, {isRequired = true} = {}) {
        this.element = element
        this.isRequired = isRequired

        this.element.classList.add('select-list')

        this.bindEvents()
        this.addSelectListItemClass()
        this.initializeActiveItem()
    }

    /**
     * Геттер для получения внутреннего HTML содержимого элемента SelectList.
     * @returns {string} - Внутреннее HTML содержимое элемента.
     */
    get innerHTML() {
        return this.element.innerHTML
    }

    /**
     * Сеттер для установки внутреннего HTML содержимого элемента SelectList.
     * @param {string} html - HTML строка для установки внутреннего содержимого элемента.
     */
    set innerHTML(html) {
        this.element.innerHTML = html
    }

    /**
     * Добавляет слушателя события к элементу SelectList.
     * @param {string} type - Тип события.
     * @param {Function} listener - Функция-обработчик события.
     */
    addEventListener(type, listener) {
        if (this.element.addEventListener) {
            this.element.addEventListener(type, listener)
        } else if (this.element.attachEvent) {
            this.element.attachEvent('on' + type, listener)
        } else {
            this.element['on' + type] = listener
        }
    }

    /**
     * Удаляет слушателя события у элемента SelectList.
     * @param {string} type - Тип события.
     * @param {Function} listener - Функция-обработчик события.
     */
    removeEventListener(type, listener) {
        if (this.element.removeEventListener) {
            this.element.removeEventListener(type, listener)
        } else if (this.element.detachEvent) {
            this.element.detachEvent('on' + type, listener)
        } else {
            this.element['on' + type] = null
        }
    }

    /**
     * Инициирует событие у элемента SelectList.
     * @param {Event} event - Объект события для инициации.
     */
    dispatchEvent(event) {
        if (this.element.dispatchEvent) {
            this.element.dispatchEvent(event)
        } else if (this.element.fireEvent) {
            this.element.fireEvent('on' + event.type, event)
        }
    }

    /**
     * Добавляет класс 'select-list__item' ко всем дочерним элементам элемента SelectList.
     */
    addSelectListItemClass() {
        const childElements = this.element.children
        for (let i = 0; i < childElements.length; i++) {
            childElements[i].classList.add('select-list__item')
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