.list-view .container {
    display: grid;
    grid-template-columns: 1fr;
}

.list-view .container section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.list-view .container section h2,
.list-view .container section p {
    text-align: left;
}

.list-view .container .contact {
    flex-direction: row;
    align-items: flex-start;
}

.list-view .container .contact img {
    margin-right: 1rem;
}

/* List View Table */
.list-view .container {
    display: block;
    width: 100%;
    overflow-x: auto;
}

.list-view .table-view {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.list-view .table-view th, 
.list-view .table-view td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

.list-view .table-view th {
    background-color: #323f77;
    color: white;
    font-weight: bold;
}

.list-view .table-view td a {
    color: #004080;
    text-decoration: none;
    font-weight: bold;
}

.list-view .table-view td a:hover {
    text-decoration: underline;
}

/* Membership Level Styles */
.list-view .table-view .member-level-1 {
    background-color: #f0f0f0;
}

.list-view .table-view .member-level-2 {
    background-color: silver;
    color: black;
}

.list-view .table-view .member-level-3 {
    background-color: gold;
    color: black;
    font-weight: bold;
}