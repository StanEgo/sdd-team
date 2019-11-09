import { ToDoAlert, DraftAlert } from "$alerts";
import { CodeBlock } from "$components/CodeBlock";

<DraftAlert />

# Организация проекта TypeScript

Основная идея - рассмотреть наиболее комплексный случай, когда одно решение-монорепозиторий, как правило - приложение (например TODO:Ссылка на SDE Team Server) использует другое решение, также монорепозиторий, которое обычно играет роль библиотеки (например TODO:ссылка на SDE.TypeScript). И их разработка ведётся параллельно.

<ToDoAlert>Ссылка на описание monorepo</ToDoAlert>

## Packages

NPM пакеты обоих приложений хранятся в папке /packages. Помимо того, что это часто используемая практика, она позволяется с легкостью добавить в проект и другие виды артефактов (config, docs, specs) без последствий.

## Yarn workspaces

Для организации пакетов мы будем использовать Yarn workspaces (TODO:Ссылка). Этот инструмент существенно упрощает работу с монорепозиторием, в том числе консолидируя используемые внешние пакеты. Это существенно сокращает размеры папок node_modules, поскольку храниться только один экземпляр каждого пакета в папке /node_modules, а не повторяется в каждой /package/{package_name}/node_modules. А также облегчает контроль за согласованностью использованных версий. Ибо если папка /package/{package_name}/node_modules растёт в размерах, значет она использует версии отличные от общих для проекта.

## Корневой package.json

Корневой /package.json файл определяет структуру проекта в целом и из существенных здесь параметр private, поскольку только такие пакеты могут стать описанием Yarn workspaces и "workspaces", благодаря которому осуществляется вся "магия". Он перечисляет папки с пакетами проекта.

```tsx
{
    "name": "@sde/workspace",
    "repository": "https://github.com/StanEgo/sde-team.git",
    "private": true,
    "workspaces": [
        "packages/*"
    ],
    "dependencies": {
        "typescript": "^3.7.0"
    }
}
```

## Корневой tsconfig.json

Для организации пакетов на уровне TypeScript воспользуемся возможностью, появившейся с версии 3.0 - Project References и создадим файл /packages/tsconfig.json, который перечислит все включённые пакеты (в примере это /packages/cli и packages/core).

```tsx
{
    "references": [
        { "path": "core" },
        { "path": "cli" }
    ]
}
```

## Базовый tsconfig.json

Базовый /package/tsconfig.base.json определяет своеобразный стандарт настроек, который мы будем использовать в пакетах. Из интересного здесь стоит отметить свойство "composite" которое является обязательным при использовании project references. А также стоит отдельно объяснить, почему выбран ES5 в качестве "target". В большинстве случаев сборка итоговых приложений будет осуществлятся бандлерами (webpack, rollup, etc). Им мы постараемся предоставить возможность работы непосредственно с TypeScript. А для всех остальных случаев, когда проект используется как есть, ES5 будет обеспечивать максимальную совместимость. Та же причина максимальной совместимости выбрана и для "module".

```tsx
{
	"compilerOptions": {
		"composite": true,

		"module": "commonjs",
		"target": "es5",
		"moduleResolution": "node",

		"strict": true,

		"resolveJsonModule": true,
		"declarationMap": true,
		"esModuleInterop": true
	},

	"exclude": [
		"**/*.spec.ts"
	]
}
```

В части остальных свойств:

-   strict - true. В типизации - сила TypeScript. Чтобы не использовать её нужны веские причины.
-   resolveJsonModule - true. Удобный доступ к настройкам в package.json из кода программы может быть полезен.
-   exclude - [ "**/*.spec.ts" ]. Расположение тестов непосредственно рядом с SUT видится пока наиболее удачным решением.

## Конкретный tsconfig.json

Для конкретного проекта конфигурация в tsconfig.json прежде всего должна ссылать на базовые настройки. В дальнейшем мы определяем структуру наших папок: src/ - для исходных текстов, es5/ - для скомпилированных пакетов в ES5 и types/ для файлов с декларациями типов.

```tsx
{
	"extends": "../tsconfig.base.json",

	"compilerOptions": {
		"rootDir": "src",
		"outDir": "es5",
		"declarationDir": "types"
	},

	"include": [ "src" ],

    "references": [
		{ "path": "../core" }
    ]
}
```

Если пакет ссылается на другой в проекте, то он попадает в раздел "references".

<ToDoAlert>
    Почему нельзя вынести настройки папок в tsconfig.base.json, они во многом идентичны
</ToDoAlert>

<ToDoAlert>Может ли в "include" быть включён package.json?</ToDoAlert>

## Конкретный package.json

С одной стороны из важных стоит отметить здесь свойство "main". Оно ссылается на папку es5. Таким образом, по умолчанию, пользователи данного пакета видят наиболее совместимую версию. С другой стороны TypeScript (https://www.typescriptlang.org/docs/handbook/module-resolution.html#how-typescript-resolves-modules) использует для той же цели поле "types". Но здесь есть одна недокументированная тонкость (https://github.com/microsoft/TypeScript/issues/33305), у TypeScript есть эквивалентное свойство "typings" (https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html), которое он использует в качестве приоритетного. Поэтому именно его мы устанавливаем на папку src/, чтобы при использовании этого пакета из другого TypeScript-проекта он пользовался не транспилированной версией в es5/, а оригинальными исходными файлами. Свойство же "types" указываен на одноименную папку с файлами деклараций, которые тоже могут быть полезны. Например, в некоторые сборки мы можем включать только ES5 + \*.d.ts декларации.

```tsx
{
  "name": "@sde/core",
  "version": "0.0.1",

  "main": "es5",
  "types": "types",
  "typings": "src",

  "scripts": {
    "clean:es5": "rimraf es5",
    "clean:types": "rimraf types",
    "clean:cache": "rimraf *.tsbuildinfo",
    "clean": "run-p clean:*",

    "build:es5": "tsc --build",
    "build": "run-p build:*",

    "test:jest": "jest",
    "test": "run-s build test:jest"
  },

  "devDependencies": {
    "@types/jest": "^24.0.13",
    "jest": "^24.8.0",
    "npm-run-all": "^4.1.5",
    "rimraf": "^2.7.1",
    "ts-jest": "^24.0.2",
    "typescript": "^3.7.2"
  }
}
```

Также, мы можем указывать бандлерам на использование этой точки входа, например для Webpack:

```tsx
resolve: {
    mainFields: ["typings", "main"];
}
```

<ToDoAlert>С type/typings надо будет ещё разобраться, включая работу с бандлерами</ToDoAlert>
<ToDoAlert>Описание скриптов может подождать, пока не достигнет зрелости</ToDoAlert>
<ToDoAlert>Поработать с остальными свойствами, например copyright, license, repository, maintainers</ToDoAlert>

## Отладка

Флаг --traceResolution компилятора tsc может быть использован для отладки "module resolution".

<ToDoAlert>
    Не помешают инструкции по настройке дополнительных инструментов (eslint, jest), IDE (VSCode,
    prettier, etc).
</ToDoAlert>