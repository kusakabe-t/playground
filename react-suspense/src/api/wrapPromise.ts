const wrapPromise = (promise: Promise<any>) => {
		let status = 'pending'
		let response: any
		const suspender = promise.then(
				(res: any) => {
						status = 'success'
						response = res
				},
				(error: any) => {
						status = 'error'
						response = error
				}
		)
		const read = () => {
				switch (status) {
						case 'pending':
								throw suspender
						case 'error':
								throw response
						default:
								return response
				}
		}

		return { read }
}

export default wrapPromise
