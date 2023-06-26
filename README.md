# API Fetch Block

A Gutenberg block that fetches and displays API headers.

## Installation

1. Download the plugin files and extract them.
2. Upload the plugin folder to the `/wp-content/plugins/` directory.
3. Activate the plugin through the 'Plugins' screen in WordPress.

## Usage

Once the plugin is activated, you can add the API Fetch block to your posts or pages using the Gutenberg editor.

1. Edit the post or page where you want to add the block.
2. Search for "API Fetch" in the block inserter and select the "API Fetch Block".
3. The block will fetch API headers and display them in a visually appealing format.

## Block Output

The block fetches API headers and displays them in a formatted list. It also caches the data for a duration of 5 minutes to improve performance.

If the API request fails or no headers are available, appropriate error messages or fallback content will be displayed.

## Development

To set up the development environment and make changes to the block:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run `npm run build` to build the block assets.
4. Start the development server with `npm start`.
5. Edit the files in the `src` directory to make changes to the block functionality.
6. Make sure to build the assets again using `npm run build` before deploying the changes.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
