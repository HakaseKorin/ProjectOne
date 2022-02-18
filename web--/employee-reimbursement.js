const URL = "http://34.67.71.40:7000";

let reimbursementTable = document.getElementById('reimbursement-table');
let uid = window.sessionStorage.getItem("id");

(async () => {
    fetch(`${URL}/reimbursement/${uid}`)
    .then(request => request.json())
    .then(data =>{
        console.log(data);
        appendTable(data);
    })
    .catch((error)=>{
        console.error('Error: ',error);
    })
})();

function getDateTime(timestamp){
    if(timestamp === null){
        return "PENDING";
    }
    var dateTime = new Date(timestamp)
    return dateTime.toLocaleString('en-GB',{timeZone: 'UTC'});
}

function getStatus(statusId){
    switch(statusId){
        case 1: return "PENDING";
        case 2: return "ACCEPTED";
        case 3: return "REJECTED";
        default: break;
    }
}

function getType(typeId){
    switch(typeId){
        case 1: return "LODGING";
        case 2: return "FOOD";
        case 3: return "TRAVEL";
        case 4: return "OTHER";
        default: break;
    }
}

let arrPending = document.getElementById('view-pending');
arrPending.addEventListener('click',viewPending);

function viewPending(){
    //hide all rows that contain a pending
    var rows, x, pending;
    pending = document.createElement('td');
    pending.innerHTML = 'PENDING';
    console.log(pending);
    rows = reimbursementTable.rows;
    console.log(rows);
    for(i=1;i<(rows.length);i++){
        x = rows[i].getElementsByTagName("TD")[7];
        console.log(x);
        if(x == 'PENDING'){
            reimbursementTable.rows[i].style.display = 'table-row';
        }else{
            reimbursementTable.rows[i].style.display = 'none';

        }
    }
}

function viewResolved(){
    //hide all rows that dont contain pending
}

function appendTable(results){
    for(var result of results){

        var row = reimbursementTable.insertRow();

        var typeCell = row.insertCell();
        var submitCell = row.insertCell();
        var resolvedCell = row.insertCell();
        var descCell = row.insertCell();
        var amountCell = row.insertCell();
        var authorCell = row.insertCell();
        var reviewerCell = row.insertCell();
        var statusCell = row.insertCell();
    
        typeCell.innerHTML = `${getType(result.typeId)}`;
        submitCell.innerHTML = `${getDateTime(result.submitted)}`;
        resolvedCell.innerHTML = `${getDateTime(result.resolved)}`;
        descCell.innerHTML = result.description;
        amountCell.innerHTML = result.amount;

        authorCell = addUser(authorCell, result.author);
        reviewerCell = addUser(reviewerCell, result.resolver);

        statusCell.innerHTML = `${getStatus(result.statusId)}`;

        function addUser(cell, id){
            if(id === 0){
                cell.innerHTML = "PENDING"
                return cell;
            }
            fetch(`${URL}/ers_user/${id}`)
            .then(result => result.json())
            .then(data => {
                cell.innerHTML = data.lastName;
                return cell;
            })
            .catch((error)=>{
                console.error('Error: ',error);
            })
        }
    }
}