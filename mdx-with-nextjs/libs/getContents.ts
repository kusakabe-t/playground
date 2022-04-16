import { join, parse } from 'path'
import { InferGetStaticPropsType, NextPage } from 'next'
import { globby } from 'globby'
import * as fs from 'fs'
import matter from 'gray-matter'

export const getAllContents = async (fields: string[] = []) => {
		// NOTE: 指定したフォルダを含めた配下のファイルを全て列挙
		// slugs [
		//   'contents/snippets/shell/change-display-name-temporary.mdx',
		//   'contents/snippets/shell/image.mdx',
		//   'contents/snippets/shell/output-color-message.mdx',
		//   'contents/snippets/shell/quick-move-local-repository.mdx',
		//   'contents/snippets/shell/image/change-image-extension.mdx'
		// ]
		const slugs = await globby(['contents/snippets'])

		// contentsを返す
		return slugs.map((slug) => getContentBySlug(slug, fields))
				.sort((content1, content2) => (content1.date > content2.date ? -1 : 1))
}

export const getContentBySlug = (slug: string, fields: string[]) => {
		const fullFilePath = join(process.cwd(), slug)
		// NOTE: mdxの中身を取得
		const fileContent = fs.readFileSync(fullFilePath, { encoding: "utf-8" })

		// NOTE: `---`で囲った部分をdata, それ以外をcontentとして分けて取得
		// data => {
		//   title: '画像の拡張子や色空間を変換する方法',
		//   tags: 'shell,image',
		//   date: '2021-03-07 16:52:01',
		//   category: 'Shell',
		//   metaTitle: 'This is the title tag of this page',
		//   metaDescription: 'This is the meta description'
		// }
		// content =>
		// -colorspace で色空間を指定できます。
		//
		// ```bash
		// $ convert -colorspace RGB original.jpg converted.png
		// ```
		// ...
		const { data, content } = matter(fileContent)

		const items: {
				title?: string
				slug?: string
				content?: string
				date: string
		} = {
				title: '',
				slug: '',
				content: '',
				date: ''
		}

		// TODO: slugだけを取りたい場合にもcontentを取得するようになっている！
		fields.forEach((field) => {
				if (field === 'slug') {
						items[field] = parse(slug).base.replace(/\.mdx$/, "")
				}
				if (field === "content") items[field] = content
				// @ts-ignore
				// TODO: これって動く？？
				if (data[field]) items[field] = data[field]
				items.date = data.date
		})

		return items
}
