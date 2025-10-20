import axios, { AxiosError } from 'axios';
import { CustomButton, CustomInput, DataTable } from '../components';
import { useEffect, useState } from 'react';
import type { TableRow } from '../components/DataTable/DataTable';
import { useAuth } from '../context';

interface ApiResponse {
    success: boolean;
    data: TableRow[];
}
const API_URL = 'http://localhost:5000';

const AdminPage = () => {
    const [tableData, setDataTable] = useState<TableRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<keyof TableRow>('created_at');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [search, setSearch] = useState('');
    const [searchError, setSearchError] = useState('');

    const { user, pass } = useAuth();

    const fetchData = async (
        sortKey: keyof TableRow,
        sortOrder: 'asc' | 'desc' = 'asc',
        searchTerm: string = ''
    ) => {
        if (!user || !pass) return;

        setLoading(true);
        const authHeader = 'Basic ' + btoa(`${user}:${pass}`);

        try {
            const query = new URLSearchParams();
            if (sortKey) {
                query.append('sortBy', sortKey);
                query.append('order', sortOrder);
            }
            if (searchTerm) query.append('search', searchTerm);

            const response = await axios.get<ApiResponse>(`${API_URL}/forms-data?${query.toString()}`, {
                headers: { Authorization: authHeader },
            });

            if (response.data.success) {
                setDataTable(response.data.data);
            } else {
                setError('Failed to fetch users');
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key: keyof TableRow) => {
        const newOrder = sortBy === key && order === 'asc' ? 'desc' : 'asc';
        setSortBy(key);
        setOrder(newOrder);
    };

    const handleSearchClick = () => {
        if (search && search.length < 3) {
            setSearchError('Search term must be at least 3 characters.');
            return;
        }
        setSearchError('');
        fetchData(sortBy, order, search);
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    useEffect(() => {
        if (!user || !pass) {
            setError('Not authenticated');
            setLoading(false);
            return;
        }
        fetchData(sortBy, order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, pass, sortBy, order]);


    if (loading) return (
        <div className='p-4 flex justify-center mx-auto text-lg'>
            <div role='status'>
                <svg aria-hidden='true' className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                    <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
                </svg>
                <span className='sr-only text-black'>Loading...</span>
            </div>
        </div>
    );
    if (error) return <div className='p-4 text-red-500 flex justify-center w-1/2 border-3 border-red-500 mx-auto text-lg rounded-3 bg-red-100'>{`${error}. Check db connection`}</div>;

    return (
        <div>
            <h1 className='text-2xl font-bold p-4 text-center mb-5'>Information for all Quotes</h1>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex gap-3 pl-5 flex-3'>
                    <CustomButton
                        buttonType={sortBy === 'name' ? 'small' : 'smallWhite'}
                        label={`By Name ${order === 'asc' ? '↑' : '↓'}`}
                        onClick={() => handleSort('name')} />
                    <CustomButton
                        buttonType={sortBy === 'company' ? 'small' : 'smallWhite'}
                        label={`By Company ${order === 'asc' ? '↑' : '↓'}`}
                        onClick={() => handleSort('company')} />
                    <CustomButton
                        buttonType={sortBy === 'created_at' ? 'small' : 'smallWhite'}
                        label={`By Name ${order === 'asc' ? '↑' : '↓'}`}
                        onClick={() => handleSort('created_at')}
                    />
                </div>
                <div className='flex-1 mt-5 mx-5 md:mt-0 md:mx-0 flex relative'>
                    <CustomInput
                        type='text'
                        name='search'
                        placeholder='Search by name or email...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearchKeyPress}
                        errorMessage={searchError}
                        classes='p-3'
                    />
                    <svg
                        onClick={handleSearchClick}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='hover:cursor-pointer size-6 absolute top-[15px] right-[20px]'
                    >
                        <path stroke-linecap='round' stroke-linejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
                    </svg>
                </div>
            </div>
            <DataTable data={tableData} />

            {loading && (
                <div className='p-4 flex justify-center mx-auto text-lg'>
                    <div role='status'>
                        <svg aria-hidden='true' className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                            <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
                        </svg>
                        <span className='sr-only text-black'>Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
