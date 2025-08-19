import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateADS = () => {
	const navigate = useNavigate()
	const [images, setImages] = useState([])

	const handleFilesChange = (e) => {
		const newFiles = Array.from(e.target.files)
		setImages((prev) => [...prev, ...newFiles])
	}

	const removeImage = (index) => {
		setImages(images.filter((_, i) => i !== index))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("Form submitted with images:", images)
		// send images + other form data to backend
	}
	const goBack = () => {
		navigate(-1)
	}

	return (
		<div className="h-screen  w-full flex justify-center items-center bg-zinc-50 shadow-md px-4 md:px-0">
			<div className="bg-green-800 relative max-w-md p-8 rounded-lg text-white flex flex-col justify-center items-center gap-4 w-full">
				<div
					className=" absolute top-1 left-3 text-3xl w-10 text-center cursor-pointer "
					onClick={goBack}>
					&larr;{" "}
				</div>
				<h1 className="text-2xl font-bold">create ADS</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-center gap-2 w-full">
					<input
						className="border border-green-700 py-2 pl-2 rounded-lg w-full"
						type="text"
						placeholder="title"
					/>
					<input
						className="border border-green-700 py-2 pl-2 rounded-lg w-full"
						type="text"
						placeholder="description"
					/>
					<input
						className="border border-green-700 py-2 pl-2 rounded-lg w-full"
						type="text"
						placeholder="location"
					/>
					<input
						className="border border-green-700 py-2 pl-2 rounded-lg w-full"
						type="text"
						placeholder="category"
					/>
					<input
						className="border border-green-700 py-2 pl-2 rounded-lg w-full"
						type="number"
						placeholder="price"
					/>

					{/* Multiple Image Input with Preview */}
					<input
						type="file"
						multiple
						onChange={handleFilesChange}
						className="border-2 border-dashed border-zinc-200 rounded-lg p-4 w-full cursor-pointer"
					/>

					{images.length > 0 && (
						<div className="grid grid-cols-3 gap-2 mt-2 w-full">
							{images.map((file, idx) => (
								<div key={idx} className="relative">
									<img
										src={URL.createObjectURL(file)}
										alt="preview"
										className="w-full h-24 object-cover rounded-lg"
									/>
									{/* Always visible remove button */}
									<button
										type="button"
										onClick={() => removeImage(idx)}
										className="absolute top-1 right-1  text-white rounded-md w-6 h-6 flex items-center justify-center text-lg font-bold">
										×
									</button>
								</div>
							))}
						</div>
					)}

					<button
						type="submit"
						className="px-4 py-2 bg-white text-black rounded-full mt-4">
						Add Post
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateADS
