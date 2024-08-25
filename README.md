# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

## Сборка

```
npm run build
```

## Данные и типы данных, используемые в приложении

Тип метода оплаты

```
type TPayment = 'cash' | 'card';
```

Карточка продукта

```
interface IProduct {
    id: string
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}

```

Корзина

```
interface IBuscket {
    products: ICard[];
    total: number;
}
```

Модель данных карточек

```
interface ICardData {
    cards: ICard[];
    preview: string | null;
}
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:

- слой представления, отвечает за отображение данных на странице,
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:

- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:

- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой данных

#### Класс ProductData

Отвечает за хранение всех товаров, полученных с сервера. а так же за логику работы с ними.\
Имеет следующие поля:

- `products : IProduct[]` - массив товаров
- `preview: string | null` - хранит `id` карточки, у которой открываем предпросмотр\

Методы:

- `getProduct: (id: string) => IProduct` - возвращает товар по `id`

#### Класс Cart

Отвечает за корзину с товарами и логику работы с ней.\
Имеет следующие поля:

- `products : IProduct[]` - массив товаров, которые находятся в корзине
- `totalPrice: number` - суммарная цена всех товаров в корзине\

Методы:

- `addProduct: (product: IProduct) => void` - добавляет товар в корзину
- `removeProduct: (product: IProduct) => void` - удаляет товар из корины
- `clear: () => void` - очищает корзину, например, при завершении оформления заказа

#### Класс Order

Отвечает за заказ и отправку его на сервер.\
Имеет следующие поля:

- `status: string` - статус заказа
- `totalPrice: number` - сумма заказа

Методы:

- `postOrder: () => void` - отправляет информацию о заказе на сервер

### Слой отображения

#### класс CartUI

Отвечает за отображение корзины и ее содержимого. А так же для взаимодествия пользователя с ней.\
Имеет следующие поля:

- `model: ICart` - модель корзины
- `content: HTMLElement` - наполнение блока в HTML
- `events: IEvents` - для работы с событиями

#### класс Buyer

Отвечает за заполнение и валидацию полей формы покупателя.\
Имеет следующие поля:

- `email: HTMLElement` - поле email
- `phone: HTMLElement` - поле телефона
- `events: IEvents` - для работы с событиями

#### класс BillingForm

Отвечает за заполнение и валидацию полей формы покупателя.\
Имеет следующие поля:

- `address: HTMLElement` - поле адреса
- `payment: HTMLElement` - выбор способа оплаты
- `events: IEvents` - для работы с событиями

#### класс CompletedOrder

Отвечает за вывод сообщения о статусе заказа после его оформления.\
Имеет следующие поля:

- `status: HTMLElement` - значение статуса
- `totalPrice: HTMLElement` - стоимость заказа

## Взаимодействие компонентов

Взаимодействое осуществляется за счёт брокера событий, описанного в `types\index.ts`.\

Список всех событий:\
`card:open` - открытие карточки продукта,\
`cart:open` - открытие модального окна корзины,\
`card:close` - закрытие карточки продукта,\
`cart:close` - закрытие модального окна корзины,\
`cartProduct:delete` - удаление продукта из корзины,\
`cart:submit` - оформление корзины,\
`product:buy` - добавление продукта в корзину,\
`billing:submit` - подтверждение адреса и способа оплаты,\
`buyer:submit` - подтверждение данных покупателя,\
`buyer:validate` - валидация данных покупателя,\
`billing:validate` - валидация данных адреса
