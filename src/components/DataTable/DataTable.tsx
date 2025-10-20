import { memo } from 'react';

export interface TableRow {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    company: string;
    choices: string;
    other?: string;
    budget: string;
    created_at: string;
}

export interface DataTableProps {
    data: TableRow[];
}

const DataTable = ({ data }: DataTableProps) => {
    return (
        <div className='p-4'>
            <div className='hidden md:block overflow-x-auto'>
                <table className='min-w-full border border-gray-200 divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Name</th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Email</th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Phone</th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Company</th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Choices</th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Other</th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Budget</th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Created At</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {data.map((el: TableRow) => (
                            <tr key={el.id} className='hover:bg-gray-50'>
                                <td className='px-4 py-2 text-sm text-gray-700'>{el.name}</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>{el.email}</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>{el.phoneNumber}</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>{el.company}</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>{el.choices}</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>{el?.other || '-'}</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>{el.budget}</td>
                                <td className='px-4 py-2 text-sm text-gray-700'>{new Date(el.created_at).toISOString().split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='md:hidden space-y-4'>
                {data.map((el: TableRow) => (
                    <div key={el.id} className='border border-gray-200 rounded-lg p-4 bg-white shadow-sm'>
                        <p><span className='font-semibold'>Name:</span> {el.name}</p>
                        <p><span className='font-semibold'>Email:</span> {el.email}</p>
                        <p><span className='font-semibold'>Phone:</span> {el.phoneNumber}</p>
                        <p><span className='font-semibold'>Company:</span> {el.company}</p>
                        <p><span className='font-semibold'>Choices:</span> {el.choices}</p>
                        <p><span className='font-semibold'>Other:</span> {el?.other || '-'}</p>
                        <p><span className='font-semibold'>Budget:</span> {el.budget}</p>
                        <p><span className='font-semibold'>Budget:</span> {new Date(el.created_at).toISOString().split('T')[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default memo(DataTable);