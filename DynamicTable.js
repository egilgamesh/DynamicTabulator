// DynamicTable.js

class DynamicTable {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.data = options.data || [];
        this.groupby = options.groupby || '';
        this.columns = options.columns || [];
        this.renderTable();
    }

    renderTable() {
        const table = document.createElement('table');
        table.classList.add('dynamic-table');
        this.container.appendChild(table);
        this.renderHeader(table);
        this.renderRows(table);
    }

    renderHeader(table) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        this.columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column.title || column.field;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);
    }

    renderRows(table) {
        const tbody = document.createElement('tbody');

        if (this.groupby) {
            let currentGroup = null;

            this.data.forEach(rowData => {
                if (rowData[this.groupby] !== currentGroup) {
                    currentGroup = rowData[this.groupby];
                    this.renderGroupHeader(tbody, currentGroup);
                }

                this.renderRow(tbody, rowData, currentGroup);
            });
        } else {
            // If no grouping is specified, render all rows without group headers
            this.data.forEach(rowData => {
                this.renderRow(tbody, rowData);
            });
        }

        table.appendChild(tbody);
    }

    renderGroupHeader(tbody, group) {
        const groupHeaderRow = document.createElement('tr');
        groupHeaderRow.classList.add('group-header');
        groupHeaderRow.innerHTML = `<td id="id-${group}" colspan="${this.columns.length}">${group}</td>`;
        groupHeaderRow.addEventListener('click', () => this.toggleGroup(group));

        tbody.appendChild(groupHeaderRow);
    }

    renderRow(tbody, rowData, group) {
        const row = document.createElement('tr');
        if(this.groupby)
        {
        row.classList.add(`group-data-${group.toString().replaceAll(' ', '-')}`, 'hidden');
        }

        this.columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = rowData[column.field];
            row.appendChild(td);
        });

        tbody.appendChild(row);
    }

    toggleGroup(group) {
        const groupDataRows = document.querySelectorAll(`.group-data-${group.toString().replaceAll(' ', '-')}`);

        groupDataRows.forEach(dataRow => {
            dataRow.classList.toggle('hidden');
        });

        // Collapse other groups
        const otherGroupRows = document.querySelectorAll('.group-header:not(.hidden)');
        otherGroupRows.forEach(row => {
            if (row.textContent !== group) {
                const otherGroup = row.textContent;
                const otherGroupDataRows = document.querySelectorAll(`.group-data-${otherGroup.replaceAll(' ', '-')}`);
                otherGroupDataRows.forEach(dataRow => {
                    dataRow.classList.add('hidden');
                });
            }
        });
    }

    setGroupHeader(headerFunction) {
        const tbody = this.container.querySelector('tbody');
        const groupHeader = tbody.querySelectorAll('tr.group-header');
        const groups = [...new Set(this.data.map(item => item[this.groupby]))];

        groupHeader.forEach((groupHeaderRow, index) => {
            groupHeaderRow.innerHTML = headerFunction(groups[index]);
            groupHeaderRow.setAttribute('colspan', this.columns.length);
            groupHeaderRow.classList.add('group-header');
            groupHeaderRow.addEventListener('click', () => this.toggleGroup(group));
            console.log(groupHeaderRow.innerHTML);

        })

           console.log(groupHeader);
    }


    SetFooter(value) {
        const tfoot = document.createElement('tfoot');
        const footerRow = document.createElement('tr');
        footerRow.classList.add('footer-row');

        const td = document.createElement('td');
        td.colSpan = this.columns.length;
        td.innerHTML = `<strong>Total Leaves:</strong> ${value}`;
        footerRow.appendChild(td);

        tfoot.appendChild(footerRow);
        this.container.querySelector('table').appendChild(tfoot);
    }
}

// Export the DynamicTable class for importing in other files
//export default DynamicTable;
