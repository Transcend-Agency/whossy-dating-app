self.onmessage = (e) => {
		const { imageData, width, height } = e.data
		const result = calculateLaplacianVariance(imageData, width, height)
		self.postMessage(result)
}

function calculateLaplacianVariance(data: Uint8ClampedArray, width: number, height: number): number {
		const laplacian = new Float32Array(width * height)

		let sum = 0
		let sum2 = 0
		const count = width * height

		for (let y = 1; y < height - 1; y++) {
				for (let x = 1; x < width - 1; x++) {
						const index = y * width + x
						const gx =
								-data[(index - width - 1) * 4] +
								-2 * data[(index - width) * 4] +
								-data[(index - width + 1) * 4] +
								data[(index + width - 1) * 4] +
								2 * data[(index + width) * 4] +
								data[(index + width + 1) * 4]
						const gy =
								-data[(index - width - 1) * 4] +
								-2 * data[(index - 1) * 4] +
								-data[(index + width - 1) * 4] +
								data[(index - width + 1) * 4] +
								2 * data[(index + 1) * 4] +
								data[(index + width + 1) * 4]
						const value = Math.sqrt(gx * gx + gy * gy)
						laplacian[index] = value
						sum += value
						sum2 += value * value
				}
		}

		const mean = sum / count
		return sum2 / count - mean * mean
}

