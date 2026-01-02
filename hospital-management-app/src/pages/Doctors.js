"use client"

import { useState, useEffect } from "react"

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    consultationFee: "",
    availability: "",
  })

  // Load doctors from localStorage on mount
  useEffect(() => {
    const storedDoctors = localStorage.getItem("doctors")
    if (storedDoctors) {
      setDoctors(JSON.parse(storedDoctors))
    } else {
      // Initialize with dummy data
      const dummyDoctors = [
        {
          id: "1",
          name: "Dr. Sarah Johnson",
          specialization: "Cardiology",
          qualification: "MD, FACC",
          experience: 15,
          phone: "+1 234-567-9001",
          email: "sarah.johnson@hospital.com",
          consultationFee: "150",
          availability: "Mon-Fri: 9AM-5PM",
          joinedDate: "2020-03-15",
        },
        {
          id: "2",
          name: "Dr. Michael Chen",
          specialization: "Neurology",
          qualification: "MD, PhD",
          experience: 12,
          phone: "+1 234-567-9002",
          email: "michael.chen@hospital.com",
          consultationFee: "180",
          availability: "Mon-Sat: 10AM-6PM",
          joinedDate: "2021-06-20",
        },
        {
          id: "3",
          name: "Dr. Emily Davis",
          specialization: "Pediatrics",
          qualification: "MD, FAAP",
          experience: 8,
          phone: "+1 234-567-9003",
          email: "emily.davis@hospital.com",
          consultationFee: "120",
          availability: "Tue-Sat: 8AM-4PM",
          joinedDate: "2022-01-10",
        },
      ]
      setDoctors(dummyDoctors)
      localStorage.setItem("doctors", JSON.stringify(dummyDoctors))
    }
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingDoctor) {
      // Update existing doctor
      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === editingDoctor.id
          ? { ...formData, id: editingDoctor.id, joinedDate: editingDoctor.joinedDate }
          : doctor,
      )
      setDoctors(updatedDoctors)
      localStorage.setItem("doctors", JSON.stringify(updatedDoctors))
    } else {
      // Add new doctor
      const newDoctor = {
        ...formData,
        id: Date.now().toString(),
        joinedDate: new Date().toISOString().split("T")[0],
      }
      const updatedDoctors = [...doctors, newDoctor]
      setDoctors(updatedDoctors)
      localStorage.setItem("doctors", JSON.stringify(updatedDoctors))
    }

    resetForm()
  }

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor)
    setFormData(doctor)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== id)
      setDoctors(updatedDoctors)
      localStorage.setItem("doctors", JSON.stringify(updatedDoctors))
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      qualification: "",
      experience: "",
      phone: "",
      email: "",
      consultationFee: "",
      availability: "",
    })
    setEditingDoctor(null)
    setIsModalOpen(false)
  }

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Doctor Management</h1>
          <p className="text-text-secondary mt-1">Manage and view all doctor profiles</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Doctor
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name, specialization, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full text-center py-12 text-text-secondary">No doctors found</div>
        ) : (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full bg-primary/10"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{doctor.name}</h3>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium inline-block mt-1">
                      {doctor.specialization}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-4">{doctor.qualification}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-text-secondary">
                  <span className="font-medium mr-2">Experience:</span>
                  <span>{doctor.experience} years</span>
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <span className="font-medium mr-2">Fee:</span>
                  <span>${doctor.consultationFee}</span>
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <span className="font-medium mr-2">Phone:</span>
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <span className="font-medium mr-2">Available:</span>
                  <span>{doctor.availability}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <button
                  onClick={() => handleEdit(doctor)}
                  className="flex-1 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="flex-1 px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-text-primary">
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Specialization *</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Specialization</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Psychiatry">Psychiatry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="MD, MBBS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Experience (years) *</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 234-567-8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="doctor@hospital.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Consultation Fee ($) *</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Availability *</label>
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Mon-Fri: 9AM-5PM"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {editingDoctor ? "Update Doctor" : "Add Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Doctors
