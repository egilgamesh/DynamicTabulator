// DynamicTable.js

class DynamicTable {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.data = options.data || [];
        this.groupby = options.groupby || '';
        this.columns = options.columns || [];
        this.collapseIconClass = 'fa-chevron-up';
        this.expandIconClass = 'fa-chevron-down';
        
        this.renderTable();
    }

    renderTable() {
        const table = document.createElement('table');
        table.classList.add('dynamic-table');

        this.container.appendChild(table);

        this.renderRows(table);
    }

    renderRows(table) {
        const tbody = document.createElement('tbody');

        let currentGroup = null;

        this.data.forEach(rowData => {
            if (this.groupby && rowData[this.groupby] !== currentGroup) {
                currentGroup = rowData[this.groupby];
                this.renderGroupHeader(tbody, currentGroup);
            }

            this.renderRow(tbody, rowData, currentGroup);
        });

        table.appendChild(tbody);
    }

    renderGroupHeader(tbody, group) {
        const groupHeaderRow = document.createElement('tr');
        groupHeaderRow.classList.add('group-header');
        groupHeaderRow.innerHTML = `<td colspan="${this.columns.length}">${group}</td>`;
        groupHeaderRow.addEventListener('click', () => this.toggleGroup(group));

        tbody.appendChild(groupHeaderRow);
    }

    renderRow(tbody, rowData, group) {
        const row = document.createElement('tr');
        row.classList.add(`group-data-${group.replaceAll(' ', '-')}`, 'hidden');

        this.columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = rowData[column.field];
            row.appendChild(td);
        });

        tbody.appendChild(row);
    }

    toggleGroup(group) {
        const groupDataRows = document.querySelectorAll(`.group-data-${group.replaceAll(' ', '-')}`);
        
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
