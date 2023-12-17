
# ![logo](http://forge.ruden.pro/favicon-32x32.png) ForgeCraft-UI
ForgeCraft UI - это интуитивный набор инструментов для быстрого создания пользовательского интерфейса. С этим набором компонентов и простым в использовании интерфейсом вы можете легко и быстро разрабатывать интерактивные веб-приложения. Ускорьте процесс разработки проектов с ForgeCraft UI!

## Компоненты

#### ForgeCraft UI содержит несколько компонентов:
* [`BaseComponent`](#BaseComponent "Goto BaseComponent")
* [`Dropdown`](#Dropdown "Goto Dropdown")
* [`SelectableItems`](#SelectableItems "Goto SelectableItems")
* [`SelectList`](#SelectList "Goto SelectList")
* [`StackedPages`](#StackedPages "Goto StackedPages")
* [`WindowTabs`](#WindowTabs "Goto WindowTabs")


### BaseComponent
Все компоненты наследуют этот класс, для удобного использования стандартных методов
### Dropdown
Создаётся на основе элемента `Select` и создаёт красивый выпадающий список
### SelectableItems
Создаётся на основе элемента-контейнера и добавляет в дочерним элементам класс active при клике по ним
### SelectList
Создаётся на основе элемента `Select` и создаёт список с возможностью выбирать элементы
### StackedPages
Создаётся на основе элемента-контейнера и позволяет отображать/скрывать дочерние элементы
### WindowTabs
Создаётся на основе 2-х элементов-контейнеров: первый превращается в `SelectableItems`, второй в `StackedPages`. Позволяет отображать в `StackedPages` элементы выбранные в `SelectableItems` по имени указанному в `data-name` у 'вкладки', страница должна содержать то же `data-name` с припиской `-content`

[![Preview](https://dabuttonfactory.com/button.png?t=Посмотреть%20примеры&f=Open+Sans-Bold&ts=16&tc=fff&hp=20&vp=8&c=6&bgt=unicolored&bgc=ff0061)](https://furry-dev.github.io/ForgeCraft-UI/)

## Лицензия

Этот проект лицензирован под [MIT](LICENSE) лицензией. 
