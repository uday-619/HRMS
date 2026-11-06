

import {
  DashboardOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  AssignmentOutlined,
  ConfirmationNumberOutlined,
  PeopleOutlined,
  BadgeOutlined,
  AccessTimeOutlined,
  EventNoteOutlined,
  AccountBalanceWalletOutlined,
  TrendingUpOutlined,
  AssessmentOutlined,
  AttachMoneyOutlined,
  ExitToAppOutlined,
  CardGiftcardOutlined
  
} from '@mui/icons-material';
import { VscDashboard } from "react-icons/vsc";
import { PiShareNetworkThin } from "react-icons/pi";
import { PiUserRectangleLight } from "react-icons/pi";
import { VscOutput } from "react-icons/vsc";
import { BsPass } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { CiPen } from "react-icons/ci";
import { CiMemoPad } from "react-icons/ci";
import { BsGraphUp } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoExitOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { CiViewTimeline } from "react-icons/ci";
import { CiAlignBottom } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";

// const Menuitems = [
//   {
//     icon: DashboardOutlined,
//     label: "Dashboard",
//     href: "/dashboard",
//   },
import DashboardIcon from "@mui/icons-material/Dashboard";

const Menuitems = [
  {
    icon:  VscDashboard ,
    label: "Dashboard",
    href: "/dashboard",
  },

   {
    icon:  PiShareNetworkThin  ,
    label: "Branch",
    href: "/branch"
  },
  {
    icon: PiUserRectangleLight,
    label: "Recruitment",
    href: "/recruitment/job-posting",
    item: [
      {
        label: "Job Posting",
        href: "/recruitment/job-posting"
      },
      {
        label:"Application  Resume Management",
        href:"/recruitment/application-resume-management",
      },
      {
        label: "Job Onboarding",
        href: '/recruitment/job-onboarding'
      },
      {
        label: "Offer Letter",
        href: '/recruitment/offer-letter'
      }
    ]
  },

{
    icon: CiUser,
    label: "Employee",
    href: "/employee",
    item: [
      {
        label: "Employee Profile",
        href: "/employee"
      },
      {
        label: "Roles & Permissions",
        href: "/employee/roles-permisssions"
      },
     
    ]
  },


  {
    icon: CiPen,
    label: "Attendance",
    href: "/attendance/punch",
    item: [
      {
        label: "PunchIn/PunchOut",
        href: "/attendance/punch"
      },
      {
        label: "Daily Logs",
        href: "/attendance/daily-logs"
      },
      {
        label: "Attendance Request",
        href: "/attendance/attendance-request"
      },
      {
        label: "Attendance Details",
        href: "/attendance/details"
      },
      {
        label: "Summary",
        href: "/attendance/summary"
      }
     ]
  },
  

  {
    icon: CiMemoPad,
    label: "Leave",
    href: "/leave/leave-status",
    item: [
      {
        label: "Leave Request",
        href: "/leave/leave-request"
      },
      {
        label: "Leave Status",
        href: "/leave/leave-status"
      },
    
      {
        label: "Holiday",
        href: "/leave/holiday"
      }
     ]
  },

  {
    icon: BsGraphUp ,
    label: "Performance",
    href: "/performance"
  },
  {
    icon: CiAlignBottom,
    label: "Report Analytics",
    href: "/report/employee",
    item: [
      {
        label: "Employee Report",
        href: "/report/employee"
      },
      {
        label: "Income Report",
        href: "/report/income"
      },
      {
        label: "Expense Report",
        href: "/report/expense"
      },
      {
        label: "Staff Report",
        href: "/report/staff"
      }
     ]
  },
{
    icon: CiWallet,
    label: "Payroll",
    href: "/payroll/payslip-list",
    item: [
      {
        label: "Payslip List",
        href: "/payroll/payslip-list"
      },
      {
        label: "Create Payroll",
        href: "/payroll/create-payroll"
      },
      {
        label: "Expense",
        href: "/payroll/expense"
      }
     ]
  },


  {
    icon: VscOutput,
    label: "Task",
    href: "/task/assign-task",
    item: [
      {
        label: "Assign Task",
        href: "/task/assign-task"
      },
      {
        label: "To Do List",
        href: "/task/to-do-task"
      }
    ]
  },

  {
    icon:  CiViewTimeline,
    label: "Learning & Development ",
    href: "/learning-development",
    item: [
      {
        label: "Training Management",
        href: "/learning_development/trainingDevelopment"
      },
      {
        label: "Course Enrollment",
        href: "/learning_development/Course-Enrollment"
      },
      {
        label: "Certification",
        href: "/learning_development/CourseCertification"
      }
     ]
  },
  
  
  {
    icon: BsPass,
    label: "Ticket",
    href: "/ticket/allTickets", 
    item: [
      {
        label: "All Tickets",
        href: "/ticket/allTickets"
      }
    ]
  },
 
  {
    icon: GiTakeMyMoney,
    label: "Finance",
    href: "/finance",
    item: [
      {
        label: "Income",
        href: "/finance/income"
      },
      {
        label: "Expense",
        href: "/finance/expense"
      }
     ]
  },

  {
    icon: CiTrophy,
    label: "Rewards",
    href: "/rewards"
  },

  {
    icon: IoExitOutline,
    label: "Exit",
    href: "/exit"
  },
  
];

export default Menuitems;