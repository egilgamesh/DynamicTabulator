# Dynamic Table JavaScript Class

The Dynamic Table JavaScript class is a simple utility for rendering dynamic tables with grouping functionality. It allows you to create tables with grouped headers and toggle visibility of grouped rows.

## Features

- Group rows based on a specified column
- Toggle visibility of grouped rows on header click
- Easy integration with HTML and customizable styling

## Usage

1. Include the DynamicTable.js file in your project:

    ```html
    <script type="module" src="path/to/DynamicTable.js"></script>
    ```

2. Create an instance of the DynamicTable class in your JavaScript file:

    ```javascript
    const tableOptions = {
        data: /* your data array */,
        groupby: /* your groupby field */,
        columns: /* your columns array */,
    };

    const dynamicTable = new DynamicTable('yourContainerId', tableOptions);
    ```

3. Customize the table appearance and behavior by adjusting the options.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Table Example</title>
    <!-- Import the DynamicTable class -->
    <script type="module" src="path/to/DynamicTable.js"></script>
</head>
<body>
    <div id="tableContainer"></div>

    <script>
        // Usage example
        const tableOptions = {
            data: /* your data array */,
            groupby: /* your groupby field */,
            columns: /* your columns array */,
        };

        const dynamicTable = new DynamicTable('tableContainer', tableOptions);
    </script>
</body>
</html>



##Options

data: An array of objects representing the table data.
groupby: The field to group rows by.
columns: An array of column configurations.

Happy coding!
