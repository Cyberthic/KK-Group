import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';

const employees = [
  {
    id: '#ZY9653',
    name: 'Arlene McCoy',
    role: 'UX Engineer',
    contract: 'Full Time',
    team: 'Team Alpha',
    workspace: 'Remote',
    status: 'Active',
    attendance: 83,
  },
  {
    id: '#ZY9652',
    name: 'Darlene Robertson',
    role: 'Sales Manager',
    contract: 'Part-time',
    team: 'Team Phinix',
    workspace: 'On-site',
    status: 'Active',
    attendance: 96,
  },
];

export function EmployeesTable() {
  return (
    <div className="bg-[#14151A] rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-800/50">
        <h3 className="font-bold text-gray-200 text-lg">Employees</h3>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-800 bg-[#1A1C23] rounded-lg text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors">
          All employee
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-500 bg-[#14151A] border-b border-gray-800/50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">ID</th>
              <th scope="col" className="px-6 py-4 font-medium">Employee Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Role</th>
              <th scope="col" className="px-6 py-4 font-medium">Contract</th>
              <th scope="col" className="px-6 py-4 font-medium">Team</th>
              <th scope="col" className="px-6 py-4 font-medium">Workspace</th>
              <th scope="col" className="px-6 py-4 font-medium text-center">Status</th>
              <th scope="col" className="px-6 py-4 font-medium">Attendance Rate</th>
              <th scope="col" className="px-6 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="bg-[#14151A] hover:bg-[#1A1C23] transition-colors border-b border-gray-800/30 last:border-0">
                <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">{emp.id}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
                       {emp.name.charAt(0)}
                     </div>
                     <span className="font-medium text-gray-200">{emp.name}</span>
                   </div>
                </td>
                <td className="px-6 py-4">{emp.role}</td>
                <td className="px-6 py-4">{emp.contract}</td>
                <td className="px-6 py-4">{emp.team}</td>
                <td className="px-6 py-4">{emp.workspace}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${emp.status === 'Active' ? 'bg-[#7B4DFF]' : 'bg-gray-500'}`}></div>
                    <span className="text-gray-300">{emp.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                     <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#7B4DFF] rounded-full" 
                          style={{ width: `${emp.attendance}%` }}
                        ></div>
                     </div>
                     <span className="text-gray-300 text-xs">{emp.attendance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-gray-500">
                   <button className="hover:text-gray-300"><MoreHorizontal className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
