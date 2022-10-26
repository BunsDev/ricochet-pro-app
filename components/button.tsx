import { NextPage } from 'next';

interface Props {
	action?: string;
	address?: string;
}

export const RoundedButton: NextPage<Props> = ({ action }) => {
	return (
		<button type='button' className='btn-rounded'>
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
				<path d='M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z' />
			</svg>
			<span>{action}</span>
		</button>
	);
};

export const AddressButton: NextPage<Props> = ({ address }) => {
	return (
		<button type='button' className='btn-address'>
			<span>{address}</span>
		</button>
	);
};
