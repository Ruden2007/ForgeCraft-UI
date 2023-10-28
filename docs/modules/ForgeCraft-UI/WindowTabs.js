import SelectList from './SelectList.js'

/**
 * Класс WindowTabs представляет собой интерфейс с вкладками и окнами для контента.
 * @extends SelectList
 */
class WindowTabs extends SelectList {
    /**
     * Активная вкладка.
     * @type {HTMLElement|null}
     */
    activeTab = null

    /**
     * Другое название для списка вкладок(для удобства).
     * Объект, содержащий вкладки с ключами в виде атрибутов 'data-name'.
     * @type {Object}
     */
    tabContent = this.listItems

    /**
     * Объект, содержащий окна с ключами в виде атрибутов 'data-name'.
     * @type {Object}
     */
    tabWindows = {}


    /**
     * Создает новый объект WindowTabs.
     * @param {HTMLElement} tabContainer - Элемент DOM, представляющий контейнер с вкладками.
     * @param {HTMLElement} windowContainer - Элемент DOM, представляющий контейнер с окнами для вкладок.
     * @param {object} options - Дополнительные настройки для создания объекта WindowTabs.
     * @param {boolean} options.isRequired - Определяет, должен ли быть выбран хотя бы один элемент (по умолчанию true).
     */
    constructor(tabContainer, windowContainer, options = {}) {
        super(tabContainer, options)

        this.element.classList.add('window-tabs')
        this.windowContainer = windowContainer
        this.addTabWindowClass()
        this.showSelectedWindow()
    }

    /**
     * Показывает элемент.
     */
    show() {
        super.show()
        this.windowContainer.style.display = 'block'
    }

    /**
     * Скрывает элемент.
     */
    hide() {
        super.hide()
        this.windowContainer.style.display = 'none'
    }

    /**
     * Привязывает события к элементу WindowTabs для обработки выбора вкладок.
     * @override
     */
    bindEvents() {
        super.bindEvents()

        /**
         * Событие, вызываемое при выборе другой вкладки.
         * @event WindowTabs#changeWindow
         * @type {Event}
         */
        this.addEventListener('change', () => {
            this.showSelectedWindow()
        })

        /**
         * Событие, вызываемое при обновлении списка вкладок.
         * @event WindowTabs#listUpdate
         * @type {Event}
         */
        this.addEventListener('listUpdate', () => {
            this.tabContent = this.listItems
        })
    }

    /**
     * Добавляет класс 'tab-window' ко всем дочерним элементам контейнера с окнами вкладок.
     */
    addTabWindowClass() {
        const childElements = this.windowContainer.children
        for (let i = 0; i < childElements.length; i++) {
            const elem = childElements[i]
            elem.classList.add('tab-window')

            const itemName = elem.getAttribute('data-name')
            if (itemName) {
                this.tabWindows[itemName] = elem
            }
        }
    }

    /**
     * Показывает выбранное окно вкладки.
     * Генерирует событие 'changeWindow' при изменении активного окна.
     */
    showSelectedWindow() {
        const selectedTabId = this.activeItem.getAttribute('data-tab-target')
        const selectedWindow = document.querySelector(`[data-tab-content="${selectedTabId}-content"]`)

        if (selectedWindow) {
            if (selectedWindow !== this.activeTab) {
                if (this.activeTab) {
                    this.activeTab.classList.remove('active')
                }
                selectedWindow.classList.add('active')
                this.activeTab = selectedWindow
            } else if (selectedWindow === this.activeTab) {
                if (!this.isRequired) {
                    selectedWindow.classList.remove('active')
                    this.activeTab = null
                }
            }

            /**
             * Событие, вызываемое при изменении активного окна.
             * @event WindowTabs#changeWindow
             * @type {Event}
             */
            const event = new Event('changeWindow', {bubbles: true})
            this.dispatchEvent(event)
        }
    }
}

export default WindowTabs
