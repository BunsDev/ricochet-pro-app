import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import usePagination from '@richochet/hooks/usePagination';
import { combineClasses, formatCurrency } from '@richochet/utils/helperFunctions';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { TokenData } from '../balances';
import { CoinChange, DataType } from '../coins/coin-change';
import { MarketData } from '../markets';
import { PositionData } from '../positions';
import { TableLoader } from './table-loader';

interface Props {
	headers: string[];
	rowData: PositionData[] | MarketData[] | TokenData[];
	selectable?: boolean;
	tableLoaderRows: number;
	selectData?: Function;
}

const isPositionData = (data: PositionData | MarketData | TokenData): data is PositionData =>
	!!(data as PositionData).positions || (data as PositionData).positions === 0;
const isMarketData = (data: PositionData | MarketData | TokenData): data is MarketData =>
	!!(data as MarketData).posAmt || (data as MarketData).posAmt === 0;
const isTokenData = (data: PositionData | MarketData | TokenData): data is TokenData => !!(data as TokenData).token;

export const DataTable: NextPage<Props> = ({
	headers,
	rowData,
	selectable,
	selectData,
	tableLoaderRows,
}): JSX.Element => {
	const { t } = useTranslation('home');
	const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, gaps, setPage, totalPages } = usePagination({
		contentPerPage: 6,
		count: rowData.length,
	});
	return (
		<>
			<div className='overflow-auto'>
				{rowData.length === 0 && <TableLoader headers={headers} rowNumber={tableLoaderRows} />}
				{rowData.length > 0 && (
					<table className='table-fixed min-w-full'>
						<thead>
							<tr>
								{headers.map((title, index) => (
									<th scope='col' key={index} className='font-normal text-slate-400 px-6 py-4 text-start'>
										{t(`${title.toLocaleLowerCase().replace(/\s/g, '-')}`)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rowData.slice(firstContentIndex, lastContentIndex).map((data, index) => (
								<tr
									key={index}
									className={combineClasses(
										selectable ? 'cursor-pointer' : 'cursor-auto',
										'text-slate-200 border-b border-slate-600'
									)}
									onClick={() => (selectable && isPositionData(data) ? selectData?.(data) : null)}>
									{isPositionData(data) ? (
										<>
											<td className='px-2 py-4 whitespace-nowrap'>
												<div className='inline-flex items-center gap-2'>
													<CoinChange coinA={data.coinA} coinB={data.coinB} type={DataType.Position} />
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>{data.positions}</td>
											<td className='px-6 py-4 whitespace-nowrap'>{data.feePercent}</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<p>
													{data.input.toFixed(3)} {data.coinA}x
												</p>
												<p>({formatCurrency(parseFloat(data.streamedUsdValue))})</p>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<p>
													{parseFloat(data.output).toFixed(3)} {data.coinA}x
												</p>
												<p>({formatCurrency(parseFloat(data.rateUsdValue))})</p>
											</td>
										</>
									) : isMarketData(data) ? (
										<>
											<td className='px-2 py-4 whitespace-nowrap'>
												<div className='inline-flex items-center gap-2'>
													<CoinChange coinA={data.coinA} coinB={data.coinB} type={DataType.Market} />
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>{data.feePercent}</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<p>
													{data.total} {data.coinA}x
												</p>
												<p>({formatCurrency(parseFloat(data.usdValue))})</p>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>{data.posAmt}</td>
										</>
									) : isTokenData(data) ? (
										<>
											<td className='flex items-center px-2 py-4 whitespace-nowrap space-x-2'>
												<CoinChange token={data.token} type={DataType.Balances} />
											</td>
											{/* <td className='px-6 py-4 whitespace-nowrap'>{data.walletAmount}</td> */}
											<td className='px-6 py-4 whitespace-nowrap'>{data.ricAmount}</td>
											<td className='px-6 py-4 whitespace-nowrap'>{formatCurrency(data.dollarVal)}</td>
										</>
									) : (
										<></>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
			{rowData.length > 0 && (
				<div className='flex justify-end text-slate-500 space-x-2 mt-4'>
					<button
						onClick={prevPage}
						className={`${page !== 1 && 'hover:text-slate-300'} ${page === 1 && 'text-slate-600'}`}
						disabled={page === 1}>
						<ChevronLeftIcon className='h-4 w-4' />
					</button>
					<button onClick={() => setPage(1)} className={`${page === 1 && 'text-slate-100'}`}>
						1
					</button>
					{gaps.before ? '...' : ''}
					{gaps.paginationGroup.map((num) => (
						<button onClick={() => setPage(num)} key={num} className={`${page === num ? 'text-slate-100' : ''}`}>
							{num}
						</button>
					))}
					{gaps.after ? '...' : ''}
					{totalPages > 1 && (
						<button onClick={() => setPage(totalPages)} className={`${page === totalPages && 'text-slate-100'}`}>
							{totalPages}
						</button>
					)}
					<button
						onClick={nextPage}
						className={`${page !== totalPages && 'hover:text-slate-300'} ${page === totalPages && 'text-slate-600'}`}
						disabled={page === totalPages}>
						<ChevronRightIcon className='h-4 w-4' />
					</button>
				</div>
			)}
		</>
	);
};
