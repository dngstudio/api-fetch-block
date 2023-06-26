/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
import { useEffect } from "react";

export default function Edit({ attributes, setAttributes }) {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await wp.apiFetch({ url: "https://httpbin.org/get" });
				setAttributes({ data: response.headers });
				console.log(response);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures the effect runs only once

	if (!attributes.data) {
		return <p>Loading data from API...</p>;
	}

	const headers = attributes.data;

	const headerRows = Object.entries(headers).map(([name, value]) => (
		<div key={name}>
			<strong>{name}:</strong> {value}
		</div>
	));

	return (
		<div>
			<h3>Headers:</h3>
			{headerRows}
		</div>
	);
}
