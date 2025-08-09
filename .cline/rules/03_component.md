# コンポーネントについて

## コンポーネントの命名規則

- コンポーネントの命名規則は、kebab-caseを使用してください。

## コンポーネントのディレクトリ構成

- 全体で使うコンポーネントは、`app/components`ディレクトリ配下に配置してください。
- コンポーネントは、
    - `app/components/atoms`
    - `app/components/molecules`
    - `app/components/organisms`
    - `app/components/templates`
    の4つのディレクトリに分類してください。
- organisms < molecules < atomsの順で子になっていくため上位を参照することがないようにしてください。(moleculesがorganismsを参照することはない)
- ページごとに可読性を向上させるためのコンポーネントは、`app/hoge-hoge/_component`ディレクトリ配下にflatに配置してください。