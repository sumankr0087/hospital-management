import { Link } from "react-router-dom"
import { Heart, Users, Calendar, FileText, ArrowRight, CheckCircle, Clock, Shield, Activity } from "lucide-react"

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records and history tracking",
      color: "bg-blue-500",
    },
    {
      icon: Heart,
      title: "Doctor Management",
      description: "Complete doctor profiles and specializations",
      color: "bg-pink-500",
    },
    {
      icon: Calendar,
      title: "Appointments",
      description: "Easy scheduling and appointment management",
      color: "bg-purple-500",
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Secure digital medical records system",
      color: "bg-green-500",
    },
  ]

  const benefits = [
    { icon: Clock, text: "24/7 Access to Records" },
    { icon: Shield, text: "Secure & Private" },
    { icon: Activity, text: "Real-time Updates" },
    { icon: CheckCircle, text: "Easy to Use" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                H+
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hospital Management
              </span>
            </div>

            <div className="flex gap-3">
              <Link to="/login" className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern Hospital Management
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your healthcare operations with our comprehensive hospital management system. Manage patients,
            doctors, appointments, and medical records all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-all shadow-lg border-2 border-gray-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:scale-105"
              >
                <div
                  className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our System?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-4">
                    <Icon size={32} />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{benefit.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of healthcare facilities using our platform</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-xl font-bold transition-all shadow-xl text-lg"
          >
            Create Free Account
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">© 2026 Hospital Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
