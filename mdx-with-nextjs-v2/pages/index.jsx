import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Data from '../contents/posts/hoge.md'

const mdComponents = {
		h1: props => <h1 style={{color: 'tomato'}} {...props} />
}

const Test = () => (
		<div># :wave: Hello, Hoge!

				This is MDX!!!!!
		</div>
)

const IndexPage = () => {
		return (
				<MDXProvider components={mdComponents}>
						{/*<Test />*/}
						<Data />
				</MDXProvider>
		)
}

export default IndexPage
