'use client';

import React, { useState } from 'react';
import { Person, Settings, Search, NotificationsNone } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const Header = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname=usePathname();

  const router=useRouter();

  const headerTitle=()=>{
    if(pathname==='/dashboard'){
      return 'Dashboard';
    }
    else if(pathname==='/branch/branch-list'){
      return 'Branch';
    }
    else if(pathname==='/recruitment/job-posting'){
      return 'Job Posting';
    }
    else if(pathname==='/recruitment/job-onboarding'){
      return 'Job Onboarding';
    }
    else if(pathname==='/recruitment/offer-letter'){
      return 'Offer Letter';
    }
    else if(pathname==='/task/assign-task'){
      return 'Assign Task';
    }
    else if(pathname==='/task/to-do-task'){
      return 'To Do Task';
    }
    else if(pathname==='/ticket/allTickets'){
      return 'All Tickets';
    }
    else if(pathname==='/employee'){
      return 'Employee';
    }
      else if(pathname==='/employee/create'){
        return 'Create Employee';
      }
      else if(pathname.startsWith('/employee/edit/')){
        return 'Edit Employee';
      }
      else if(pathname.startsWith('/employee/view/')){
        return 'View Employee';
      }
    else if(pathname==='/exit'){
      return 'Exit';
    }
    else if(pathname==='/staff'){
      return 'Staff';
    }
    else if(pathname==='/staff/create'){
      return 'Create Staff';
    }
    else if(pathname.startsWith('/staff/edit/')){
      return 'Edit Staff';
    }
    else if(pathname.startsWith('/staff/view/')){
      return 'View Staff';
    }
    else if(pathname==='/attendance/punch'){
      return 'Punch In/Punch Out';
    }
    else if(pathname==='/attendance/daily-logs'){
      return 'Daily Logs';
    }
    else if(pathname==='/attendance/attendance-request'){
      return 'Attendance Request';
    }
    else if(pathname==='/attendance/attendance-details'){
      return 'Attendance Details';
    }
    else if(pathname==='/attendance/summary'){
      return 'Summary';
    }
    else if(pathname==='/leave-management/leave-status'){
      return 'Leave Status';
    }
    else if(pathname==='/leave-management/leave-request'){
      return 'Leave Request';
    }
    else if(pathname==='/payroll/payslip-list'){
      return 'Payslip List';
    }
    else if(pathname==='/payroll/create-payroll'){
      return 'Create Payroll';
    }
    else if(pathname==='/payroll/expense'){
      return 'Expense';
    }
    else if(pathname==='/performance'){
      return 'Performance';
    }
    else if(pathname==='/report/employee'){
      return 'Employee Report';
    }
    else if(pathname==='/report/income'){
      return 'Income Report';
    }
    else if(pathname==='/report/expense'){
      return 'Expense Report';
    }
    else if(pathname==='/report/staff'){
      return 'Staff Report';
    }
    else if(pathname==='/finance/income'){
      return 'Income';
    }
    else if(pathname==='/finance/expense'){
      return 'Expense';
    }
    else if(pathname==='/rewards'){
      return 'Rewards';
    }
   }

   const handleLogout=()=>{
     router.push('/login');
   }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{headerTitle()}</h1>
      </div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Search Bar next to PFP */}
        <div className="header-search" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: '6px 12px 6px 34px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              fontSize: '13px',
              outline: 'none',
              width: '180px',
              transition: 'all 0.2s ease',
              color: '#334155'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.width = '210px';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.width = '180px';
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.boxShadow = 'none';
            }}
          />
          <Search sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#94a3b8' }} />
        </div>

        {/* Notification Bell next to PFP */}
        <button
          className="header-icon-btn"
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <NotificationsNone sx={{ fontSize: 20 }} />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '6px',
              height: '6px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '1.5px solid #ffffff'
            }}
          />
        </button>

        {/* PFP (Avatar) */}
        <div
          className="avatar"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          style={{
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(2, 132, 199, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
          }}
        >
          <Person sx={{ fontSize: 18 }} />
          {isProfileOpen && (
            <div className="avatar-dropdown">
              <Button onClick={handleLogout} className="dropdown-item danger">Logout</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

