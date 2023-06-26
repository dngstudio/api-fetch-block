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
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

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

import { PanelBody } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch"; // Had to install api-fetch package

export default function Edit({ attributes, setAttributes }) {
	if (attributes.data) {
		const headers = attributes.data;

		const headerRows = Object.entries(headers).map(([name, value]) => (
			<div key={name}>
				<strong>{name}:</strong> {value}
			</div>
		));

		return (
			<>
				<div {...useBlockProps()}>
					<h3>Headers:</h3>
					{headerRows}
				</div>
			</>
		);
	}

	apiFetch({ url: "https://httpbin.org/get" }).then((response) => {
		setAttributes({ data: response.headers });
	});

	return (
		<>
			<div {...useBlockProps()}>
				<InspectorControls>
					<PanelBody title="API Fetch Block">
						<h3>Block Information</h3>
						<p>This block fetches and displays API headers.</p>
					</PanelBody>
				</InspectorControls>

				<p>Fetching data from API...</p>
			</div>
		</>
	);
}
