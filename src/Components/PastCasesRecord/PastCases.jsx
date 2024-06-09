import React, { useEffect, useMemo, useState } from 'react'
import Cases from './Cases'
import {tableData} from "./Data"

const PastCases = () => {
    const[selectData, setSelectData]=useState(tableData);
    const [startDate, setStartDate]=useState();
    const [endDate, setEndDate]=useState();

    
    function getDateFilterData(){
        if(!startDate && !endDate){
            return selectData;
        }
        if(startDate && endDate){
            // console.log(startDate);
            return selectData.filter((data)=>(Date.parse(data.date)>=Date.parse(startDate) && Date.parse(data.date)<=Date.parse(endDate)));
        }
        if(startDate){
            // console.log(startDate);
            // console.log(typeof(startDate));
            // console.log("printing",selectData);
            
            // console.log("printing date", Date.parse(startDate));
            
            // console.log("hii",Date.parse(JSON.stringify(selectData[0].date)));
            // console.log("type1",typeof(Date.parse(JSON.stringify(selectData[0].date))));
            // console.log("hiie",JSON.stringify(selectData[0].date));
            // console.log("type2",typeof(JSON.stringify(selectData[0].date)));
            // console.log("hiiee",selectData[0].date);
            // console.log("type3",typeof(selectData[0].date));
            
            // selectData.map((data)=>{
            //     console.log(data.date);
            //     console.log("bool",Date.parse(data.date)>=Date.parse(startDate));
            // })
            
            return selectData.filter((data)=>(
                    Date.parse(data.date)>=Date.parse(startDate)))
        }
        if(endDate){
            // console.log(endDate);
            
            return selectData.filter((data)=>Date.parse(data.date)<=Date.parse(endDate));
        }
                
    }
            
    const finalData=useMemo(getDateFilterData, [selectData, startDate, endDate]);
    // console.log("hello",finalData);
    
    useEffect(()=>{
        // console.log("Printing data1", selectData);
        setSelectData(tableData);
    }, []);

    function handleStartDate(event){
        setStartDate(event.target.value);
        // console.log("sd:",startDate);
    }
    function handleEndDate(event){
        setEndDate(event.target.value);
        // console.log("ed",endDate);
    }

  return (
    <div className="w-11/12 mx-auto mt-8 flex flex-col items-center justify-center">
        <div>
            <div className='flex justify-between'>
                <div>
                    <p className='text-2xl font-bold'>Past Cases</p>
                </div>
                <div className='flex items-center gap-x-3'>
                    <form className='flex gap-x-5'>
                        <div className='flex items-center gap-x-2'>
                            <label htmlFor='from' className='font-semibold'>From</label>
                            <input 
                                id='from'
                                type='date'
                                onChange={handleStartDate}
                                className="border rounded-md px-2 border-sky-300 bg-sky-100"
                            />
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <label htmlFor='from' className='font-semibold'>To</label>
                            <input 
                                id='to'
                                type='date'
                                onChange={handleEndDate}
                                className="border rounded-md px-2 border-sky-300 bg-sky-100"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Cases finalData={finalData}/>
        </div>
    </div>
  )
}

export default PastCases
