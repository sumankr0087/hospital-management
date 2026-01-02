"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Users, UserCog, Calendar, FileText, TrendingUp, Activity, Plus } from "lucide-react"

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    {
      label: "Total Patients",
      value: "248",
      icon: Users,
      color: "bg-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      link: "/patients",
    },
    {
      label: "Total Doctors",
      value: "32",
      icon: UserCog,
      color: "bg-purple-600",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50",
      link: "/doctors",
    },
    {
      label: "Appointments Today",
      value: "18",
      icon: Calendar,
      color: "bg-pink-600",
      textColor: "text-pink-600",
      bgLight: "bg-pink-50",
      link: "/appointments",
    },
    {
      label: "Medical Records",
      value: "1,432",
      icon: FileText,
      color: "bg-green-600",
      textColor: "text-green-600",
      bgLight: "bg-green-50",
      link: "/medical-records",
    },
  ]

  const recentActivities = [
    { type: "Patient", name: "John Smith", action: "New patient registered", time: "10 mins ago", icon: Users },
    {
      type: "Appointment",
      name: "Dr. Sarah Johnson",
      action: "Appointment scheduled",
      time: "25 mins ago",
      icon: Calendar,
    },
    { type: "Record", name: "Emma Wilson", action: "Medical record updated", time: "1 hour ago", icon: FileText },
    { type: "Doctor", name: "Dr. Michael Brown", action: "Doctor profile updated", time: "2 hours ago", icon: UserCog },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        </div>
        <p className="text-white/90">Here's what's happening with your hospital today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/patients"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="text-lg font-bold mb-1">Add New Patient</h3>
            <p className="text-blue-100 text-sm">Register a new patient to the system</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
        </Link>

        <Link
          to="/doctors"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="text-lg font-bold mb-1">Add New Doctor</h3>
            <p className="text-purple-100 text-sm">Add a new doctor to your team</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgLight} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
