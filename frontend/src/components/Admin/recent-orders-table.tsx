import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const orders = [
  {
    id: '#878909',
    date: '2 Dec 2026',
    customer: 'Oliver John Brown',
    category: 'Shoes, Shirt',
    status: 'Pending',
    items: '2 Items',
    total: '$789.00',
  },
  {
    id: '#878909',
    date: '1 Dec 2026',
    customer: 'Noah James Smith',
    category: 'Sneakers, T-shirt',
    status: 'Completed',
    items: '3 Items',
    total: '$967.00',
  },
];

export function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-lg">Recent orders</h3>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Sort by
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-white">
            <tr>
              <th scope="col" className="p-4 rounded-tl-2xl">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#FF5A36] bg-gray-100 border-gray-300 rounded focus:ring-[#FF5A36]"
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium">Order Id</th>
              <th scope="col" className="px-6 py-4 font-medium">Date</th>
              <th scope="col" className="px-6 py-4 font-medium">Customer</th>
              <th scope="col" className="px-6 py-4 font-medium">Category</th>
              <th scope="col" className="px-6 py-4 font-medium text-center">Status</th>
              <th scope="col" className="px-6 py-4 font-medium">Items</th>
              <th scope="col" className="px-6 py-4 font-medium rounded-tr-2xl">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#FF5A36] bg-gray-100 border-gray-300 rounded focus:ring-[#FF5A36]"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{order.customer}</td>
                <td className="px-6 py-4">{order.category}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Completed'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{order.items}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
