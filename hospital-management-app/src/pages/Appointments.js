"use client"

import { useState, useEffect } from "react"

const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [filterStatus, setFilterStatus] = useState("All")
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    status: "Scheduled",
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients")
    const storedDoctors = localStorage.getItem("doctors")
    const storedAppointments = localStorage.getItem("appointments")

    if (storedPatients) setPatients(JSON.parse(storedPatients))
    if (storedDoctors) setDoctors(JSON.parse(storedDoctors))

    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments))
    } else {
      // Initialize with dummy appointments
      const dummyAppointments = [
        {
          id: "1",
          patientId: "1",
          patientName: "John Smith",
          doctorId: "1",
          doctorName: "Dr. Sarah Johnson",
          date: "2024-12-25",
          time: "10:00 AM",
          reason: "Regular checkup",
          status: "Scheduled",
          createdAt: "2024-12-20",
        },
        {
          id: "2",
          patientId: "2",
          patientName: "Emma Wilson",
          doctorId: "2",
          doctorName: "Dr. Michael Chen",
          date: "2024-12-26",
          time: "2:00 PM",
          reason: "Headache consultation",
          status: "Completed",
          createdAt: "2024-12-18",
        },
        {
          id: "3",
          patientId: "3",
          patientName: "Michael Brown",
          doctorId: "3",
          doctorName: "Dr. Emily Davis",
          date: "2024-12-27",
          time: "11:30 AM",
          reason: "Follow-up visit",
          status: "Cancelled",
          createdAt: "2024-12-19",
        },
      ]
      setAppointments(dummyAppointments)
      localStorage.setItem("appointments", JSON.stringify(dummyAppointments))
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

    const selectedPatient = patients.find((p) => p.id === formData.patientId)
    const selectedDoctor = doctors.find((d) => d.id === formData.doctorId)

    if (!selectedPatient || !selectedDoctor) {
      alert("Please select valid patient and doctor")
      return
    }

    const appointmentData = {
      ...formData,
      patientName: selectedPatient.name,
      doctorName: selectedDoctor.name,
    }

    if (editingAppointment) {
      // Update existing appointment
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingAppointment.id
          ? { ...appointmentData, id: editingAppointment.id, createdAt: editingAppointment.createdAt }
          : appointment,
      )
      setAppointments(updatedAppointments)
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments))
    } else {
      // Add new appointment
      const newAppointment = {
        ...appointmentData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      }
      const updatedAppointments = [...appointments, newAppointment]
      setAppointments(updatedAppointments)
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments))
    }

    resetForm()
  }

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment)
    setFormData({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason,
      status: appointment.status,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = appointments.filter((appointment) => appointment.id !== id)
      setAppointments(updatedAppointments)
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments))
    }
  }

  const handleStatusChange = (id, newStatus) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status: newStatus } : appointment,
    )
    setAppointments(updatedAppointments)
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments))
  }

  const resetForm = () => {
    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
      status: "Scheduled",
    })
    setEditingAppointment(null)
    setIsModalOpen(false)
  }

  const filteredAppointments =
    filterStatus === "All" ? appointments : appointments.filter((apt) => apt.status === filterStatus)


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Appointments</h1>
          <p className="text-text-secondary mt-1">Schedule and manage patient appointments</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span className="text-xl">+</span> Schedule Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-4">
        <div className="flex gap-2 overflow-x-auto">
          {["All", "Scheduled", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-border p-12 text-center text-text-secondary">
            No appointments found
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">{appointment.patientName}</h3>
                      <p className="text-sm text-text-secondary mt-1">with {appointment.doctorName}</p>
                    </div>
                      {appointment.status}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-text-secondary">Date</p>
                      <p className="text-sm font-medium text-text-primary mt-1">{appointment.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Time</p>
                      <p className="text-sm font-medium text-text-primary mt-1">{appointment.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Reason</p>
                      <p className="text-sm font-medium text-text-primary mt-1">{appointment.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {appointment.status === "Scheduled" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(appointment.id, "Completed")}
                        className="px-4 py-2 bg-success/10 text-success rounded-lg hover:bg-success/20 transition-colors text-sm font-medium"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                        className="px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
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
                {editingAppointment ? "Edit Appointment" : "Schedule New Appointment"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Patient *</label>
                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Doctor *</label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Reason for Visit *</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter reason for appointment"
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
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {editingAppointment ? "Update Appointment" : "Schedule Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments
