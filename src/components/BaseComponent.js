class BaseComponent {
    constructor(element) {
        this.element = element
    }

    /**
     * Добавляет класс к элементу.
     * @param {string} className - Название класса для добавления.
     */
    addClass(className) {
        this.element.classList.add(className)
    }

    /**
     * Удаляет класс из элемента.
     * @param {string} className - Название класса для удаления.
     */
    removeClass(className) {
        this.element.classList.remove(className)
    }

    /**
     * Проверяет, содержит ли элемент указанный класс.
     * @param {string} className - Название класса для проверки.
     * @returns {boolean} - true, если элемент содержит указанный класс, иначе false.
     */
    hasClass(className) {
        return this.element.classList.contains(className)
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
     * Показывает элемент.
     */
    show() {
        this.element.style.display = 'block'
    }

    /**
     * Скрывает элемент.
     */
    hide() {
        this.element.style.display = 'none'
    }
}

export default BaseComponent
