import React, { useEffect, useMemo, useState } from "react";
import {tableData} from "./Data"
import {CgArrowsExpandRightAlt} from "react-icons/cg"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {ImLink} from "react-icons/im"


export default function Cases(props) {
    const Data=props.finalData;
    // console.log("got data",Data);
    const result=Data.map((data)=>data.type);
    console.log("printing result", result);
    const dropDownType=result.filter((data, index)=>result.indexOf(data)===index);
    console.log(dropDownType);

    const [selectData, setSelectData] = useState([]);

    const [selectType, setSelectedType] = useState();
    const [selectStatus, setSelectedStatus] = useState();

    useEffect(() => {
        setSelectData(Data);
    }, [Data]);

    function getFilterData() {
        if (!selectType && !selectStatus) {
            return selectData;
        }
        if(selectStatus && selectType){
            return selectData.filter((data)=>(data?.type===selectType && data?.status===selectStatus));
        }
        if(selectStatus){
            return selectData.filter((data)=>data?.status===selectStatus);
        }
        if(selectType){
            return selectData.filter((data)=>data?.type===selectType);
        }
    }

    var finalFilteredData= useMemo(getFilterData, [selectData, selectStatus, selectType]);
    // console.log("sending data", finalFilteredData);

    function handleType(event) {
        setSelectedType(event.target.value);
    }
    function handleStatus(event) {
        setSelectedStatus(event.target.value);
    }

    return (
        <div className="border p-5 shadow-lg flex flex-col mt-4 rounded-lg gap-y-3">
            <div className="flex justify-between">
                <div className="flex items-center gap-x-4">
                    <label htmlFor="apply-filter" className="font-semibold">Apply Filters:</label>
                    <select
                        name="type"
                        id="apply-filter"
                        onChange={handleType}
                        className="border rounded-md px-2 border-sky-300 bg-sky-100 text-gray-400"
                    >
                        <option value="" disabled selected>Type</option>
                        {
                            dropDownType.map((data, index)=>(
                                <option key={index} value={data}>
                                    {data}
                                </option>
                            ))
                        }
                    </select>
                    <select
                        name="status"
                        id="apply-filter"
                        onChange={handleStatus}
                        className="border rounded-md px-2 border-sky-300 bg-sky-100 text-gray-400"
                    >
                        <option value="" disabled selected>Status</option>
                        <option value={"Active"}>Active</option>
                        <option value={"Solved"}>Solved</option>
                        <option value={"Partial Solved"}>Partial Solved</option>
                    </select>
                </div>
                <div className="flex items-center justify-center gap-x-3">
                    <p className="font-semibold">Expand</p>
                    <CgArrowsExpandRightAlt/>
                </div>
            </div>
            <div className="flex flex-col rounded-md border-2 border-[#4E4E4E99]">
                <Table className='border'>
                    <Thead className='border'>
                        <Tr className='border'>
                            <Th className='p-2 border'>
                                S.N
                            </Th>
                            <Th className='p-2 border'>
                                Case Id
                            </Th>
                            <Th className='p-2 border'>
                                Status
                            </Th>
                            <Th className='p-2'>
                                Type
                            </Th>
                            <Th className='p-2 border'>
                                Investigating Officer
                            </Th>
                            <Th className='p-2 border'>
                                Link
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody className='border'>
                        {
                            finalFilteredData.map((element, index) => (
                                <Tr key={index} className='border'>
                                    <Td className='text-center p-2 border'>
                                        {element?.id}
                                    </Td>
                                    <Td className='text-center p-2 border'>
                                        {element?.caseId}
                                    </Td>
                                    <Td className='text-center p-2 border'>
                                        {element?.status}
                                    </Td>
                                    <Td className='text-center p-2 border'>
                                        {element?.type}
                                    </Td>
                                    <Td className='text-center border'>
                                        {element?.investigatingOfficer}
                                    </Td>
                                    <Td className='p-2 border'>
                                        <div  className='flex justify-center items-start'>
                                            <a href={element?.link}>
                                                <ImLink/>
                                            </a>
                                        </div>
                                    </Td>
                                </Tr>
                                    
                            ))
                        }
                    </Tbody>
                </Table>
            </div>
        </div>
    );
}