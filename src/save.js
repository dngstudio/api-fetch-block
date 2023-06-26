/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save({ attributes }) {
	if (!attributes.data) {
		return null; // If data is not available, don't render anything
	}

	const headers = attributes.data;

	// Create an array of header rows to display the headers
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
