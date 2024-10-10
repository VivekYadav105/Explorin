import { useMemo } from 'react';
import {Pie, PieChart, Cell} from 'recharts'
import Wrapper from './wrapper';

const ChartComponent = ()=>{
    const COLORS = ['#0088FE', '#C4000F', '#FFBB28'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill="white" fontSize={10} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
    }

    const data = useMemo(()=>{
        return [
            { name: 'Rejected', value: 30 },
            { name: 'Accepted', value: 20 },
            { name: 'Pending', value: 10 },
          ]
    },[]) 

    return(
        <div className='w-screen sm:w-[300px] md:w-[250px] h-[250px]'>
            <Wrapper header={'Claim Status'}>
                <PieChart width={200} height={175}>
                    <Pie
                    data={data}
                    cx={'50%'}
                    cy={'50%'}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <div className='flex items-center flex-wrap gap-3'>
                    {[
                        {color:"#0088FE",label:"Accepted"},
                        {color:"#C4000F",label:"Rejected"},
                        {color:"#FFBB28",label:"Pending"}
                    ].map((ele,index)=>(
                        <article key={index} className='flex items-center gap-[2px] text-xs'>
                            <span style={{backgroundColor:ele.color}} className={`inline-block w-2 h-2 rounded-full `}></span>
                            <span>{ele.label}</span>
                        </article>
                    ))}
                </div>
            </Wrapper>
        </div>
    )
}

export default ChartComponent