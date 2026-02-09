$(document).ready(() => {
    console.log('ready')
});

getAllExpenses = () => {
    // const d = new Date();
    
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: `/expenses/all`,
        success: function (d) {
            const data = d.data[0];
            
            $('#root').html(`
                <h2>Found ${data.length} Items</h2>
                <table width=100% class="table table-striped table-dark">
                <thead><th>#</th><th>ID</th><th>Vendor</th><th>Description</th><th>Quantity</th><th>Price</th><th>Total</th><th>Category</th><th>Item #</th></thead>
                <tbody id=expenseTableBody>`);
            let count = 0;
            Object.keys(data).forEach((k, v) => {
                const d = data[k]
                
                if(d){
                    $('#expenseTableBody').append(
                        `<tr>
                    <td>${++count}</td>
                    <td>${d.id}</td>
                    <td>${d.vendor}</td>
                    <td>${d.description}</td>
                    <td>${d.quantity}</td>
                    <td>$${d.price}</td>
                    <td>$${(d.price*d.quantity).toFixed(2)}</td>
                    <td>${d.category}</td>
                    <td>${d.itemNum}</td>
                </tr>`
                    );
                }
                
                
            })
                $('#allProductBody').append(
                `</tbody>
                </table>`)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 0)
                window.location.replace(global_site_redirect);
            $("#bsNetworkStatus").html(jqXHR);
        }
    });
    // console.log(data);
}

getCategorySummary = () => {
    // const d = new Date();
    let totalCost = 0;
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: `/expenses/categorySummary`,
        success: function (d) {
            const data = d.data[0];
        
            $('#root').html(`
                <h2>Found ${data.length} Items</h2>
                <table width=100% class="table table-striped table-dark">
                <thead><th>#</th><th>Category</th><th>Count</th><th>Total Cost</th><th>Total Count</th><th>Avg Price Per Item</th></thead>
                <tbody id=expenseTableBody>`);
            let count = 0;
            Object.keys(data).forEach((k, v) => {
                const d = data[k]
                
                if(d){
                    totalCost += d.totalCost;
                    $('#expenseTableBody').append(
                        `<tr>
                    <td>${++count}</td>
                    <td>${d.category}</td>
                    <td>${d.count}</td>
                    <td>$${d.totalCost.toFixed(2)}</td>
                    <td>${d.totalCount}</td>
                    <td>$${d.avgPerItem.toFixed(2)}</td>
                </tr>`
                    );
                }
                
                
            })
                $('#allProductBody').append(
                `</tbody>
                </table>
                `);
                $('#root').append(
                `<h2>Total Cost: $${totalCost.toFixed(2)}</h2>`);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 0)
                window.location.replace(global_site_redirect);
            $("#bsNetworkStatus").html(jqXHR);
        }
    });
    // console.log(data);
}

clearReceiptForm = () => {
    $('#receiptVendor').val('');
    $('#receiptPurchaseDate').val('');
    $('#receiptTotal').val('');
    $('#receiptOrderNumber').val('');
    $('#receiptNotes').val('');
    $('#receiptProjectId').val('');
}

saveReceipt = () => {
    const data = {
        "vendor": $('#receiptVendor').val(),
        "purchaseDate": $('#receiptPurchaseDate').val(),
        "total": $('#receiptTotal').val(),
        "projectId": $('#receiptProjectId').val(),
        "orderNum": $('#receiptOrderNum').val(),
        "notes": $('#receiptNotes').val()
    }
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        url: `/expenses/receipts`,
        success: function (d) {
            console.log('added receipt...')
            console.log(d)
            $('#receiptId').val(d.id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.readyState == 0)
                window.location.replace(global_site_redirect);
            $("#bsNetworkStatus").html(jqXHR);
        }
    });
}

truncateString = (str, maxLength=20) => {
    if (str && str.length > maxLength) {
        // If the string is longer than maxLength, truncate and add ellipsis
        return str.slice(0, maxLength - 3) + '...';
    } else {
        // Otherwise, return the original string
        return str;
    }
}
