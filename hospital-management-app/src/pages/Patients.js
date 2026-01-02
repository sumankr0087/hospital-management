"use client"

import { useState, useEffect } from "react"

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    bloodGroup: "",
    emergencyContact: "",
  })

  // Load patients from localStorage on mount
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients")
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients))
    } else {
      // Initialize with dummy data
      const dummyPatients = [
        {
          id: "1",
          name: "John Smith",
          age: 45,
          gender: "Male",
          phone: "+1 234-567-8901",
          email: "john.smith@email.com",
          address: "123 Main St, New York, NY",
          bloodGroup: "O+",
          emergencyContact: "+1 234-567-8902",
          registeredDate: "2024-01-15",
        },
        {
          id: "2",
          name: "Emma Wilson",
          age: 32,
          gender: "Female",
          phone: "+1 234-567-8903",
          email: "emma.wilson@email.com",
          address: "456 Oak Ave, Los Angeles, CA",
          bloodGroup: "A+",
          emergencyContact: "+1 234-567-8904",
          registeredDate: "2024-02-20",
        },
        {
          id: "3",
          name: "Michael Brown",
          age: 58,
          gender: "Male",
          phone: "+1 234-567-8905",
          email: "michael.brown@email.com",
          address: "789 Pine Rd, Chicago, IL",
          bloodGroup: "B+",
          emergencyContact: "+1 234-567-8906",
          registeredDate: "2024-03-10",
        },
      ]
      setPatients(dummyPatients)
      localStorage.setItem("patients", JSON.stringify(dummyPatients))
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

    if (editingPatient) {
      // Update existing patient
      const updatedPatients = patients.map((patient) =>
        patient.id === editingPatient.id ? { ...formData, id: editingPatient.id } : patient,
      )
      setPatients(updatedPatients)
      localStorage.setItem("patients", JSON.stringify(updatedPatients))
    } else {
      // Add new patient
      const newPatient = {
        ...formData,
        id: Date.now().toString(),
        registeredDate: new Date().toISOString().split("T")[0],
      }
      const updatedPatients = [...patients, newPatient]
      setPatients(updatedPatients)
      localStorage.setItem("patients", JSON.stringify(updatedPatients))
    }

    resetForm()
  }

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setFormData(patient)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updatedPatients = patients.filter((patient) => patient.id !== id)
      setPatients(updatedPatients)
      localStorage.setItem("patients", JSON.stringify(updatedPatients))
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      bloodGroup: "",
      emergencyContact: "",
    })
    setEditingPatient(null)
    setIsModalOpen(false)
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Patient Management</h1>
          <p className="text-text-secondary mt-1">Manage and view all patient records</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Patient Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Age</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Gender</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Phone</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Blood Group</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Registered</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-text-secondary">
                    No patients found
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-text-primary">{patient.name}</p>
                        <p className="text-sm text-text-secondary">{patient.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-primary">{patient.age}</td>
                    <td className="px-6 py-4 text-text-primary">{patient.gender}</td>
                    <td className="px-6 py-4 text-text-primary">{patient.phone}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-error/10 text-error rounded-full text-sm font-medium">
                        {patient.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary text-sm">{patient.registeredDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(patient)}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="px-3 py-1 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-text-primary">
                {editingPatient ? "Edit Patient" : "Add New Patient"}
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
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Blood Group *</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
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
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Emergency Contact *</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 234-567-8901"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="123 Main St, City, State"
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
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {editingPatient ? "Update Patient" : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients
