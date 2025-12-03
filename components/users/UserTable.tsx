import { User } from '@/src/schemas'
import Link from 'next/link'
import React from 'react'
import DeleteUserForm from './DeleteUserForm'
import { RiEditBoxFill } from 'react-icons/ri'

export default function UserTable({ users }: { users: User[] }) {
	const filteredUsers = users.filter((user) => user.role !== '')

	return (
		<div className='px-4 sm:px-6 lg:px-8 mt-10'>
			<div className='mt-8 flow-root '>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 '>
						<table className='min-w-full divide-y divide-gray-300 '>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
									>
										Nombre
									</th>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
									>
										Email
									</th>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
									>
										Rol
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-0'
									>
										<span className='sr-only'>Acciones</span>
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200'>
								{filteredUsers.map((user) => (
									<tr key={user.id}>
										<td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
											{user.name}
										</td>
										<td className='px-3 py-4 text-sm text-gray-500'>
											{user.email}
										</td>
										<td className='px-3 py-4 text-sm text-gray-500'>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													user.role === 'user'
														? 'bg-green-100 text-green-800'
														: 'bg-blue-100 text-blue-800'
												}`}
											>
												{user.role}
											</span>
										</td>
										<td className='relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 '>
											<div className='flex gap-5 justify-end items-center'>
												<Link
													className='text-indigo-600 hover:text-indigo-800'
													href={`/admin/users/${user.id}/edit`}
													title='Editar'
												>
													<RiEditBoxFill size={18} />
												</Link>
												{user.role !== 'admin' && <DeleteUserForm userId={user.id} />}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
