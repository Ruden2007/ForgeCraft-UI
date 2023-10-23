import SelectList from './SelectList.js'

class WindowTabs extends SelectList {
    activeTab = null

    constructor(tabContainer, windowContainer, options = {}) {
        super(tabContainer, options)

        this.element.classList.add('window-tabs')

        this.windowContainer = windowContainer
        this.initEventListeners()
        this.addTabWindowClass()
        this.showSelectedWindow()
    }

    initEventListeners() {
        this.addEventListener('change', () => {
            this.showSelectedWindow()
        })
    }

    addTabWindowClass() {
        const childElements = this.windowContainer.children
        for (let i = 0; i < childElements.length; i++) {
            childElements[i].classList.add('tab-window')
        }
    }

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

            const event = new Event('changeWindow', {bubbles: true})
            this.dispatchEvent(event)
        }
    }
}

// Экспортируйте класс WindowTabs для использования в других файлах
export default WindowTabs