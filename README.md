# Dynamic Table JavaScript Class

The Dynamic Table JavaScript class is a simple utility for rendering dynamic tables with grouping functionality. It allows you to create tables with grouped headers and toggle the visibility of grouped rows.

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
    <script src="./DynamicTable.js"></script>
    <title>Dynamic Table</title>

</head>
<body>

<div id="tablediv"></div>

<script>


    // Example usage
    const tableData = [
        {id: 1, name: 'Row 1', group: 'Group A'},
        {id: 2, name: 'Row 2', group: 'Group A'},
        {id: 3, name: 'Row 3', group: 'Group B'},
        {id: 4, name: 'Row 4', group: 'Group B'},
        {id: 5, name: 'Row 3', group: 'Group C'},
        {id: 6, name: 'Row 4', group: 'Group C'},
        {id: 7, name: 'Row 3', group: 'Group D'},
        {id: 8, name: 'Row 4', group: 'Group D'},
    ];

   const tableOptions = {
            data:tableData,
            groupby:'group',
            columns: [
           {title: 'ID', field: 'id'},
           {title: 'Name', field: 'name'}
        ],
        };

        const dynamicTable = new DynamicTable('tablediv', tableOptions);
</script>

</body>
</html> 
 ```



## Options

- data: An array of objects representing the table data.
- groupby: The field to group rows by.
- columns: An array of column configurations.
- Set Table footer with a specific value
- Set Group header with dynamic content, with lambda function  support
- device Dark mode support


## Example of how to use SetGroupHeader feature

```javascript
        dynamicTable.setGroupHeader(function (year) {
            let carryovers = carryoverdata();
            let previousYear = year - 1;
            let carryover = carryovers[previousYear] ? carryovers[previousYear].carryover : 0;
            let visibilitySpan = '<td id="carryover-span-' + year + '" class="visible-when-expanded" >'
                 +year + ' Carryover from Previous Years: ' + carryover + ' days  </td>';
            let fullHeader = visibilitySpan;
           return fullHeader;
        });
```

And we can do same with the Setfooter feature
Happy coding!
