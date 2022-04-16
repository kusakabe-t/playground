import React from "react"

import Image from 'next/image'
import { NextPage, InferGetStaticPropsType } from "next";

import MDX from "@mdx-js/runtime"
import Highlight, {defaultProps, Language} from "prism-react-renderer"
import github from "prism-react-renderer/themes/github"

import { getAllContents, getContentBySlug } from "../../libs/getContents";

type ImagePropsType = {
		alt: string
		src: string
		width: number
		height: number
}

const CustomImage = (props: ImagePropsType) => {
		const src = props.src.replace(/^\.\./, "")
		console.warn('src', src)

		return <Image alt={props.alt} src={src} width={props.width} height={props.height} />
}

const SnippetDetailsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ title, date, content }) => {
		const components = {
				code: CodeBlock,
				img: CustomImage
		}

		return (
				<div>
				  <div>{title}</div>
						<div>{date}</div>
						<MDX components={components}>{content}</MDX>
				</div>
		)
}

const CodeBlock = ({ children, className }: { children: string; className: string }) => {
		const language: string = className ? className.replace(/language-/, "") : "javascript"

		return (
				<Highlight
						{...defaultProps}
						code={children}
						language={language as Language}
						theme={github}
				>
						{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre
										className={className}
										style={{ ...style, padding: "16px", marginBottom: "32px", fontSize: '20px' }}
								>
          {tokens.map((line, i) => (
		          <div key={i} {...getLineProps({ line, key: i })}>
				          <div style={{ display: 'flex' }}>
						          <div>{i+1}</div>
						          <div style={{ marginLeft: '16px'}}>
								          {line.map((token, key) => (
										          <span key={key} {...getTokenProps({ token, key })} />
								          ))}
						          </div>
		            </div>
            </div>
          ))}
        </pre>
						)}
				</Highlight>
		)
}

export const getStaticPaths = async () => {
		const contents = await getAllContents(['slug'])
		const paths = contents.map(({ slug}) => '/snippets/' + slug)

		return { paths, fallback: false }
}

export const getStaticProps = ({ params }: { params: { slug: string }}) => {
		const contents = getContentBySlug('/contents/snippets/' + params.slug + '.mdx', [
				'title',
				'content',
				'slug',
				'date',
				'category'
		])

		const { content, title, date } = contents

		return {
				props: {
						title,
						date,
						content,
				}
		}
}

export default SnippetDetailsPage
