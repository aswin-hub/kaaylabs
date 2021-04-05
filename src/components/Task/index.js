import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';


function Task() {

    const [value, setValue] = useState([]);
    const [option, setOption] = useState([]);

    useEffect(
        getApiCall,
    []);

    function getOption(data) {
        const unique = {'All':''}
        data.forEach(e => {
            unique[e.status] = e.status
        })
        return Object.keys(unique)
    }
    
    function getApiCall() {
        axios.get('http://timeapi.kaaylabs.com/api/v1/project_view/')
        .then(function (response) {
            setOption(getOption(response.data.data))
            setValue(response.data.data.map(e=>{e.show=true;return e;}))
        })
        .catch(function (err) {
            console.log(err);
        })        
    }

    function changed (event) {
        const val = event.target.value
        setValue(value.map(x => {
        x.show = val === 'All' || x.status == val
        return x
    }))

    }

    return (
        <div>
            <select id="status" onChange={changed}>
            { option.map(y => <option value={y}>{y}</option>) }
            </select>


            <Table striped bordered hover variant="dark">
                        <thead>
                            <th>Company Name</th>
                            <th>Description</th>
                            <th>start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </thead>
            {value.filter(x=>x.show).map((e) => {
                return (
                         <tbody>
                            <tr>
                            <td>{e.company_name}</td>
                            <td>{e.description}</td>
                            <td>{e.start_date}</td>
                            <td>{e.end_date}</td>
                            <td>{e.status}</td>
                            </tr>
                        </tbody>
                    )}                                       
            )}
              </Table>

        </div>
    )
}

export default Task
