import SelectList from './SelectList.js'

/**
 * Класс WindowTabs представляет собой интерфейс с вкладками и окнами для контента.
 * @extends SelectList
 */
class WindowTabs extends SelectList {
    /**
     * Активное окно.
     * @type {HTMLElement|null}
     */
    activeWindow = null

    /**
     * Создает новый объект WindowTabs.
     * @param {HTMLElement} tabContainer - Элемент DOM, представляющий контейнер с вкладками.
     * @param {HTMLElement} windowContainer - Элемент DOM, представляющий контейнер с окнами для вкладок.
     * @param {object} [options] - Дополнительные настройки для создания объекта WindowTabs.
     * @param {boolean} [options.isRequired] - Определяет, должен ли быть выбран хотя бы один элемент (по умолчанию true).
     * @param {boolean} [options.enableKeyboardNavigation] - Включает/выключает управление вкладками с клавиатуры (по умолчанию true).
     */
    constructor(tabContainer, windowContainer, options = {}) {
        super(tabContainer, options)

        this.enableKeyboardNavigation = options.enableKeyboardNavigation !== undefined ? options.enableKeyboardNavigation : true

        this.element.classList.add('window-tabs')
        
        this.tabContainer = tabContainer
        this.windowContainer = windowContainer

        this.addTabWindowClass()
        this.showSelectedWindow()
    }

    /**
     * Устанавливает выбранное окно.
     * @param {string} tabId - Id окна.
     */
    set window(tabId) {
        const tab = this.tabContainer.querySelector(`[data-tab-target=${tabId}]`)
        if (!tab) return false

        this.selectedItem = tab
    }

    /**
     * Получает выбранное окно.
     * @returns {HTMLElement|null} - Выбранное окно.
     */
    get window() {
        return this.activeWindow
    }

    /**
     * Показывает выбранное окно вкладки.
     * Генерирует событие 'changeWindow' при изменении активного окна.
     */
    showSelectedWindow() {
        const selectedTabId = this.activeItem.getAttribute('data-tab-target')
        const selectedWindow = document.querySelector(`[data-tab-content="${selectedTabId}-content"]`)

        if (selectedWindow) {
            if (selectedWindow !== this.activeWindow) {
                if (this.activeWindow) {
                    this.activeWindow.classList.remove('active')
                }
                selectedWindow.classList.add('active')
                this.activeWindow = selectedWindow
            } else if (selectedWindow === this.activeWindow) {
                if (!this.isRequired) {
                    selectedWindow.classList.remove('active')
                    this.activeWindow = null
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

    /**
     * Добавляет новую вкладку и соответствующее окно.
     * @param {string} tabId - Уникальный идентификатор вкладки.
     * @param {string} tabText - Текст, отображаемый на вкладке.
     * @param {HTMLElement} windowContent - Элемент DOM, представляющий содержимое окна вкладки.
     */
    addTab(tabId, tabText, windowContent) {
        const tab = document.createElement('div')
        tab.classList.add('tab')
        tab.textContent = tabText
        tab.setAttribute('data-tab-target', tabId)
        this.tabContainer.appendChild(tab)

        const windowContentWrapper = document.createElement('div')
        windowContentWrapper.classList.add('tab-window')
        windowContentWrapper.setAttribute('data-tab-content', `${tabId}-content`)
        windowContentWrapper.appendChild(windowContent)
        this.windowContainer.appendChild(windowContentWrapper)
    }

    /**
     * Удаляет вкладку и соответствующее окно по их уникальному идентификатору.
     * @param {string} tabId - Уникальный идентификатор вкладки для удаления.
     */
    removeTab(tabId) {
        const tabToRemove = this.tabContainer.querySelector(`[data-tab-target="${tabId}"]`)
        const windowContentToRemove = this.windowContainer.querySelector(`[data-tab-content="${tabId}-content"]`)

        if (tabToRemove && windowContentToRemove) {
            this.tabContainer.removeChild(tabToRemove)
            this.windowContainer.removeChild(windowContentToRemove)
        }
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
     * Привязывает события к элементу WindowTabs для обработки выбора вкладок и управления с клавиатуры.
     * @override
     */
    bindEvents() {
        super.bindEvents()

        /**
         * Событие, вызываемое при выборе другой вкладки.
         * @event SelectList#change
         * @type {Event}
         */
        this.addEventListener('change', () => {
            this.showSelectedWindow()
        })

        this.element.addEventListener('keydown', (e) => {
            if (this.enableKeyboardNavigation) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const currentIndex = Array.from(this.element.children).findIndex(item => item === this.activeItem);
                    let newIndex = currentIndex;
                    if (e.key === 'ArrowRight') {
                        newIndex = (currentIndex + 1) % this.element.children.length;
                    } else if (e.key === 'ArrowLeft') {
                        newIndex = (currentIndex - 1 + this.element.children.length) % this.element.children.length;
                    }
                    this.selectedItem = this.element.children[newIndex];
                }
            }
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
        }
    }
}

export default WindowTabs
