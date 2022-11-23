# 設定方法
まず、DBを作成する。これは適当にSQLを叩いて作成。

.envファイルにDBへの接続情報を追記し、以下のコマンドでスキーマを作成する。
テーブルがない場合はエラーになる (適当なテーブルを作り、後でスキーマで更新すれば良い)。

```shell
yarn prisma db pull
```

スキーマファイルからprismaクライアントを作成し、DBへアクセスできるようにする。

```shell
yarn prisma generate
```

## テーブルの更新
基本的に、schemaファイルを修正し、以下のコマンド叩くことで、テーブルを更新する。

```shell
yarn prisma migrate dev --name init
```

## リファレンス
- Prisma CLIのコマンド
  https://www.prisma.io/docs/reference/api-reference/command-reference#commands

- リレーション
  https://www.prisma.io/docs/concepts/components/prisma-schema/relations

- API一覧
  https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
