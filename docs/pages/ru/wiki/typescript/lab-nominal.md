import { DraftAlert } from "$alerts";

<DraftAlert />

# Номинальная система типов

Typescript является языком с номинальной системой типов (TODO:ссылка), но есть возможность данное ограничение частично обойти. Часто подобный метод упоминается в контексте "branded", "opaque", "tagged" типов. Концепция достаточно простая, к типу добавляется дополнительное поле, которое содержит информацию об этом типе (номинальные идентификатор).

```tsx
export declare const Nomen: unique symbol;

export type Nominal<T, TNomen> = T & {
    readonly [Nomen]: TNomen;
    // TODO: Или более простой вариант (начать можно с него, а потом пояснить недостатки со ссылкой на Symbols)
    // readonly _nomen: TNomen
};

export type USD = Nominal<number, "USD">;
export type EUR = Nominal<number, "EUR">;
```

## Проблемы

Номинация даёт контроль, когда типы приводятся через равенство. Но при этом другие операции могут безболезненно проходить. Происходит этого из-за того, что номинальный тип без проблем приводится к тому, который он расширяет.

```tsx
let amount = 100 as USD;
let debet = 40 as EUR;

amount = 90 as EUR;
// Type 'Nominal<number, "EUR">' is not assignable to type '{ readonly [Nomen]: "USD"; }'

let outcome = amount - debet;
// 60

function add<T>(x: Nominal<number, T>, y: Nominal<number, T>) { ... }
// Такой метод даёт забавную сигнатуру T = "USD" | "EUR"
```

## Области применения

-   Единицы измерения

## ToDo

-   https://github.com/microsoft/TypeScript/issues/202
-   https://habr.com/ru/post/446768/
-   https://stackoverflow.com/questions/56737033/how-to-define-an-opaque-type-in-typescript
-   https://github.com/gcanti (проекты io-ts, fp-ts)
-   Даст ли эта концепция что-то полезное для IEntity/TEntity?
